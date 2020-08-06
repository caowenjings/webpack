/*
webpack原本的loader是将每个文件都过一遍，
比如有一个js文件 rules中有10个loader，第一个是处理js文件的loader，当第一个loader处理完成后webpack不会自动跳出，而是会继续拿着这个js文件去尝试匹配剩下的9个loader，相当于没有break。 
而oneOf就相当于这个break
在oneOf里面的loader一旦匹配成功则会跳出匹配，相当于break语句
*/
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcss = require('postcss-preset-env')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//压缩css

//定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = "production"
//提取复用的cssloader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,//css文件单独提取
    "css-loader",//将css文件插入js
    {
        // 还需要在package.json中配置browserslist
        loader: 'postcss-loader',//css兼容性处理：postcss
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'built')
    },
    module: {
        rules: [
            {
                //在package.json中eslintConfig指定airbnb规则
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',//优先处理
                loader: 'eslint-loader',
                options: {
                    fix: true// 自动修复eslint的修复
                }
            },
            {
                // 以下loader只能匹配一个文件
                // 注意：不能有两个配置处理同一个文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            ...commonCssLoader
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            "less-loader",
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3// 制定 core-js的版本
                                        },
                                        targets: { // 指定兼容性做到哪个版本的浏览器
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
                    },
                    {
                        test: /\.(jpg|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            esModule: false,
                            name: '[hash:10].[ext]',
                            outputPath: 'imgs'
                        },
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader' //处理html文件的img图片（负责引入img，从而能被url-loader进行处理)
                    },
                    {
                        exclude: /\.(js|css|less|html|jpg|png|gif)$/,//排除文件这些文件处理剩余的
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }

                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true, //移除空格，换行
                removeComments: true //移除注释
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),

        new OptimizeCssAssetsWebpackPlugin(),
    ],
    // 启动devServer的命令：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, 'build'), //项目构建后的路径
        compress: true,// 启动gzip压缩
        port: 8081,// 设置端口号
        open: true, //自动打开浏览器
    },
    // 生产环境下js代码自动压缩
    mode: 'production'
}