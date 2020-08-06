/*
source-map:一种提供源代码到构建后代码映射技术
          （如果构建后代码出错了，通过映射可以追踪源代码错误）

使用：
[inline-|hidden-|eval-][nosources-][cheap-][module-]source-map

source-map         外部
                    1.错误代码准确信息 和 源代码的错误位置
inline-source-map  内联 
                    1.只会会在built.js底部中生成一个base的东西
                    2.错误代码准确信息 和 源代码的错误位置
hidden-source-map  外部 会生成一个built.js.map的文件
                    1.错误代码准确信息 但是没有错误位置 不能追踪代码错误，只能提示到构建后代码的错误位置 （只隐藏源代码，会提示构建后的代码）
eval-source-map    内联  
                    1.每一个文件都会生成对应的source-map，都在eval里
                    2.错误代码准确信息 和 源代码的错误位置  （文件多了hash值）


nosources-source-map         外部
                    1.错误代码准确信息 但是没有任何源代码信息（全部隐藏）
cheap-source-map         外部
                    1.指出一行错误代码，不能准确的指出哪一部分
cheap-module-source-map         外部 
                    1.错误代码准确信息 但是没有任何源代码信息                 


内联和外联的区别：1.外部生成了文件，内联没有  2.内联构建速度更快

速度快：eval>inline>cheap
      eval-cheap-source-map   >  eval-source-map(组合更快)

调试更友好：source-map > cheap-modlue-source-map > cheap-source-map



开发环境：速度快，调试更友好
      
eval-source-map /eval-cheap-modul-source-map
        

生产环境：源代码要不要隐藏？调试是否友好

source-map / cheap-modlue-source-map
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "./built")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
            },
            {
                test: /\.html$/,
                use: [
                    "html-loader",
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development",
    // npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'built'),
        compress: true,
        port: 2000,
        open: true,
    },
    devtool: "nosources-source-map"

}