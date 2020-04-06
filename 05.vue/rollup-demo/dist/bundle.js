/* my-library version 1.0.1 */
'use strict';

var ENVIRONMENT = "production";

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $ = _interopDefault(require('jquery'));

// var $ = require('jquery')
console.log($);
var a = 1; // ES6新特性：const
var b = 2; // ES6新特性：let
var c = function () { return a + b; }; // ES6新特性：箭头函数
if(__DEV__){
    console.log(a, b, c());
}
var foo = 'hello world!';

var version = "1.0.0";

// 
setTimeout(function (){
    console.log(("啊哈哈" + ('version'+version)));
},200);

function main () {
  console.log(foo);
}

module.exports = main;
/* follow me on Twitter! @rich_harris */
//# sourceMappingURL=bundle.js.map
