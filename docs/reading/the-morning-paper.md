---
title: The Morning Paper Notes
---

## 2019-12-09: [A persistent problem: managing pointers in NVM](https://blog.acolyer.org/2019/12/09/a-persistent-problem/)

- byte-addressable NVM will change
  - how hardware is interacted
  - the operation system design
  - the way applications operate on data
- assumptions for NVM:
  - fast
  - avoid serialization: in-memory data structure is put directly into the disk
  - pointer logic: they point virtual memory locations
- cache the objects, not the cache lines (128 bits provide plenty of space)
  - in a global address space, fields are offset from the main object pointer
  - object structure becomes public so application developer should handle it
  - kernel interferes only on permission changes to set access control
  - result: improves programmability and security without any overhead

## 2019-12-06: [Benchmarking spreadsheet systems](https://blog.acolyer.org/2019/12/06/benchmarking-spreadsheet-systems/)

- when spreadsheets were built, target was for human input but today we have
  more and more data
  - benchmarks: basic operations to decide complexity and room for improvement
    (index, incremental updates, etc.)
- result: they are far from basic usability and doesn't use any ideas from dbs
  - using a db backend and transparemtly translating operations to SQL might be
    good for a new plethora of spreadsheets

## 2019-12-04: [Declarative assembly of web applications from pre-defined concepts](https://blog.acolyer.org/2019/12/04/declarative-assembly-of-web-applications-from-pre-defined-concepts/)

- open source use is increasing (right now around 50-70%)
- there are microservices that can be pulled, called concepts
  - interesting bit is coordinating them with a declarative configuration
- problems:
  - custom behavior
  - limited reuse and not clear time savings
  - curation of catalog

## 2019-12-02: [Efficient lock-free durable sets](https://blog.acolyer.org/2019/12/02/efficient-lock-free-durable-sets/)

- non-volatile memory doesn't guarantee durability by itself
  - cache and registers are still volatile
  - for performance, operation can be reordered
  - a log is needed
- main idea: data is durable but pointers are not
  - pointers are recoverable but slow
- implementation:
  - link-free: two bits; valid and deleted. Check NVRAM before returning.
  - soft: three bits in non-volatile nodes and volatile nodes keep track the
    state of inserted, deleted, to be inserted, to be deleted

## 2019-11-29: [TLA+ model checking made symbolic](https://blog.acolyer.org/2019/11/29/tla-model-checking-made-symbolic/)

- convert transitions to quantifier-free SMT constraints to leverage SMT solvers
  - while TLC is hammered, this approach is still fast
  - especially, constraints don't hold, TLC times out but this method gives real
    fast feedback
  - Paxos and Raft are still hard to get a good performance
  - kind of clear winner for inductive variants (APALACHE)

## 2019-11-27: [Mergeable replicated data types – Part II](https://blog.acolyer.org/2019/11/27/mergeable-replicated-data-types-part-ii/)

- the method so far:
  - take the difference between each version and LCA, add those differences to
    LCA state
  - not enough
  - given a merge function for a data type, a merge for pairs of that data type
    can be derived
- real implementation: Quark
  - data structures (list, binary tree, etc.)
  - compiler extension to automatically generate merge functions
  - content-addressable storage abstraction; it answers the following questions
    - how to efficiently get LCA for two concurrent versions?
    - how/when to garbage collect LCA?

## 2019-11-25: [Mergeable replicated data types – Part I](https://blog.acolyer.org/2019/11/25/mergeable-replicated-data-types-part-i/)

- Mergeable replicated data types: similar to CRDTs but also easily composable
  (little effort on dev).
  - useful for geo-distributed systems and local-first applications
- As always, goal is operate locally and coordinate globally and minimize it
- Guiding ideas:
  - data structures are aware of replication
  - there is explicit concurrent revision strategy (create or sync)
  - spec comes first than implementation
- goal of the paper is that automatically extract merge operations (3-way merge;
  2 concurrent versions and their lowest common ancestor - that's why it doesn't
  guarantee linearizability)
  - they do this transforming into relational domain and executing specification
    there and translating the result back to the actual domain (however, further
    specification might be needed such as loss of order which needs to be
    defined)

## 2019-11-22: [PlanAlyzer: assessing threats to the validity of online experiments](https://blog.acolyer.org/2019/11/22/planalyzer/)

- A linter for planout language, to develop online experiments
  - internal validity, failures of randomization and treatment assignment and
    enough causal inference
  - Planout provides randomized values to test significance
  - Planout is chosen by users because it makes mapping users to experiments
    easier
- Validity issues:
  - selection bias
  - confounding: variables that the reason and the outcome
  - lack of positivity: no examples

## 2019-11-20: [Local-first software: you own your data, in spite of the cloud](https://blog.acolyer.org/2019/11/20/local-first-software/)

- Users don't have the ownership of the data with cloud apps. Moreover, pricing
  and product might change in the disadvantage of the users
- Local-first: retain the ownership but also have capabilities of easy access
  and sharing
- principles:
  - fast
  - multiple device
  - offline
  - collaboration
  - longevity
  - privacy
  - user control
