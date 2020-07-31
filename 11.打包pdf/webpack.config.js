
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { options } = require('less');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'built')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            // a标签直接引入的pdf，导致wenbpack不能打包进入，则需要js动态引入再倒入
            {
                test: /\.pdf$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: './src/pdf',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,//移除空格，换行
                removeComments: true//移除注释
            },
        })
    ],
    // 启动devServer的命令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'), //项目构建后的路径
        compress: true,// 启动gzip压缩
        port: 8080,// 设置端口号
        open: true, //自动打开浏览器
    },
    // 生产环境下js代码自动压缩
    mode: 'production'
}

