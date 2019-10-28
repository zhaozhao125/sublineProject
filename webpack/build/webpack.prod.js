const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css分割
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const commonConfig = require('./webpack.common')
const prodConfig = {
	mode: 'production',

	// devServer: {
	//   contentBase: './dist', // 运行dist文件
	//   open: true,
	//   hot: true, // 修改代码时防止页面刷新
	//   hotOnly: true // 修改代码时防止页面刷新
	// },
	devtool: 'cheap-module-eval-source-map',//出错文件映射
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
      chunkFilename: '[id].css'
		})
	],
	module: {
		rules: [
		  {
				test: /\.scss$/,
				use: [
				MiniCssExtractPlugin.loader, 
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
				MiniCssExtractPlugin.loader, 
				'css-loader',
				'postcss-loader'
				]
	},
		]
	},
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})], // css压缩
		// cacheGroups: {
		// 	styles: {
		// 		name: 'styles',
		// 		test: /\.css$/,
		// 		chunks: 'all',
		// 		enforce: true
		// 	}
		// }
  },
}
module.exports = merge(commonConfig, prodConfig)