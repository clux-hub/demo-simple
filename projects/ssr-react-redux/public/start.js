/* eslint-disable import/no-unresolved, no-console */
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const fallback = require('express-history-api-fallback');
const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('./config');

const apiProxy = config.apiProxy || {};
const server = config.devServer;
const [, , port] = server.split(/:\/*/);
const staticPath = path.join(__dirname, './client');

const app = express();
app.use('/client', express.static(staticPath));
Object.keys(apiProxy).forEach((key) => {
  app.use(key, createProxyMiddleware(apiProxy[key]));
});
app.use(fallback('index.html', {root: staticPath}));
app.listen(port, () =>
  console.info(`\n \n.....${new Date().toLocaleString()} starting ${chalk.redBright('Server')} on ${chalk.underline.redBright(server)} \n`)
);
