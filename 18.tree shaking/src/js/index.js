import '../css/index.css';
import { mul } from './test';

console.log('加载了js文件');

function add(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(`加法 ：${add(1, 2, 3, 4, 5)}`);

console.log(`乘法：${mul(4, 5)}`);
