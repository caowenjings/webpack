import '../css/index.css';

console.log('加载了js文件');

function add(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(add(1, 2, 3, 4, 5));
