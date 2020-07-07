/*
loader:1.下载  2.使用
plugins:1.下载  2.引入  3.使用
*/
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path");
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, "build"),
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        /*
        html-webpack-plugin:默认会创建一个空的html，自动引入打包输出的所有资源（js/css）
        需求：需要有内容结构的html文件，用template实现
        */
        new HtmlWebpackPlugin({
            //复制 "./index.html"文件，并且自动引入打包输出的所有资源（js/css）
            template: "./index.html"
        })
    ],
    mode: "development",//开发模式
}