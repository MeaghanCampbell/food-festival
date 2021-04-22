// blueprint on the way webpack should behave in our project

const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = { 
    // where webpack looks to start building the module
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    // tell where files are going to go and what are the names of the files
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",
    },
    module: {
        rules: [
          {
            test: /\.jpg$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name(file) {
                    return '[path][name].[ext]';
                  },
                  publicPath: function(url) {
                    return url.replace('../', '/assets/');
                  }
                }
              },
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
    // play a role in directing what the webpack does, like tell it to use jquery we installed
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        }),
        new WebpackPwaManifest({
          name: "Food Event",
          short_name: "Foodies",
          description: "An app that allows you to view upcoming food events.",
          start_url: "../index.html",
          background_color: "#01579b",
          theme_color: "#ffffff",
          fingerprints: false,
          inject: false,
          icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }]
        })
    ],
    // development or production
    mode: 'development'
}

module.exports = config;