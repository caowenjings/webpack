
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'built')
    },
    module: {
        rules: [

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true, //移除空格，换行
                removeComments: true//移除注释
            },
        })
    ],
    // 生产环境下js代码自动压缩
    mode: 'production'
}