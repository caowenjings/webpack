/*
webpack.config.js是webpack的配置文件
作用：指示webpack干哪些活（当你运行webpack指令，会加载里面的配置）

webpack是基于nodejs的，Node 应用由模块组成，采用 CommonJS 模块规范
 webpack配置
    1.入口起点
    2.输出路径
    3.loader的配置
    4.插件的配置
    5.模式的定义
*/

const { resolve } = require("path");//resolve用来拼接绝对路径的方法；(用nodejs的path方法)
module.exports = {
    // 1.入口起点
    entry: './src/index.js',
    // 2.输入路径
    output: {
        // 2.1输出文件名
        filename: 'bulut.js',
        // 2.2输出路径  __dirname是nodejs的变量，代表当前webpack.config.js文件的目录绝对路径
        path: resolve(__dirname, "build"),
    },
    // 3.loader的配置
    module: {
        rules: [
            {
                //test:正则匹配哪些文件
                test: /\.css$/,
                //使用哪些loader进行处理
                use: [
                    //use的执行顺序从右到左，从下到上的顺序
                    'style-loader',//创建style标签，将js中的样式资源插入进去，添加到head中生效
                    "css-loader"//将css文件变成commonjs模块加载js，里面内容是字符串
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",//将less转化为css
                ]
            }
        ]
    },
    // 4.插件的配置
    plugins: [

    ],
    // 5.模式
    mode: "development",//开发模式

}