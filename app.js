const createError = require('http-errors');
const express = require('express');
require('dotenv');

const indexRouter = require('./routes/index');

const app = express();

// To fix the Error: request entity too large
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
// 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async (err, req, res, next)=> {
  console.log(err);

  res.status(err.status || 500);
  res.json({ status_message: err.message });
});

module.exports = app;
