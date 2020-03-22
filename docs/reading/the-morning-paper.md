---
title: The Morning Paper Notes
---

## 2020-03-18: [An empirical guide to the behavior and use of scalable persistent memory](https://blog.acolyer.org/2020/03/18/scalable-persistent-memory/)

- real non-volatile memory: not slower, persistent DRAM
  - lower latency
  - higher bandwidth
  - address-based interface
- two modes: memory and app mode
  - app can control everything in the memory hierarchy
- difference with DRAM
  - read: 2x-3x slower
  - random-vs-sequential: 20% vs 80s performance gap
  - different bandwidth for read/write: 2.9x vs 1.3 for DRAM
  - low block read (<256B) performance is poor
- guidelines:
  - avoid small random access
  - use non-temporal store for large transfers
  - limit concurrency
  - avoid NUMA accesses

## 2020-03-16: [Understanding, detecting and localizing partial failures in large system software](https://blog.acolyer.org/2020/03/16/omega-gen/)

- gray failures are hard to detect
- main reasons:
  - uncaught errors
  - indefinite blocking
  - buggy error handling
- runtime information is needed to decide
  - automatic intrinsic watchdog generation that runs concurrently next to the
    actual code
  - process: identify long running methods, extract vulnerable parts with some
    heuristics, reduce the method to the interested part for watchdog
    replication, then run with new params in a sandbox (timeout)

## 2020-03-13: [When correlation(or lack of it) can be causation](https://blog.acolyer.org/2020/03/13/correlation-x-2/)

- rex: forget changing but should change together
- cloud canary: changed together, but don't want. Looks for correlated failures.
- rex:
  - change rule discovery: file changed together from last 6 month of version
    control
  - thresholding with confidence
  - refining of changes via regular expression
  - constant feedback if changes are incorporated
- fault graph: how components are tied to each other and can cause service
  disruption
  - root means service is down
  - incremental fault graph generation
  - converted to boolean formula and solved via a sat solver
  - risk groups are detected: probabilities of failure and cause for disruption
  - a config can specify goals, and a plan will be generated to satisfy it by
    moving / adding replicas

## 2020-03-11: [Characterizing, modeling, and benchmarking RocksDB key-value workloads at Facebook](https://blog.acolyer.org/2020/03/11/rocks-db-at-facebook/)

- there is a big difference between real-world workloads and synthetic
  benchmarks
- rocksdb:
  - general get, put and delete operations
  - iterator for range scan
  - delete range to delete a range of keys
  - merge: read-edit-write, changes are stacked as deltas and reading merges
    deltas by a user-provided function
- use-cases:
  - storage engine for mysql (sql converted to rocksdb operations)
  - zippyDB distributed kv-store: metadata
  - distributed kv for stat collection: dominated by merge
- most important difference: hot key range distribution

## 2020-03-09: [Building an elastic query engine on disaggregated storage](https://blog.acolyer.org/2020/03/09/snowflake/)

- cloud-native:
  - disaggregation: scaling independently (ephemeral storage)
  - elasticity: rapid resource allocation
  - isolation
- ephemeral caching
  - two-tier (in-memory/SSD and S3)
  - consistent hashing between data and node
- elasticity
  - ec2 / s3
  - lazy reconfiguration from consistent hashing

## 2020-03-04: [Millions of tiny databases](https://blog.acolyer.org/2020/03/04/millions-of-tiny-databases/)

- guiding principle: blast radius reduction (smaller scope on outage)
- db: made up from cells that spans multiple (7) nodes (a single server)
  - a node can participate in multiple cells
  - a cell manages a single partition (small number of clients)
- reconfiguration always happens to move closer to clients
  - bulk (new)
  - log-based (partition, pause)
  - whack-a-mole (gaps in the log)
- cell: 7 nodes
  - durability
  - tail latency
  - availability
  - small transaction/data size
- partition: client and db stays in the same side by clever allocation
- same state: might cause the same error and correlate failures
- testing:
  - TLA+
  - simulators within editors
  - jepsen for network failures
  - game days
- robustness principle:
  - be conservative what you do, be liberal in what you accept
  - this doesn't work well for consensus

## 2020-03-02: [Firecracker: lighweight virtualization for serverless applications](https://blog.acolyer.org/2020/03/02/firecracker/)

