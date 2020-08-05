import "../css/index.less";
import { start } from './timer'
import { message } from './foo'
console.log("加载了js")

// 1.没有热更新时
//改变timer.js的延迟时间时，计数会从0开始计数
// start(Update, 0);



/* 
module.hot.accept() 告诉 Webpack，当前模块更新不用刷新
module.hot.decline() 告诉 Webpack，当前模块更新时一定要刷新
在热更新的机制中，以这种“声明”的方式告知 Webpack，
哪些模块的更新是被处理的，
哪些模块的更新又不被处理
*/

// 2.有热更新时
//改变timer.js的延迟时间时，计数会接着开始

var current = 0

if (module.hot && module.hot.data) {
    current = module.hot.data.current
}
var root = document.getElementById('root')
var stop = start(onUpdate, current)


if (module.hot) {

    module.hot.accept()
    module.hot.dispose(data => {
        data.current = current
        stop()
    })


    module.hot.accept('./timer', function () {
        stop()
        stop = start(onUpdate, current)
    })
    module.hot.decline('./foo')
}
function onUpdate(i) {
    current = i
    root.textContent = '#' + i // 修改数值渲染
}

/*
3.处理自身模块
module.hot.dispose() 用于注册当前模块被替换前的处理函数，并且回调函数接收一个 data 对象，可以向其写入需要保存的数据，这样在新的模块执行时可以通过 module.hot.data 获取到：
首先，模块执行时，先检查有没有旧模块留下来的数据，如果有，就恢复。
然后在模块被替换前的执行处理，这里就是记录数据、停掉现有的定时器：
做了这些处理之后，修改 index.js 的 onUpdate，使得渲染到页面的数值改变，也可以在不刷新的情况下体现：

if (module.hot && module.hot.data) {
    current = module.hot.data.current
}
module.hot.accept()
module.hot.dispose(data => {
    data.current = current
    stop()
})
*/