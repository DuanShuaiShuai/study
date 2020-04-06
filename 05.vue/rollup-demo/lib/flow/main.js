//      
import foo from './foo.js';
import { version } from '../../package.json';

var a= 1
setTimeout(()=>{
    console.log(`啊哈哈${'version'+version}`)
},200)
function square(n){
  return n * n;
}
square(2);

export default function () {
  console.log(foo);
}