- goal: strong security and minimal overhead (accumulates per function quickly
  and soft-allocation, allocate on demand up to its limit)
  - containers: same kernel is difficult to secure even if some parts are moved
    to user-space
  - language VMs are no because of arbitrary binary support
  - VM: not efficient, overheads
  - unikernels: not generic enough, might require changes in the binary
- implementation for specific design goals:
  - less assumptions
  - smaller code footprints due to less features; no usb, no video/audio
  - simpler rate limiters; billing only, etc.
  - REST api for management of these micro VMs

## 2020-02-28: [Gandalf: an intelligent, end-to-end analytics service for safe deployment in cloud-scale infrastructure](https://blog.acolyer.org/2020/02/28/microsoft-gandalf/)

- teams started trusting automated solution
  - deployment speed increased
  - all evidence for decisions is available in an interactive interface
- detecting failure is hard
  - constant change
  - temporary failures outside of the rollout
  - delayed issues such as memory leaks
  - detection of cause
- lambda architecture: slow and fast paths
  - fast: immediate failures
  - slow: complex analysis and deferred issues
- usual suspects:
  - anomaly detection: many rollouts
  - correlation: no causal relationship
  - supervised learning: constant change isn't detected
  - solution is to combine them in the preceeding order

## 2020-02-26: [Meaningful availability](https://blog.acolyer.org/2020/02/26/meaningful-availability/)

- good availability metric properties:
  - meaningful: reflects the real user experience
  - proportional: change in metric reflects the change in perceived availability
  - actionable: insight about why
- time based, number of nines: good / total
  - downtime in peak isn't equal to downtime in quiet periods
- count based: success / total requests
  - skewed for power users
  - less requests when system isn't healthy, so skews the metric
  - less meaningful since there is no notion of time
- if we can combine both from the user perspective then it makes sense
  - user-uptime
  - assume the last status until contrary is seen but with some cutoff to mark
    the period as inactive

## 2020-02-24: [AnyLog: a grand unification of the internet of things](https://blog.acolyer.org/2020/02/24/anylog/)

- goal: decentralized publishing and access to structured data
- difference than semantic web and freebase
  - economic incentives to contribute
  - SQL interface instead of graph
  - provide compute/storage infrastructure
- members:
  - client: issues queries
  - coordinator: receive queries and return results
  - contractor: data provider
  - publisher: actual data producer
  - blockchain: discover and trust capabilities
- difference: each query requires payment which goes to
  coordinator/contractors/publishers
- problems:
  - trust between publisher and coordinator/contractor
  - scalability due to blockchain updates

## 2020-02-21: [Extending relational query processing with ML inference](https://blog.acolyer.org/2020/02/21/extending-relational-query-processing/)

- database is a good place to leverage ML
  - transactions
  - security
  - auditing
- there is a format in mlflow open format then it's translated into a common
  representation. There are limitations such as loops, missing types, unknown
  libraries. They are converted as user defined functions.
- operators are extensive:
  - all relational algebra
  - linear algebra (matrix multiplication, convolution)
  - higher ml (decision trees)
  - data feature operators (one hot encoding, etc.)
- idea might be to enable high level definition of the pipeline instead of
  recovering from an imperative program
- this implementation uses optimizations from relational and ml domain:
  - where clause
  - non contributing feature
  - inlining to replace ml operators with relational operators
  - nn translation: replace feature operators with neural networks that can be
    run in optimized runtime directly
- result: promising
  - big numbers are better due to automatic parallelizing
  - small numbers are slowers due to caching

## 2020-02-19: [Cloudy with a high chance of DBMS: a 10-year prediction for enterprise-grade ML](https://blog.acolyer.org/2020/02/19/ten-year-egml-predictions/)

- data handling, model fairness, user privacy and debugging will be more
  important for enterprise
- ml models: software derived from data
- mismatch: regulated domains require expert knowledge which lacks system and
  software engineering practices. Less skilled but more demands.
- reliable training, provenance and score tracking over time are becoming
  foundational
- main areas: training (also include data gathering), inference and model
  update/maintenance
- bets:
  - train in the cloud: large data, spikes, latest hardware, etc.
  - scoring goes to db: inference will be everywhere
  - governance will be everywhere: secure access, versioning, provenance, etc.

