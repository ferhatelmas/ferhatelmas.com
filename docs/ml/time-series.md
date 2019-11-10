---
title: Time Series Prediction
---

Some details specific to time series:

- Feature engineering is difficult and should be handled by care (can easily
  learn bias - i.e. trends, seasonality, accumulation)
- Data is much smaller
- A different algorithm is needed
  - extrapolation
  - confidence interval
- Residuals should represent white noise
  - no correlation
  - zero mean and constant variance
- Resolution matters
  - prepare data and predict very granular then predictions can be aggregated,
    for example: predict use and predict `hourly` then take average for `daily`
- Confidence intervals:
  - keep some part of the data aka. dropout and run simulations
  - kernel mixture network
- Some models might have bias
  - have high accurary or high error (black or gray swan according to the nature
    of the series)

Models to be tested in the order of complexity (to have a baseline and to
iterate):

- simple hand-made formula: average the data
- statistical model: autoregression such as SARIMA, linear sum of old
  observations
- exponential smoothing or winter-holt: this time exponential functions instead
  of linear, forget old observations at an exponentially decreasing reate
- simple neural network
- advanced neural network: LSTM, GRU, etc.
