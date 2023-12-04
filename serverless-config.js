module.exports.getNodeEnv = (serverless) => {
  return serverless.options.stage === "prod" ? "production" : "development";
};