## 2020-02-16: [Migrating a privacy-safe information extraction system to a Software 2.0 design](https://blog.acolyer.org/2020/02/17/software-20-migration/)

- software 2.0: key components are implemented by neural networks
  - this is a case study to replace hand coded system with neural network so
    that code is deleted and the system is back to improvement.
  - implementation changes focus to curate training data to define what the
    system should do
- results from google email extraction service
  - precision and recall increased
  - removed code (45 kloc)
  - simpler to maintain
  - open doors to new possibilities
- problem is training data generation and on top, it's private
- juicer:
  - classifier for XPaths of the email HTML DOM
  - any span of text is a field, field scores are averaged
  - a generator is built and only highly-confident results are put into training
    data

## 2020-02-14: [Programs, life cycles, and laws of software evolution](https://blog.acolyer.org/2020/02/14/programs-life-cycles-laws/)

- what a programmer does:
  - state an algorithm that correctly an unambiguously defines a mechanical
    procedure for obtaining a solution to a given problem
- maintenance: anything other than initial development
- unit cost of change should be as low as possible and alterability should be
  maintained
- programs are models of a model of a theory of a reality:
  - s-program: simple, easy to validate from spec
  - p-program: real-world problems so they aren't precise enough anymore. They
    make sense in their real-life context. If output differs from the expected,
    the program must change. And real-life always changes so does the program.
  - e-program: embedded to the world to get real-time feedback and its results
    are part of the world so they can be the cause of a change in the real-life.
- any system can always be split into implementable s-programs (might be seen as
  complete and correct) - (this is interesting)
- project managers are incentivised to focus on short-term at the cost of
  long-term. Long-term cost is hard to predict/calculate. That's why executive
  should be the balance check.
- rules:
  - p and e programs are never done, we should expect a change.
  - with change, complexity increases and structure decays.
  - resources that can be applied to a project are limited.
  - perceived complexity in successive releases is constant because even if a
    change is tiny, intellectual time and effort needed is teh sum of existing
    system plus patch.
  - program evolution has a dynamics. A big change is problematic so causes a
    clean-up session. A small change is easier to take to the users so it can be
    done more often. According to these rates, it's a statistical limit of what
    can be done.
- software planning must balance following:
  - measures and models obtained from the evolving process
  - business needs and market considerations

## 2020-02-12: [Let's Encrypt: an automated certificate authority to encrypt the entire web](https://blog.acolyer.org/2020/02/12/lets-encrypt-an-automated-certificate-authority-to-encrypt-the-entire-web/)

- Let's encrpyt: largest authority (by ease-of-use) but still big websites don't
  use it
  - DV: domain validation
  - OV: organization validation
  - EV: extended validation
  - OV and EV require manual paper inspection but big browsers don't distinguish
    between them anymore
- hosting and CDN providers use it for their customers automatically
- caddy provisions let's encrypt certificates automatically but apache/nginx are
  the biggest servers with this certificate
- interesting note: free let's encrypt couldn't reduce prices in other CAs.
- ownership validations are prone to network-layer attacks (BGP hijacking)
- CA functions at boulder
  - issuing certificates via ACME
  - submitting pre-certificates and certificates to transparency logs
  - publication of certificate revocation status
- boulder: design principles
  - minimal logic
  - minimal data collection
  - full automation
  - functional isolation (gRPC)
  - operational isolation
  - continuous availability
- being free minimizes operational cost
- let's encrypt is immediately ready when signed so provides gradual deployment
  unlike other systems such as DNS authentication of Named Entities

## 2020-02-10: [Watching you watch: the tracking system of over-the-top TV streaming devices](https://blog.acolyer.org/2020/02/10/watching-you-watch/)

- headline: when you watch TV, your TV is watching you and there are less
  measures than web and mobile to protect yourself

## 2020-02-07: [Cloudburst: stateful functions-as-a-service](https://blog.acolyer.org/2020/02/07/cloudburst/)

- big idea: cache data and run the function close the cache
  - kv store
  - cache-consistency protocols
  - scheduler
- serverless: separate storage and compute to scale independently
  - here idea is to separate logically but physically there are close

