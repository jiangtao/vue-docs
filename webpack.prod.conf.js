var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        main: [path.resolve(__dirname, 'src/entry.js')],
        vendors: ['vue', 'vue-router']
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[id].[hash:7].js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.runtime.common.js',
            'pages': path.resolve(__dirname, 'src/pages'),
            'components': path.resolve(__dirname, 'src/components')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('css/[name].[hash:7].css'),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.[hash:7].js'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html')
        })
    ],
    module: {
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		},{
			test: /\.md$/,
			loader: 'vue-marked-loader'
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
    vueMarked: {
		code2html: ['example', 'interface'],
		use: function(marked, code, lang, highlight) {
			if(lang == 'example'){
				return `${code}<h2 id="demo">code</h2><pre class="${this.options.langPrefix}${lang}"><code>${highlight.highlightAuto(code).value}</code></pre>`
			}
			if(lang == 'interface'){
				try{
					var yaml = require('yamljs')
					var jsonStr = JSON.stringify(yaml.parse(code), null, 2)
					return `<vue-doc-tabs :data='${jsonStr}'></vue-doc-tabs>`
				} catch(e){
					return 'yaml parse error, check your interface code'
				}
			}
		},
	},
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
        },
        postcss: [
            autoprefixer({ browsers: ['last 7 versions'] })
        ]
    }
}
