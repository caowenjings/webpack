

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "built")
    },
    /*
    1.对js进行语法检查语法检查：eslint-loader  依赖eslint库  
    2.注意：只检查自己写的js文件，不检查第三方插件
    3.符合：eslint不知道怎么检查所以要写规则，规则就用airbnb的js规则下载eslint-config-airbnb-base
       airbnb对应的库 --> eslint-config-airbnb-base ，eslint-plugin-import

      在package.json中配置eslintConfig
      "eslintConfig": {"extends": "airbnb-base"}

    下载：eslint-loader eslint,eslint-config-airbnb-base, eslint-plugin-import

    */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,//用于不检查第三方库
                loader: 'eslint-loader',
                options: {
                    fix: true// 自动修复eslint的修复
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'

        })
    ],
    mode: "development",
}