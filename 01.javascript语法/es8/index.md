## 比Promise更好的异步（Promise的语法糖）

```js
async function firstAsync(){
    return 27
}
//相当于  
function firstAsync(){
    return Promise.resolve(27)
}

console.log(firstAsync()) //Promise对象 
firstAsync().then(data=>{
    console.log(data)  //27
})

//async  内部有异步函数
async function firstAsync (){
    let promise= new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('now its done')
        },1000)
    })
    promise.then(val=>{
        console.log(val)
    })
console.log(2)
    return Promise.resolve(3)
}


async function firstAsync (){
    let promise= new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve('now its done')
        },1000)
    })
    let result = await promise  //相当于一个表达式
    console.log(result)
    console.log(await 40)
    console.log(await Promise.resolve(40))
    console.log(2)
    return Promise.resolve(3)
}
// await 必须配合async 使用  
firstAsync().then(val=>{
    console.log(val)
})
```

##  新增加对Object遍历的方法
```js
let grade ={
'lilei':96,
'dss':99
}
//之前  
for(let [k,v] of grade){ //报错  grade 不是一个可遍历的对象
    console.log(k,v)
}

for(let k in grade){ 
    if(k==='lilei'){
        console.log(k)
    }
}

console.log(Object.values(grade))
console.log(Object.keys(grade))
console.log(Object.keys(grade).filter(item=>item==='lilei'))


//为了对象为新的api  entries

for(let [k,v] of Object.entries(grade)){ //将对象可遍历对象
    console.log(k,v)
}

```

## String  对其补白方式 美化格式

```js  
for(let i=1;i<32;i++){
    if(i<10){
        console.log(`0${i}`)
    }else{
        console.log(i)
    }
}


for(let i=1;i<32;i++){
    //两位  不够补0
   console.log(i.toString().padStart(2,'0'))
   console.log(i.toString().padEnd(2,'0'))
}
```

## 数据描述符 

```js
const data={
    PortLand:'78/50',
    Port:'78/51',
    Land:'79/50'
}

Object.defineProperty(data,'Land',{
    enumerable:false
})


console.log(Object.getOwnPropertyDescriptors(data))//获取描述符
console.log(Object.getOwnPropertyDescriptor(data,'Land'))//获取指定属性描述符

```