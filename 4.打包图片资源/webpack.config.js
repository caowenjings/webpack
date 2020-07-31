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
            /*
           注意：1. 多个loader用use[]，一个用loader,loader: 'url-loader',
                2. 添加配置用options
                3. 图片大小小于8kb，就会被base64处理
                   优点：被base64处理了的，减少请求次数（减轻服务器的压力）
                   缺点：图片会有一点大，（文件请求速度慢）
            */

            //问题：默认处理不了html中img图片
            // 处理图片资源url-loader,file-loader
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    /*
                    问题：url-loader引入图片是使用es6模块，html-loader是使用commonJs引入图片
                    解析时会出现问题：【object moudel】
                    解决：关闭url-loader的es6模块化，使用commonjs解析
                    */
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs'
                    // 图片重命名
                    // [hash:10]取图片hash的前10位
                    // [ext]取文件原来的扩展名
                }
            },
            {
                test: /\.html$/,
                //处理html文件的img图片（负责引入img，从而能被url-loader进行处理)
                loader: 'html-loader'
            }

        ]
    },
    plugins: [
        new HtmlWbpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: "development"
}