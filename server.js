const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path')
const userRoute = require('./routes/userRoute')
const vendorRoute = require('./routes/vendorRoute')
const cors = require('cors')

dotenv.config()

const PORT = process.env.PORT || 9000;

/* Initialising Express Application */
const app = express();

app.use(bodyParser())

const MongoServer = require('./config/db');
MongoServer().catch(err => {
		console.log('Error Connecting');
		return;
}) 


app.use(express.static(path.join(__dirname, 'build')));

if(process.env.NODE_ENV === 'DEVELOPMENT'){
	const webpack = require('webpack');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const config = require('./webpack.config.js');
	const compiler = webpack(config);
	
	// Tell express to use the webpack-dev-middleware and use the webpack.config.js
	// configuration file as a base.
	app.use(
	  webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	  })
	);

}

app.use('/user',userRoute);
app.use('/vendor',vendorRoute);

app.use('*',(req,res) => {
	res.redirect('/');
})


app.listen(PORT,() => {
	console.log(`Welcome To Full stack App`);
})