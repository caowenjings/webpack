/*
缓存：对babel，资源进行缓存
1.babel缓存：
为什么要缓存：类似于HRM，
            有100个js，其中一个js变了，另外99个js没有变 就用这缓存的，不用重新构建
            但是在生产环境下没有这个功能，因为HRM基于devServer，生产环境没有devServer
使用：cacheDirectory: true 第二次构建时，会读取之前的缓存，让第二次打包构建速度更快

2.资源缓存：
     强制缓存后，修改了文件重新构建刷新也不会变，
     原因是:资源在强制缓存期间不会访问服务器，是直接读取缓存


解决方法：给资源名称加版本号，资源名称变了就会重新请求，没有变就不会重新请求
      1.filename: 'js/built.[hash:10].js',
      1.hash：每次webpack都会生成一次唯一的hash值，不管文件有没有变化，hash也会变化
      2.chunkhash：根据chunk生成hash值，
      3.contenthahs：根据文件的内容生成hash值，不同文件hash值一定不一样

hash的弊端：每次webpack构建时会生成一次唯一的hash值。
     但是因为js和css同时使用一个hash值
     如果重新打包，会导致所以缓存失败，（可能我却只能改动一个文件）

chunkhash的弊端：根据chunk生成的hash值，如果打包来源于同一个chunk，
                那么hash值就是一样的
                问题：js和css的hash值还是一样的，因为css是在js中被引入的，所以同属与一个chunk

  作用：让代码上线运行缓存更好      
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
    entry: ['./src/js/index.js'],
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',//优先处理
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            },
            {
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
                            ],
                            /*
                             开启babel缓存
                             第二次构建时，会读取之前的缓存
                            */
                            cacheDirectory: true,

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
            filename: 'css/built.[contenthash:10].css'
        }),

        new OptimizeCssAssetsWebpackPlugin(),
    ],
    // 生产环境下js代码自动压缩
    mode: 'production'
}