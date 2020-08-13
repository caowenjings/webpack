/*
服务器代码

启动服务器指令：方法1:cnpm i nodemon -g 
                   nodemon server.js

             方法2:node server.jS

访问服务器地址：http：//localhost：3000

 var express = require("express");//引用express
 var app = express();//搭建应用
 app.listen(3000);//监听端口
 app.get("/", function (req, res) {//注册请求
     res.send("第一个本地服务器");
 });
*/



const express = require('express');

const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位msx
app.use(express.static('build', { maxAge: 1000 * 3600 }));

app.listen(3000, (err) => {
    if (!err) console.log("服务器启动成功！")
    else console.log(err)
});
