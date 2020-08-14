/*
摇晃树：把应用程序想成一颗树，
      引用的一些源代码，第三方库jquery这些，就可以看作成是树上的绿色叶子
      库里没有使用的代码，就可以看作成灰死的树叶
      要去掉这些灰死的树叶，就需要摇晃数，让灰死的树叶掉下来
树摇作用：去除无用代码，减少代码体积，减少程序执行时间

使用前提：1.必须要使用ES6模块化
          2.开启production环境
          作用：减少代码体积


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