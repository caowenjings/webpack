

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "built")
    },
    /*
    规范语法，让代码风格一致
    语法检查：eslint-loader  依赖eslint库
    下载：eslint-loader eslint,eslint-config-airbnb-base, eslint-plugin-import
    */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,//用于不检查第三方库
                loader: 'eslint-loader',
                optino: {}

            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'

        })
    ],
    mode: "development",
}