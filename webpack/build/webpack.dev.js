
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const devConfig = {
	mode: 'development',
	devServer: {
	  contentBase: './dist', // 运行dist文件
	  open: true,
	  hot: true, // 修改代码时页面刷新
	  //hotOnly: true // 修改代码时防止页面刷新
	},
	module: {
		rules: [
		  {
				test: /\.scss$/,
				use: [
				'style-loader', 
				{
					loader:'css-loader',
					options: {
						importLoaders: 2, // 引入的scss文件以此执行所有loader
						modules: true // 局部打包并引入css
					}
				},
				'sass-loader',
				'postcss-loader'
				]
	},
	{
				test: /\.css$/,
				use: [
				'style-loader', 
				'postcss-loader'
				]
	},
		]
	},
	devtool: 'cheap-module-eval-source-map', //出错文件映射
	plugins:[
  	new Webpack.HotModuleReplacementPlugin()  // 修改代码时防止页面刷新
  ],
}
module.exports = merge(commonConfig, devConfig)
