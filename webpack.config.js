var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require('webpack');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader','css-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader",
    publicPath: './dist'
  })
var cssConfig = isProd ? cssProd : cssDev;
var config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: './app.bundle.js'
    },
    module: {
        rules:[
        {
            test:/\.css$/,
            use: cssConfig
        },
        {
            test:/\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test:/\.pug$/,
            use: 'pug-html-loader'
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: ['file-loader?name=[name].[ext]&outputPath=images/','image-webpack-loader']
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true,
        hot: true,
        port: 3333
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Movie App',
          minify:{
              collapseWhitespace: true
          },
          hash: true,
          template: './src/my-index.html', // Load a custom template (lodash by default see the FAQ for details)
        }),
        new ExtractTextPlugin({
            filename: 'custom-style.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
}

module.exports = config;
