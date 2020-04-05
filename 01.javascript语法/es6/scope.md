## 作用域
- 全局作用域
    - window
- 函数作用域
    - function  let 
- 块状作用域
    - let {} let const
- 动态作用域
    - bind ~

## let const
```js
var b=3  //可以重复定义  可以变量提升
let a=4  // 不可以 
console.log(window.b,window.a) //4 undefined
```

## Array
### ES5
````js
const arr=[1,2,3,4,5,6,7,8,9]
//专门数组遍历的
for(let i=0;i<arr.length;i++){
    if(item===2){
        // 可以使用break  continue
    }else{
        console.log(item)
    }
    console.log(arr[i])
}
//专门数组遍历的
arr.forEach(function(item){
     // 不可以使用break  continue
    console.log(item)
})
//专门数组遍历的
arr.every(function(item){
    // 不可以使用break  continue
    if(item===2){
        //跳过
    }else{
        console.log(item)
    }
    return true 
    // 只有返回true才会继续遍历
})
//for in  专门对象遍历的
for(let index in arr){
    // 可以使用break  continue
    console.log(index,arr[index])
}

````

ES6

```js
// for of  可以对数组以为的对象遍历(自定义遍历效果)
for(let item of arr){
    console.log(item)
}
```

## 伪数组转换成数组
### ES5
```js
//伪数组(是按照索引存储属性 具有length属性){0:'1',1:'2',length:2} 比如 arguments/NodeList  具有数组的长度  但是不能使用数组的方法  forEach
function(arguments){
    let  args=[].slice.call(arguments) //collection
    let  imgs=[].slice.call(document.querySekectirAkk('img')) //NodeList
} 
```
### ES6
```js
Array.prototype.from
  let  args=Array.from(arguments) //collection
  let  imgs=Array.from(document.querySekectirAkk('img')) //NodeList
  //Array.from(ArrayLike,mapFn,thisArg )
  //初始化一定的数组 并有默认值
  //ES5
  let array=Array(5)
  for(let i=0,len=array.length;i<len;i++){
      arr[i]=1
  }
  //ES6
  let array=Array.from({length:5},function(){return 1})
  consolr.log(array)
```

## 生成新数组
### ES5
```js
let array=Array(5)
let array=['','','']
```
ES6
```js
let array=Array.from({length:5},function(){return 1})
//Array.prototype.of 不用遍历与push
let array=Array.of(1,2,3,4,5,6)
// Array.prototype.fill
let array=Array(5).fill(7)  //[7,7,7,7,7,7,7]
//Array.fill(value,start=0,end=length-1 )
let array=[1,2,3,4,5]
array.fill(8,2,4)//[1,2,8,8,5]
```
## 解构赋值 从复杂数据取数据
### ES5
```js
let arr=['hello','world']
let firstNamr=arr[0] //使用索引
```
### ES6 
```js
let arr=['hello','world']
let [firstName,suiName]=arr
console.log(firstName)
let arr=['a','b','c','d']
let [a,,c]=arr

//右边是可遍历对象 
let arr='abcd'
let arr=new Set([1,2,3,4])
let [firsName,,thirdName]=arr
//不仅可以是简单地变量 也可以是复杂对象属性
let user={name:'s',surname:'t'};
[user.name,user.sername]=[1,2]  //不要加let 赋值
```

## 查找从数组中
### ES5
```js 
let array=[1,2,3,4,5]
// 判断长度是不是为0  返回所有符合条件的值
let find=array.filter(function(item){
    return item===2
})
//返回是否有符合条件的值    有或者没有  性能更好
// 但是不知道符合条件的位置(索引)
array.find(function(item){
    return item===2
})
```
### ES6
```js
//返回时索引 ES6 findIndex补足了ES5 find的缺陷
let find =array.findIndex(function(item){
    return item===2
})
```


## Class 

### ES5 怎么声明一个类
```js
let Animal=function(type){
    this.type=type
    //错误的写法 共有的要写在原型链上
    this.eat=function(){
        console.log('i am eatting')
    }
}

let dog=new Animal('dog')
let monkey=new Animal('monkey')
//错误的写法  改不了别人  只能改自己 
monkey.eat=function(){
    console.log('error')
}


//正确的写法
Animal.prototype.eat=function(){
    console.log('i am eat food)
}
monkey.constructor.prototype.eat=function(){
    console.log('error)
}
```


### ES6
```js

class Animal{
    constructor(type){
        this.type=type
    }
    eat(){
        console.log('i am eat food')
    }
}
let dog = new Animal('dog')
let monkey = new Animal('monkey ')

//以上的代码和ES5模拟类是一样的


//-----------------------------
//ES6 是如何做到属性的只读和保护

class Animal{
    constructor(type){
        this.type=type
    }
    //ES6 gtter setter 属性的保护 如果只有getter只能读，修改是不起作用
    get age(){
        return 4
    }
      // 这样写是有问题的  this.age=val 会再次出发set age
    // set age(val){
    //     this.age=val
    // }
    set age(val){
        this.realAge=val
    }
    eat(){
        console.log('i am eat food')
    }
}

let dog = new Animal('dog')
console.log(dog.age)//4
dog.age=5
console.log(dog.age)//4
console.log(dog.realAge)//5



let _age=4  //受保护的变量  形成闭包
class Animal{
    constructor(type){
        this.type=type
    }
    get age(){
        return _age
    }
    set age(val){
        if(val<7&&val>4){
            _age=val
        }
    }
}

let dog = new Animal('dog')
// age 是暴露给开发者操作数据的出入口  真实存储变量的不是age  虽然get set 是函数 但是调用的时候是属性
console.log(dog.age)
dog.age=6 //出发set age
console.log(dog.age)
console.log(dog._age) //访问不到_age
//有效的保护变量 利用闭包 都具有顶层作用域
```

