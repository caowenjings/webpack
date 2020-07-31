
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, "built")
    },
    module: {
        rules: [
            /*
            js兼容性处理：babel-loader @babel/core @babel/preset-env
            1. 基本js兼容性处理 @babel/preset-env
            问题： 只能转换基本语法，如promise不能转换
            2. 全部js兼容性处理。 @babel/polyfill
            问题： 只要解决部分兼容性问题，但是所有兼容性代码全部引入，体积太大
            3. 兼容性处理的： 按需加载。 core-js
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,//用于不检查第三方库
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样的兼容性处理，普通简单转换处理。
                    presets: [
                        '@babel/preset-env',
                    ],
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 制定 core-js的版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            { template: './src/index.html' }
        )
    ],
    mode: 'development'
}