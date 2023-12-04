# API to generate the countdown GIF
## Description:
AWS serverless API to generate the countdown GIF image for email or other applications
## Features:
1. Generate animated GIF countdown image per request
2. GIF image won't be cached by browser
3. Scale up automatically via serverless approach
4. Lambda warmer is added for shorter response time

## API Urls
- **Localhost:** http://localhost:3000/
- **Production AWS:** https://YOUR_HOST_DOMAIN/YOUR_PATH/

## How to use
1. View GIF image at browser
E.g., Type `http://localhost:3000/2023-01-01T23:59:59-08:00` at browser navigation bar to view the animated gif

2. Embed GIF image at email
```html
<table align="center"><tbody><tr><td><img src="https://YOUR_HOST_DOMAIN/YOUR_PATH/2023-01-01T23:59:59-08:00" style="display: block;max-width:100%" /></td></tr></tbody></table>
```

## Counter customization
For additional counter customization, please refer to the library [gif-countdown](https://github.com/CompAndSave/gif-countdown)

## Minimum Requirement:
- Node v18.x

## Before start:
- Install all dependencies `npm ci` (for local / dev instance)
- Install all dependencies `npm ci --omit=dev` (for production instance)

## Linting:
- `npm run lint`

## Local development testing
- `npm start` or `npm start 3001` (start with different port number than 3000)

## AWS Lambda Deployment
- `npm run deploy` (full deployment) | `npm run deployf` (function deployment)

## Note: Serverless Deployment
1. `app-serverless.js` is the entry point for the serverless setting. Serverless deployment is used for deploying the application to AWS.

## Using Volta to maintain the same development environment
- `node` and `npm` versions are pinned at package.json
- https://docs.volta.sh/guide/ - for more information about Volta