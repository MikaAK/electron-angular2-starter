var path                          = require('path'),
    webpack                       = require('webpack'),
    ExtractTextPlugin             = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin             = require('html-webpack-plugin'),
    webpackTargetElectronRenderer = require('webpack-target-electron-renderer'),
    isDev                         = !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    isProd                        = process.env.NODE_ENV === 'production',
    isTest                        = process.env.NODE_ENV === 'test',
    srcDir                        = path.resolve(__dirname, 'src')

var vendorFiles = [
  'babel-core/polyfill',
  'babel-core/external-helpers',
  'reflect-metadata'
]

var loaderConfig = {
  babel: 'babel?cacheDirectory&optional[]=runtime',
  cssLoader: '!css' + isProd ? '?minimize' : '' + '!postcss',
  ts: 'ts?ignoreDiagnostics[]=2300&ignoreDiagnostics[]=2309&ignoreDiagnostics[]=2307'
}

var environmentPlugin = new webpack.DefinePlugin({
  __DEV__: isDev,
  __PROD__: isProd,
  __TEST__: isTest
})

var config = {
  context: __dirname,
  entry: {
    vendor: vendorFiles,
    app: './src/index.ts'
  },
  devtool: false,
  output: {
    path: __dirname + '/dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.jade']
  },
  plugins: [
    environmentPlugin,
    new HtmlWebpackPlugin({
      title: 'Pika',
      minify: false,
      template: 'src/index.jade'
    })
  ],
  module: {
    loaders: [{ 
      test: /\.ts$/, 
      loader: loaderConfig.babel + '!' + loaderConfig.ts,
      include: [
        srcDir
      ]
    }, {
      test: /\.js$/,
      loader: loaderConfig.babel,
      include: [
        srcDir
      ]
    }, {
      test: /\.css$/,
      loader: isProd ? ExtractTextPlugin.extract('style', loaderConfig.css) : 'style' + loaderConfig.css,
      include: [
        srcDir
      ]
    }, {
      test: /\.jade$/,
      loader: 'jade',
      include: [
        srcDir
      ]
    }]
  }
}


// Add node_modules to exclude
for (var i = 0; i < config.module.loaders.length; i++) {
  var loader = config.module.loaders[i]

  if (loader.exclude)
    loader.exclude.push('node_modules')
  else
    loader.exclude = ['node_modules']
}

if (isProd)
  config.push(
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
    new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    })
  )

config.target = 'atom'

module.exports = config
