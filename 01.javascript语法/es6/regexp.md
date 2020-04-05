# Regexp Sticky
```js
const s='aaa_aa_a'

const r1=/a+/g
const r2=/a+/y   //y 的粘连效果 ^$

console.log(r1.exec(s))
console.log(r2.exec(s))


console.log(r1.exec(s))
console.log(r2.exec(s))
```

## 如何处理中文问题
### unicode
```js
//u修字符  
```

## 反射 在执行的时候才知道用啥方法

```js
let price =91.5
if(price>100){
    price=Math.floor.apply(null,[price])
}else{
    price=Math.ceil.apply(null,[price])
}
console.log(Reflect.apply(price>100?Math.floor:Math.ceil,null,[price]))
let d=new Date()
console.log(d.getTime())
//动态的实例化不同的对象
let d=Reflect.construct(Date,[])
console.log(d.getTime())
const student={x:1,y:2}
const r=Object.defineProperty(student,'name',{value:'Mike2'})
const r=Reflect.defineProperty(student,'name',{value:'Mike2'})
Reflect.deleteProperty(student,'x')
Object.deleteProperty(student,'x')
//都是给对象的属性定义值 但是返回值不一样
Reflect.get(student,'x') //动态的读取某个对象的方法
Reflect.set(student,'2','kk') //设置自己的属性
Reflect.getPrototypeOf(student) //原型上的方法
Reflect.has(student,'x')//看某个对象是不是有定义

Reflect.isExtensible(student) //是否可扩展
Object.freeze(student)//禁止扩展
Reflect.preventExtensions(student)//禁止扩展
student.z=7  //被冻结后就不会改变student对象
Reflect.ownKeys(student) //返回自己的属性 
Reflect.setPrototypeOf(arr,String.prototype)//设置对象的原型指向
```


##  Proxy

###  改变信息
```js
let  o={
    name:'xiaoming',
    price:120
}
let d=new Proxy(o,{
    get(target,key){
        if(key==='price'){
            return target[key]+20
        }else{
            return target[key]
        }
    }
})
console.log(d.price,d.name)
```


### 代理 展示信息 只能读 但是不能修改
```js
//ES6
let  o={
    name:'xiaoming',
    price:120
}
let d=new Proxy(o,{
    get(target,key){
        return target[key]
    }
    set(target,key,value){
        return false
    }
})
d.price=400 //无用                                                                     
console.log(d.price,d.name)
//ES5
for (let [key] of Object.entries(o)){
    Object.defineProperty(o,key,{
        writable:false
    })
}
```

###  校验  对赋值 进行校验
```js
 let d=new Proxy(o,{
     get(target,key){
         return target[key] || ''
     },
     set (target,key,value){
         if(Reflect.has(target,key)){
            if(key==='price'){
                if(value>=300){
                    return false
                }else{
                    target[key]=value
                }
            }else{
                target[key]=value
            }    
         }else{
            return false
         }
         
     }
 })
```

### 防篡改
```js

class Conponent{
    constructor(){
        this.proxy=new Proxy({id:Math.random().toString(36).slice(-8)},{})
    }
    get id(){
        return this.proxy.id
    }
}
```
### 可撤销
```js
let d=Proxy.revocable(o,{
    get(target,key){
        return target[key]
    }
    set(target,key,value){
        return false
    }
})
//返回的d对象不是单纯的代理信息  要通过d.proxy获取new Proxy的信息
// 可以通过d.revoke()撤销
console.log(d.proxy,d.name)
setTimeout(function(){
    d.revoke()
    setTimeout(function(){
        console.log(d.proxy.price)
    },1000)
},1000)
```

