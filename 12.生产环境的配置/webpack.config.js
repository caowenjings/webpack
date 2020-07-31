
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcss = require('postcss-preset-env')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')//压缩css

/*
正常情况下，一个文件只能被一个loader处理，当一个文件要被loader处理，那么一定要指定loader执行的先后顺序
先执行eslint，后执行babel
1.css的处理：
   1.1 css文件单独提取 MiniCssExtractPlugin
   1.2 css兼容性处理 postcss
   1.3 压缩css OptimizeCssAssetsWebpackPlugin
   1.4 提取复用的css
2.js的处理：
   2.1  js的语法检查   下载：eslint-loader eslint,eslint-config-airbnb-base, eslint-plugin-import
                      在package.json中配置eslintConfig 
                      "eslintConfig": {"extends": "airbnb-base"}
   2.2  js的兼容性处理  @babel/preset-env的按需加载  
   2.3  js的压缩     mode: 'production'

3.图片的处理：
   3.1  url-loader file-loader 处理背景图片
   3.2  html-loader 处理html文件的img图片

4.处理html文件
   4.1  HtmlWebpackPlugin  
   4.2  压缩文件   minify: {
                   collapseWhitespace: true, //移除空格，换行
                   removeComments: true //移除注释
                  },
*/

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


/*
                      "browserslist": {
                          "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                          ],
                          "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                          ]
                        },
*/