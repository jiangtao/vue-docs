var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	entry: {
		main: [path.resolve(__dirname, 'src/entry.js')]
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.css', '.vue', '.json'],
		alias: {
			'vue': 'vue/dist/vue.runtime.common.js',
			'pages': path.resolve(__dirname, 'src/pages'),
			'md': path.resolve(__dirname, 'src/markdown')
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"develop"'
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'index.html')
		})
	],
	module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 1,
				name: 'img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 1,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	babel: {
		presets: ['es2015', 'stage-0'],
		plugins: ['transform-vue-jsx', 'transform-runtime']
	},
	vue: {
		postcss: [
			autoprefixer({ browsers: ['last 7 versions'] })
		]
	},
	devServer: {
		noInfo: true
	},
	server: {
		port: 8080
	}
}
