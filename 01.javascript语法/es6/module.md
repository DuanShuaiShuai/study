```js
//导出
const name='kkk',
let addr='asdfasdf',
let list=[1,2,34]
export default name
export {
    list,
    addr
}

//等价于
export default name
export let addr='asdfasdf',
export let list=[1,2,34]


//引入
import name,{ addr as addr2 ,list } from './'
import name2 ,{ addr as addr2 ,list } from '.、'

import * as Ttt from '.、'

Ttt.addr
Ttt.list



```
