const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Webpack = require('webpack')
const path = require('path');
module.exports = {
  entry: {
    main: './src/index.js',
 },
  module: {
		rules: [
		  {
            test: /\.(png|jpg|gif)$/,
            use: {
               loader: 'url-loader',  //和file-loader相似
               options: {
               	// placeholder  占位符
               	 name: '[name]_[hash].[ext]',
               	 outputPath: 'images/',
               	 limit: 204800  // 文件大于200kb时 打包到图片文件 否则打包到bundle.js内
               }
            }
		  },
		  {
            test: /\.(eot|ttf|svg)$/, // 打包字体图标文件
            use: {
               loader: 'file-loader'
            }
		  },
		  { 
			test: /\.js$/, 
			exclude: /node_modules/, 
			loader: "babel-loader",
			// 可以单独放到.babelrc文件中
			// options: {
			//   // "presets": ["@babel/preset-env"]  // es6转化维es5
			// //   "presets": [["@babel/preset-env", {
			// // 	  useBuiltIns: 'usage'
			// //   }]]  // 根据浏览器的需要添加es6方法
		    // 	"plugins": [["@babel/plugin-transform-runtime", {
			// 		"absoluteRuntime": false,
			// 		"corejs": 2,
			// 		"helpers": true,
			// 		"regenerator": true,
			// 		"useESModules": false
			// 	  }]]
			// }
		  }
		]
  },
  
	plugins:[new HtmlWebpackPlugin({
		template: 'src/index.html' // 模板文件
	}), 
    new CleanWebpackPlugin({cleanAfterEveryBuildPatterns: ['dist']}), // 清除dist目录
    new Webpack.HotModuleReplacementPlugin()  // 修改代码时防止页面刷新
  ], 
  output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist')
  },
  optimization: {
		usedExports: true,
    splitChunks: { // 代码分割
			chunks: 'all'
		}
  }
}