- Challenge is the keeping the history of changes and doing necessary log
  compaction
- What can be done today?
  - Aggresive caching and syncing
  - Offline (progressive web apps)
  - Standard data formats and be explicit of what data is collected and where
    it's stored
- Firebase for CRDTs is a market to investigate for entrepreneurs

## 2019-11-18: [Formal foundations of serverless computing](https://blog.acolyer.org/2019/11/18/formal-foundations-of-serverless-computing/)

- pecularities of serverless:
  - warm start: functions are reused (any state is bad, can leak data)
  - abrupt stop
  - side-effects (at-least once run semantics)
- serverless platform:
  - init (initialize the state)
  - recv (handle the request)
  - step (items to be processed that are produced by function execution - so far
    it's only return and generally done outside of serverless platform)
- authors develop naive semantics and propose safety equivalence
  - so that with basic semantics, even if code is running in full system,
    execution can be reasoned
- authors also developed an abstraction library that makes function composition
  simpler compared to public-cloud implementations

## 2019-11-15: [Taiji: managing global user traffic for large-scale Internet services at the edge](https://blog.acolyer.org/2019/11/15/facebook-taiji/)

- which datacenter should answer the request?
  - taiji doesn't care about backend capacity since it's overly provisioned
  - considerations:
    - sticky sessions
    - dynamic traffic patterns; static mapping causes non-uniform usage
    - tolerate failures in a data center
- first idea is to use consistent hashing
  - users look for similar content: enter social hashing
    - friend relationships are partitioned weekly and put into a balanced tree,
      then same buckets go to the same data center
- components:
  - runtime: percentage of the traffic to each data center
    - sampling per second for stateless, stick sessions for stateful
    - policy, latency and utilization guarding
    - generates: data center fraction
  - pipeline: connection-aware granular control
    - generates: bucket fractions by using data center traffic fractions
- there are some safety checks:
  - no big jump in utilization
  - no oscilations under 1%
  - dampening the changes

## 2019-11-13: [Scaling symbolic evaluation for automated verification of systems code with Serval](https://blog.acolyer.org/2019/11/13/scaling-symbolic-evaluation-serval/)

- Google low-level networking stack development goals:
  - fast iteration
  - early feedback and detection of the problems
- However, formal verification still has its place to prevent problem classes
  - proofs are costly in terms of time and amount (longer than actual
    implemetantion)
- There might likely be multiple iterations/rewrites of a software
  - investigation implementation
  - sketching out learnings
  - cleanup version
- the goal here is that if we could reduce the cost of producing a proof, it
  would be used in many more times (specification is still needed though)
  - some constraints are neede for an automated system such as finite operations
    for bounded searches
- Symbolic evaluation: program execution search with example input (symbolic)
  instead of real inputs
- User compiles the program and writes a specification (in
  [rosette](https://docs.racket-lang.org/rosette-guide/index.html)) then
  verifier (an intepreter) produces symbolic constraints and runs the binary to
  check if the program behaves as expected and generates an example on failure.
  - normally symbolic constraint generation step is very costly but serval
    framework has some optimizations to help for general use such as split-pc,
    split input into more granular inputs and test them separately then
    collect/merge results back
- concurrent verification isn't supported (obviously it's hard)

## 2019-11-11: [Snap: a microkernel approach to host networking](https://blog.acolyer.org/2019/11/11/snap-networking/)

- TCP/IP is ditched and started from scratch to have more efficient interfaces,
  architecture and protocol
  - provides reliability, congestion control, optional ordering, flow control
    and execution of remote data operations
- guiding principles:
  - CPU efficiency
  - lower latency (tail too)
  - faster iteration and regular upgrades (from 1-2 months to 1 week)
- library implementation isn't an option
  - since deployment of snap requires deployment of all applications depending
    on it
  - so user-space microkernel
  - applications talk to it via shared memory
- architecture leverages:
  - user-space networking
  - in-service upgrades
  - centralized resource accounting
  - programmable packet processing
  - kernel-bypass
  - RDMA functionality
  - optimized transport, congestion control and routing
- upgrade:
  - brownout: bring new snap that shares the memory with old snap
  - blackout: swap to new snap
- scheduling:
  - dedicated core
  - spreading: assign to a core if active
  - compacting: squeeze to minimal number of cores
- client applications can poll the completion results or register notification
  callbacks

## 2019-11-08: [The inflection point hypothesis: a principled approach to finding the root cause of a failure](https://blog.acolyer.org/2019/11/08/the-inflection-point-hypothesis/)

- root cause analysis: start from the beginning of execution and spot divergence
  from the expected execution: that point is the inflection point and likely the
  root cause.
- root cause: the simplest explanation of unwanted condition.

## 2019-11-06: [File systems unfit as distributed storage backends: lessons from ten years of Ceph evolution](https://blog.acolyer.org/2019/11/06/ceph-evolution/)

- a good example of questioning assumptions: distributed storage backend must be
  on top of local file system
  - result of it is blue store and changed storage hardware landscape
- distributed file system: holistic view over multiple storage nodes
  - expected features: high bandwidth, horizontal scalability, fault tolerance
    and strong consistency
- changing hardware landscape: zone interface
  - sequential writes on static size blocks
  - causes log-structured, copy-on-write design
  - however, it's against the style of many file system designs
- it takes a decade (on average) for file systems to mature enough
- iteratons:
  - user-space file system: extent and B-tree based
  - btrfs: transaction, deduplication, checksum, compression
  - xfs: better scalability and metadata performance
  - ext4
  - zfs
- challenges:
  - fast transactions: hook into fs (no support), logical WAL in user-space
    (slow and double write), use RocksDB (low performance due to frequent
    flushes)
  - fast metadata
  - extensibility for new hardware
- next level challenge:
  - resizable user space cache
  - high CPU on serialization so no custom sharding

## 2019-11-04: [An analysis of performance evolution of Linux’s core operations](https://blog.acolyer.org/2019/11/04/an-analysis-of-performance-evolution-of-linuxs-core-operations/)

- headline: performance got worse or fluctuated
  - main takeaway: tuning kernel is a difficult beast to handle
  - tuning by distros takes 6-18 months while a new kernel is released every 2-3
    months with 13-18k commits
  - side takeaway: security has a cost
- reasons of performance hits:
  - security: spectre/meltdown/free space randomization/validation of pointers
    to copy data between user and kernel space
  - new features: transparent page size adaptation, cgroup memory controller
  - default configuration changes

## 2019-11-01: [Optimized risk scores](https://blog.acolyer.org/2019/11/01/optimized-risk-scores/)

- doing the simplest that would work is a good place to start
- score based risk model: summation of points in multiple heuristics
  - a good one: has small number of features with small coefficients
  - core is the mixed-integer non-linear programming which is NP-Hard
  - trick is cutting-plane algorithm, to solve the proxy problem with much less
    data first and expand it, by cuts, it becomes linear and monotonically
    approaches the actual one
  - if loss function isn't non-convex, cutting-plane takes so much time
    (stalls). Improved version splits the plane into disjoint partitions and
    solves them separately
- there is no need for complex model serving in production because models can
  easily be implemented

## 2019-10-30: [Learning certifiably optimal rule lists for categorical data](https://blog.acolyer.org/2019/10/30/corels/)

- a new optimal rule list algorithm
  - why do we need a new one while we have decision trees?
  - even if we're satisfied with the results, we don't know where the optimality
    is and how optimum the end result is
  - generated rule list: predictive, not causal so not good for policy making
    but easy to follow the reasoning
- best rule list:
  - terms: loss (misclassification error) + regularization (longer list)
  - extension of a prefix can't improve the rule list
  - extension list of a non-accurate list can be pruned
  - upper bound for optimum list can be computed so anything above it can be
    pruned
  - each rule in the optimum list should have a threshold in terms of accuracy
- data structures in place to implement branch and bound algorithm:
  - prefix trees for incremental expansion
  - symmetry-aware map for pruning
  - different queues for search traversal

## 2019-10-28: [Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead](https://blog.acolyer.org/2019/10/28/interpretable-models/)

- explainability and interpretability are different
  - lack of these in ML applications that touch human lives can have severe
    consequences
- a model can be a black box:
  - too complex for humans to understand
  - closed/proprietary to inspect
- interpretable model:
  - model itself can easily be analyzed and understood by experts
- explaining the results/predictions can only be `guessing` at best
  - in images, saliency maps can explain what the model is looking at to decide
    but for similar categories, these maps can be very similar and don't bring
    much understanding
- there is a bias to assume more complex model would give more accurate
  predictions
  - in reality, simpler models can be troubleshot easily so iterations and
    improvements are more likely, especially for structured data
  - starting with deep learning (no time spent on feature engineering) and
    getting reasonable results guarantees the existence of interpretable models
    so we can invest more time on it to find the desired model
- examples of these models:
  - logical: a bunch of logic rules (`if-else` statements but minimal number of
    them)
  - scoring: gives scores for a bunch of features and sums them in the end
- policy change might be important to adapt more interpretable models
  - enforce using interpretable model over black box if their accuracy is same
  - enforce proving that the research for interpretable models having been done
    and reporting the accuracy of the interpretable models

## 2019-10-25: [Task-based effectiveness of basic visualizations](https://blog.acolyer.org/2019/10/25/task-based-effectiveness-of-basic-visualizations/)

- historical questions: which visualization should I use?
  - it depends
- goals of visualizations:
  - finding anomalies
  - finding clusters
  - finding correlations
  - computation for derived values
  - figuring out distributions
  - finding extremes: different than anomalies because these are valid values
  - filtering
  - ordering
  - understanding the ranges: sounds similar to finding extremes
  - retrieving values
- bar chart is the most effective visualization type to answer above questions
  in aggregates
  - bar charts and tables are most preferred by users
- advice on how to select a type:
  - bar: to find clusters (pie chart is an another option)
  - line: to find correlations (avoid pie and table)
  - scatter: to find anomalies
  - line: avoid if specific value retrieval is needed
  - bar or table: to provide data for general exploration