## 2020-02-05: [POTS: protective optimization technologies](https://blog.acolyer.org/2020/02/05/protective-optimization-technologies/)

- when we care about fairness in machine learning, we need to consider delayed
  impact to create feedback loops
- aspects:
  - domain assumptions
  - requirements
  - spec
  - program
- negative externalities: negative effects of a system
  - uber: good pricing at the cost of pollution, less public transport, etc.
  - inputs: user, seen by the algorithm and regulations

## 2020-02-03: [The measure and mismeasure of fairness: a critical review of machine learning](https://blog.acolyer.org/2020/02/03/measure-mismeasure-fairness/)

- russell/whitehead: a basis for math
- godel: any consistent axiomatic system will have theorems that can be
  explained within the system
- to show real fairness of machine learning: we need to show properties of the
  data, which is coming from outside of the system
- fairness will be more important since systems are being automated by machine
  learning
- fairness; properties are divided into two: protected and unprotected
  - anti-classification: no use of protected attributes. Limitation: leaving
    them out makes the result worse in general.
  - classification parity: protected attributed can't affect positive outcome,
    there is a base error across groups(parity). Limitation: error distributions
    are generally very different.
  - calibration: outcome is independent from protected attributes. Limitation:
    Simpson's paradox, changing outcome is easy by regrouping.
- requirements:
  - real/correct data
  - sample bias
  - interpretability
  - group vs individual thinking

## 2020-01-31: [Seamless offloading of web app computations from mobile device to edge clouds via HTML5 Web Worker migration](https://blog.acolyer.org/2020/01/31/web-worker-migration/)

- latency requires edge computing
  - mobile can't offer the power for compute and servers are far away
- snapshot of state is needed
  - js is fine but wasm can be a problem due to native code (i.e. arm vs x86)
- migration destination
  - a manager to control the resources
  - an estimation of the task is needed
  - periodic checks if there are new open resources to improve the performance
  - there is a stable fallback server too since client is mobile
  - if fallback isn't accessible, worker is restarted and if it can be
    predicted, worker can be moved to the client

## 2020-01-29: [Narrowing the gap between serverless and its state with storage functions](https://blog.acolyer.org/2020/01/29/narrowing-the-gap/)

- implementation of old idea in serverless environments: stored procedures
  - uses V8 for isolation

## 2020-01-27: [Reverb: speculative debugging for web applications](https://blog.acolyer.org/2020/01/27/reverb-speculative-debugging/)

- log js execution and provide speculative fix and replay execution
  - replay part is like magic

## 2020-01-24: [Trade-offs under pressure: heuristics and observations of teams resolving internet service outages (Part 2)](https://blog.acolyer.org/2020/01/22/trade-offs-under-pressure-part-2/)

- focus on a quick remedy instead of full recovery and fix on root cause
- abduction: logical inference from observation with the simplest explanation
- success of the system: depends on adaptive capacity of human

## 2020-01-22: [Trade-offs under pressure: heuristics and observations of teams resolving internet service outages (Part 1)](https://blog.acolyer.org/2020/01/22/trade-offs-under-pressure-part-1/)

- key challenges:
  - opaque systems: complex, abstractions, different behaviors under load,
    unclear boundaries, etc.
  - distributed and not deterministic
  - teams are distributed
  - always open to changes
- teams are at advantage to solve incidents over individuals:
  - a wider attention
  - a broader expertise
  - parallel work and adaptability
- heuristics are important to get a resolution quickly
  - however, can cause cognitive fixation; a solution without signals and
    various drawbacks

## 2020-01-20: [STELLA: report from the SNAFU-catchers workshop on coping with complexity](https://blog.acolyer.org/2020/01/20/stella-coping-with-complexity-2/)

- Wood's theorem: as system complexity increases, the view of the agent shrinks
  dramatically.
  - there is always a human in the automation (irony of automation)
- emergent complexity: linear increase in the system size causes super-linear
  complexity increase
  - think about side channel interactions and finer gradation (i.e. gray
    failures, etc.)
