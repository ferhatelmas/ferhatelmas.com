---
title: The Morning Paper Notes
---

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
