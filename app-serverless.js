const serverless = require('serverless-http');
const createError = require('http-errors');
const express = require('express');
require('dotenv');
const { ServerlessUrlPath: serverlessUrlPath } = require("./server-config.json");

const indexRouter = require('./routes/index');

const app = express();

// To fix the Error: request entity too large
// https://stackoverflow.com/questions/19917401/error-request-entity-too-large
// 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(`/${serverlessUrlPath}`, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async (err, req, res, next)=> {

  // stream the error to CloudWatch
  //
  console.log(err);

  res.status(err.status || 500);
  res.json({ status_message: err.message });
});

const handler = serverless(app, {
  binary: ["*/*"]
});

module.exports.handler = async (event, context) => {

  // Immediate response for WarmUp plugin
  //
  if (event.source === 'serverless-plugin-lambda-warmup') {
    console.log('WarmUp - Lambda is warm!');
    return 'Lambda is warm!';
  }
  
  return await handler(event, context);
};
