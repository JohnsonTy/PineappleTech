const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require('dotenv').config();

const isProduction = (process.env.NODE_ENV === 'production');

const fileNamePrefix = isProduction? '[chunkhash].' : '';

module.exports = {
    mode: !isProduction ? 'development': 'production',
    entry: {
	  navbar: './src/js/navbar.js',
	  sidebar: './src/js/sidebar.js',
	  index: './src/js/site.js',
	  pc: './src/js/site.js',
	  calc: './src/js/site.js',
	  vr: './src/js/site.js',
	  faq: './src/js/site.js',
	  smart: './src/js/site.js',
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: fileNamePrefix + '[name].js',
      assetModuleFilename: "pics/[name][ext]",
      clean: true,
    },
    target: 'web',
    devServer: { 
      static: "./dist"
    }, 

    devtool: !isProduction ? 'source-map' : 'inline-source-map', 
    module: {
      rules: [	
        { 
          test: /\.js$/i,
          exclude: /(node_modules)/,
          use: { 
            loader: 'babel-loader', 
            options: {
            presets: ['@babel/preset-env']
          }}
        }, 
        { 
          test: /\.css$/i, 
          use: isProduction ?
            [ MiniCssExtractPlugin.loader, 'css-loader']	:
            [ 'style-loader', 'css-loader']		
        },
        { 
            test: /.s[ac]ss$/i, 
            use: isProduction ?
              [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']	:
              [ 'style-loader', 'css-loader' , 'sass-loader']		
        },
        {  
          test: /\.(svg|eot|ttf|woff|woff2)$/i,  
          type: "asset/resource",
        },
        {
          test: /\.(png|jpg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
        chunks: ["index"],
        inject: "body",
        filename: "index.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/pc.html"),
        chunks: ["pc"],
        inject: "body",
        filename: "pc.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/faq.html"),
        chunks: ["faq"],
        inject: "body",
        filename: "faq.html",
      }),
	  new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/calc.html"),
        chunks: ["calc"],
        inject: "body",
        filename: "calc.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/vr.html"),
        chunks: ["vr"],
        inject: "body",
        filename: "vr.html",
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/smart.html"),
        chunks: ["smart"],
        inject: "body",
        filename: "smart.html",
      }),
      new copyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/pics"),
            to: path.resolve(__dirname, "dist/pics"),
          },
		  {
            from: path.resolve(__dirname, "src/css"),
            to: path.resolve(__dirname, "dist/css"),
          },
        ],
      }),
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
}

 if(isProduction) {
  module.exports.plugins.push(
    new MiniCssExtractPlugin({
      filename: fileNamePrefix + "[name].css",
    })
  );
};