const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.js');
const compiler = webpack(config);

const PORT = process.env.PORT || 9000;

/* Initialising Express Application */
const app = express();

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);


/* app.get('/',(req,res) => {
	res.end('Hi Everyone')
}) */

app.listen(PORT,() => {
	console.log(`Welcome To Full stack App`);
})