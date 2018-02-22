let path = require('path');
let webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill', './source/js/main.js'],
	output: {
		path: path.resolve(__dirname, './assets/js/'),
		filename: 'game.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};