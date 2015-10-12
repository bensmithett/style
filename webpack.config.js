var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')

var cssLoaders = ['css-loader', 'postcss-loader']
var sassLoaders = ['sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './stylesheets')]

var config = {
  entry: {
    app: ['./stylesheets/index.webpack']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.concat(sassLoaders).join('!'))
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './css'),
    publicPath: '/css'
  },
  plugins: [new ExtractTextPlugin('[name].css')],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    }) 
  ],
  resolve: {
    extensions: ['', '.js', '.sass', '.css'],
    modulesDirectories: ['stylesheets', 'node_modules']
  }
}

module.exports = config