- anomalies:
  - diversity aids resilience (ex: automation pushes faulty version but
    automation is buggy and fails so some servers still run healthy version and
    as a result, system is up)
  - false representation (monitoring says healthy while it's not)
  - manifestations are far from the cause
- common features of anomalies:
  - a result of unanticipated interactions
  - no single root cause
  - in-place for so long and were waiting to explode
  - caused by a slight deviation from the normal operations
  - initially covered by resiliency checks but go over them
- dimensions that affect good incident resolution:
  - how understood what was happening
  - how explored the possible sources
  - how weighed alternative corrective actions and made sacrifice decisions
  - how deployed resources
  - how managed side effects
  - how compensated for deteriorating conditions
  - how revised their problem understanding and coordinated with others
- results:
  - postmortems are gold
  - blame vs sanction vs accountability
  - coordination cost control and up-front planning
  - improve visualisations and auto-correlations
  - eliminate strange-loops (a system provide a service also depends on that
    service)
  - dark debt (similar to technical debt, accumulated complexity generates
    anomalies and we're not absolutely aware of it and its effect isn't on
    development speed)

## 2020-01-17: [Synthesizing data structure transformations from input-output examples](https://blog.acolyer.org/2020/01/17/synthesizing-data-structure-transformations/)

- functional languages are well suited for program synthesis
- goal: to generate a program from example inductively
  - not any program but the most cost effective
  - memorization isn't something wanted but if examples are exhaustive, fine
    though

## 2020-01-15: [Programmatically interpretable reinforcement learning](https://blog.acolyer.org/2020/01/15/programmatically-interpretable-reinforcement-learning/)

- pattern: a language and rules
  - use machine learning to learn rules in this language which are easy to
    explain by definition
  - drawback: a lot of programs will be generated where some of them are
    obviously wrong. Then, input augmentation is needed by human to continue
    which acts like an oracle
- it opens the door to prune some policies since some rewards won't be
  satisfied, which are easy to verify

## 2020-01-13: [Challenges of real-world reinforcement learning](https://blog.acolyer.org/2020/01/13/challenges-of-real-world-rl/)

- simulation and real system are very different
  - security/safety is very important
  - real-world data is needed
- challenges:
  - offline learning (i.e. from logs) - warm start, importance sampling, etc.
  - fast online learning with sampling - data efficiency: accuracy threshold vs
    needed data sampling
  - high dimensions and continuous space
  - safety - a bounded learning or a layer that prevents unwanted actions
  - partially seen - should also train to learn noise and delay
  - not perfect reward functions - not a clear goal to optimise
  - easy explanation/interpretation
  - fast inference
  - tolerance of delays in hardware components for reward - need of a memory

## 2020-01-10: [Ten challenges for making automation a ‘team player’ in joint human-agent activity](https://blog.acolyer.org/2020/01/10/ten-challenges-for-automation/)

- requirements for coordination of a group, people and machines
  - agree to work together
  - mutually predictable: planning
  - mutually directable: influence positively
  - common ground: knowledge and beliefs

## 2020-01-08: [Ironies of automation](https://blog.acolyer.org/2020/01/08/ironies-of-automation/)

- combination of pieces results the opposite of the expected (simpson's paradox)
  - as automation gets more complex, we require higher skills in human oeprators
- human operator is needed:
  - to check correctness of the automation
  - to take over the automation
- humans can't maintain their focus so alerts and alerts on alerts are needed
  - what about gray failures?
- main theme: pushing the limits of automation prevent us from controlling it
  - coding vs debugging (kernighan)

## 2019-12-13: [How do committees invent?](https://blog.acolyer.org/2019/12/13/how-do-committees-invent/)

- design: intellectual activity which creates a whole from moving/diverse pieces
- requirements:
  - system boundaries: what is in the scope?
  - notion of organization
- as soon as team is chosen, everybody takes a part which is narrower in scope
  - it creates the coordination problem
  - vital for unified system in the end
- adding more people constrain the options of possible designs
  - homomorphism between team communication and their design

## 2019-12-11: [A tale of two abstractions: the case for object space](https://blog.acolyer.org/2019/12/11/a-tale-of-two-abstractions/)

- the problem: non-volatile pointers
  - global addressing after processes end and integration of existing hardware
    and interoperability of different memory hierarchies
  - kind of object storage (ZODB in python)
- idea: virtual address space to logical address space which is composed of
  chunks, that are mapped to physical memory
  - that's why two level indirection
  - cost is around ~0.4ns

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