##  操作一个方法(静态方法:类中可以直接访问 从实例中访问不到)

### ES5 
```js
let Animal= function(type){
    this.type=type
    this.eat=function(){
        console.log('i am eatting')
    }
}
//注意两种eat的写法 都是普通方法  不是静态方法
Animal.prototype.eat=function(){
    Animal.walk()//1 类可以直接访问
    //this.walk()//2 实例访问不到  因为不在原型链与this上
    console.log('i am eat food)
}
//这种是正确的
Animal.walk=function(){ 
    //静态方法
    console.log('i am walking)
}

let dog =new Animal('dog')
dog.eat()  //1
dog.eat()  //2  walk of  undefined






```
### ES6
```js
//ES5 的静态方法不太好记  而 ES6很好记
class Animal{
    constructor(type){
      this.type=type
    }
    eat(){
      Animal.walk()
      console.log('i am eat food')
    }
    static walk(){
      console.log('i am walk')
    }
}
let dog =new Animal('dog')
dog.eat()
// 以上与ES5 是一样的
```
什么时候用静态方法  什么时候用实列方法
如果你想一个方法里面不会涉及实列方法的内容就用静态方法 否则用静态方法  因为静态方法中拿不到实列中的属性与方法 相当于实列绝缘



### 继承
ES5 其中继承有很多
```js 
let Animal= function(type){
    this.type=type
}
Animal.prototype.eat=function(){
    console.log('i am eat food)
}
let Dog = function(){
    Animal.call(this,'dog') //改变this指针  Dog就有了Animal的方法  这样做法不能获取原型链上方法
    this.run=function(){
        console.log('i can run')
    }
}
//值类型 引用类型
Dog.prototype=Animal.prototype
let dog =new Dog('dog')
dog.eat()
```
ES6 
```js
class Animal{
    constructor(type){
        this.type=type
    }
    eat(){
        Animal.walk()
        console.log('i am eat food')
    }
    static walk(){
        console.log('i am walk')
    }
}

class Dog extends Animal{
    // 如果construstor中没有自己新属性  下面的是可以省略的  如果有的话  必须传参并且放在第一行
    // 默认值
    constructor(type){
        super(type)  //执行Animal的构造方法 
        this.age=2
    }
}
let dog =new Dog('dog')
dog.eat()
```


##  参数默认值
ES5
```js
let t= function(x,y,z){
    if(y===undefined){
        y=7   
    }
    if(z===undefined){
    z=42
    }
    return x+y+z
}
console.log(t(1,8.43))
```
ES6
```js
let f=function(x,y=7,z=42){
    return x+y+z
}
//通过传undefined 来传默认值的参数
console.log(f(1,undefined,43))
//默认值可以是前面参数的运算
let f=function(x,y=7,z=x+y){
    console.log(Array.from(arguments)) //ES5查看函数传入参数的情况  ES6建议不要使用

    // 如果你想知道函数参数的个数  在不适用arguments的情况请 获取传入参数的个数 可以通过f.length来获取传入没有默认值参数的个数
    return x*10+z
}
console.log(f(1,undefined,2)) //12
f(1) //18
f(1,9) //20
```  


## 不确定参数的问题

### ES5
```js
let f=function(x,y=7,z=x+y){
    console.log(Array.from(arguments)) 
}
//计算所传入参数的和
function sum (){
    let num = 0
    Array.prototype.forEach.call(arguments,function(item){
        num+=item*1
    })
    // Array.from(arguments).forEach(function(item){
    //     num+=item*1
    // })
    return num
}
```

### ES6
```js
//nums 是数组 可以使用数组很多方法
 function sum(...nums){
    //Rest parameter
    let num =0 
    num.froEach(function(item){
        num+=item*1
    })
    return num
 }

//可以拆解
 function sum(base,...nums){
    //Rest parameter
    let num =0 
    num.froEach(function(item){
        num+=item*1
    })
    return base*2+num
 }


 function sum(x=1,y=2,z=3){
     return x+y+z
 }
 let data=[4,5,7]
 //ES5
 sum(data[0],data[1],data[2])
 console.log(sum.apply(this,data))
 //ES6 结构
 console.log(sum(...data))
```

## 箭头函数 ()=>{}

```js
//ES5
function hello(){}
let hello=function(){}
//ES6 
let hello=()=>{}
//可以省略花符号
let sum=(x,y,z)=>x+y+z
//要带小括号
let sum=(x,y,z)=>({x,y,z})

//ES5 中函数中this  执行的时候谁调用了函数  this 就指向谁  会变谁调用就是指向谁
//ES6 中函数中this  函数在定义的时候  this就指向谁  就是谁
```




