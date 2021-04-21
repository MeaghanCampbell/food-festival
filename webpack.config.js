// blueprint on the way webpack should behave in our project

const path = require('path')
const webpack = require('webpack')

module.exports = { 
    // where webpack looks to start building the module
    entry: './assets/js/script.js', 
    // tell where files are going to go and what are the names of the files
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // play a role in directing what the webpack does, like tell it to use jquery we installed
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    // development or production
    mode: 'development'
}