
/*
1.运行命令：
开发环境：webpack ./src/index.js -o ./build/build.js  --mode=development
        webpack会以./src/index.js为入口文件开始打包，打包后会输出./build/build.js整体打包环境
生产环境：webpack ./src/index.js -o ./build/build.js  --mode=production
    
2.webpack可以打包js/json，不可打包css,img


*/


function add(x, y) {//1.初次输入命令打包
    return x + y;
}
console.log(add(2, 3));



import data from "./data.json";//2.用于验证webpack能处理json文件
console.log(data);

import "./index.css" //3.此代码用于验证webpack不能处理css文件