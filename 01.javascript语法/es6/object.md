# Object

```js

let x=1;let y=2; let z=3
let obj={
    'x':x,
    y,
    [z+y]:6,
    hello(){
        console.log('hello')
    }
}
```

## Set唯一的  不重复 本质也是key:value  value 可以是任意值
```js
let s=new Set()
s.add('helle').add('googbye').add('hello')  //会过滤掉
s.clear() //清空
s.has('hello')  // 判断是否存在
s.delete('hello')
s.size  //长度
s.forEach(item=>{
  console.log(item)
})
for(let item of s){
    console.log(item)
}
```

## Map key可以是任意值 字典类型

```js
let map = new Map([[1,2],[3,4],...[key:value]])
//添加与修改
map.set('a','b')
map.set(3,4)
map.delete(key)
map.clear()
map.size
map.has(key)
map.get(key)
map.keys()
map.values()
map.entries()
map.forEach((value,key)=>{
  console.log(value,key)
})
for(let [key,value] of map){
    console.log(key,value )
}
```


## copy对象

ES5
```js
遍历和赋值
```

ES6
```js
const target ={}  //不能位undefined null
const source ={b:4,c:5} //可为undefined null 效果相当于{}
//弊端 不能深层赋值  只能浅赋值  但是可以递归 assign(深Copy)
Obect.assign(target,source)
```