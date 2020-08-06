/*
一般情况下，一个模块发生变化，比如只改变一个css文件，js文件没有变化，结果全部重新加载 


HMR：hot module replacement 热模块替换/模块热替换
作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
     极大提升构建速度

     样式文件：可以使用HRM功能，style-loader内部实现了
     js文件： js文件默认不能使用HRM功能
              解决：修改js代码，添加支持HRM的代码
              注意：模块热更新，不能用在入口的主文件里，只能用在分支上面
     html文件： html文件默认不能使用HRM功能，同时还会导致问题：html文件不能热更新了，改变了东西不能在页面上改变了
               解决：修改entry入口，将html文件引入，依旧默认不能使用HRM功能
               (只有一个html文件，不需要做HRM功能)


启动：1.HotModuleReplacementPlugin 插件是 Webpack 自带的，在 webpack.config.js 加入就好：
       plugins: [ webpack.HotModuleReplacementPlugin(),] 
     
     2.直接通过 webpack-dev-server 启动 Webpack 的开发环境：
     devServer: {hot: true,}
*/


const { resolve } = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugins = require("html-webpack-plugin");
module.exports = {
    entry: ["./src/js/index.js", "./src/index.html"],
    output: {
        filename: "js/built.js",//输出到js文件夹
        path: resolve(__dirname, "built")
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]

            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: "[hash:10].[ext]",
                    outputPath: 'img',//输出到img文件夹
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugins({
            template: './src/index.html'
        }),

        new webpack.HotModuleReplacementPlugin()//hrm热更新插件
    ],
    mode: "development",
    // 启动devServer的命令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8081,
        open: true,
        hot: true,//开启HRM功能
    }
}