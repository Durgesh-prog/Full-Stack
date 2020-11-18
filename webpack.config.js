const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	mode:'development',
	entry:{
		app:'./src/App.js',
	},
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'[name].bundle.js',
		publicPath:'/'
	},
	plugins: [
		 
		 new HtmlWebpackPlugin({
			title: 'Development',
			template:'./index.html'
		 }),
		 
	 ],
	optimization: {
		 splitChunks: {
		   chunks: 'all',
		 },
    },
	module:{
		rules:[
		  {
			test:/\.js$/,
			exclude:/node_modules/,
			use:{
				loader:'babel-loader'
			}
		},
		{
			test:/\.css$/,
			use:['style-loader','css-loader']
		}
	]
  },
  devServer: {
	contentBase:'./build',
  },
  devtool:'source-map',
}