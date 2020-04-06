import $ from 'jquery'
// var $ = require('jquery')
console.log($)
const a = 1 // ES6新特性：const
let b = 2 // ES6新特性：let
const c = () => a + b // ES6新特性：箭头函数
if(__DEV__){
    console.log(a, b, c())
}
export default 'hello world!';
