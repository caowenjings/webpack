const { resolve } = require("path");
const HtmlWbpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
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
                test: /\.(jpg|png|gif)$/,
                //多个loader用use，一个用loader
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }

        ]
    },
    plugins: [
        new HtmlWbpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development",
    /* 
    开发服务器 devServer:用来自动化（自动编译，自动执行webpack，自动打开浏览器，自动刷新浏览器）
    特点：只会在内存中编译打包，不会有任何输出
    启动devServer的命令：npx webpack-dev-server
    */
    devServer: {
        //项目构建后的路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 设置端口号
        port: 8080,
        //自动打开浏览器
        open: true,

    }
}