import $ from 'jquery'
console.log($)
const a = 1 // ES6新特性：const
let b = 2 // ES6新特性：let
const c = () => a + b // ES6新特性：箭头函数
console.log(a, b, c())
export default 'hello world!';
