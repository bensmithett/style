const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

// I've defined these loaders up here because we'll reuse the css
// and postcss configurations for both .css and .sass files, but you
// don't need to.
const loaders = {
  css: {
    loader: 'css-loader'
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ]
    }
  },
  sass: {
    loader: 'sass-loader',
    options: {
      indentedSyntax: true,
      includePaths: [path.resolve(__dirname, './stylesheets')]
    }
  }
}

const config = {
  entry: {
    app: ['./stylesheets/index.webpack']
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [loaders.css, loaders.postcss]
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [loaders.css, loaders.postcss, loaders.sass]
        })
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './css'),
    publicPath: '/css'
  },

  plugins: [new ExtractTextPlugin('[name].css')],

  resolve: {
    extensions: ['.js', '.sass', '.css'],
    modules: ['stylesheets', 'node_modules']
  }
}

module.exports = config
