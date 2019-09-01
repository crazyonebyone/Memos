const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/App.tsx'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[hash].bundle.js'
	},
	resolve: {
		alias: {
			containers: path.resolve(__dirname, './src/containers'),
			src: path.resolve(__dirname, './src'),
			components: path.resolve(__dirname, './src/components')
		},
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		hot: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.tsx$/,
				use: [
					'babel-loader?cacheDirectory',
					"awesome-typescript-loader"
				]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				use: [
					'source-map-loader',
					'babel-loader?cacheDirectory'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './src/index.html'})
	  ]
  };