// 插件mini-css-extract-plugin
const { resolve } = require('path');
const HtmlWebpackPlugins = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//设置nodejs环境变量
// process.env.NODE_ENV = "development",
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "built")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // "style-loader",是创建style标签
                    //1.miniCssExtractPlugin是用link标签引入css，代替style-loader
                    miniCssExtractPlugin.loader,
                    "css-loader",//将css文件整和到js文件
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: () => [//postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                    /*
                    2.css兼容性处理：postcss
                    postcss-preset-nev是帮助package.json中browserslist里面的配置，通过配置加载制定的css兼容性样式
                    
                    "browserslist": {
                        //开发环境--》设置node的环境变量：process.env.NODE_ENV
                        "development": [
                             "last 1 chrome version",
                             "last 1 firefox version",
                             "last 1 safari version"
                            ],
                        //生产环境：默认是生产环境
                        "production": [
                              ">0.2%",
                              "not dead",
                              "not op_mini all"
                            ]
                        }         
                    
                    默认配置："postcss-loader"" ,
                    修改loader的配置：
                    */

                ]
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugins({
            template: "./src/index.html"
        }),
        new miniCssExtractPlugin({
            filename: "./src/css/built.css"
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: "development",
}