
const { resolve } = require("path");
const HtmlWebpackPlugins = require("html-webpack-plugin");
module.exports = {
    entry: "./src/js/index.js",
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
        })
    ],
    mode: "development",
    // 启动devServer的命令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 8080,
        open: true,

    }

}