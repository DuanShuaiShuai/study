# Generator
## 如何让遍历停下来
```js
function loop(){
 for(let i=0;i<5;i++){
         console.log(i)
 }
}
loop()

//改造后
function * loop(){
 for(let i=0;i<5;i++){
    yield console.log(i)
 }
}
const l = loop()

l.next()
l.next()

// function * gen(){
//     let val
//     val = yield 1
//     console.log(val) //yield 为undefined
// }
// const l = gen()
// l.next()
// l.next()



function * gen(){
    let val
    val = yield * [1,2,3]
    console.log(val) //yield 为undefined
}

const  l = gen()
console.log(l.next())  //有* {value:1,done:fasle}   无 {value:[1,2,3],done:fasle}
console.log(l.next())  //有* {value:2,done:fasle}   无 {value:undefined,done:true}

// yield 之后加* 代表 遍历的对象或者是generator对象 
  
// 传参
function * gen(){
    let val
    val = yield * [1,2,3]
    console.log(val) //yield 为20  next传过来的
}
const l=gen()
l.next(10)
l.next(20) //传给yield返回值


// 传参
function * gen(){
    let val
    val = yield * [1,2,3]
    console.log(val) //不会打印
}
const l=gen()
l.next(10)
l.return(100) // 可以终止  {value:100,done: true}
l.next(20) //传给yield返回值




function * gen(){
    while(true){
        try{
            yield 1
        }catch(e){
            console.log(e.message)
        }
    }
}
const g=gen()
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
g.throw(new Error('ss')) //从外面向内部传异常  流程不会受干扰  不会停止掉
console.log(g.next())
console.log(g.next())
```

## 实战
```js 

function draw(first=1,second=3,third=5){
    let firstPrize=['1A','1B','1C','1D','1E']
    let secondPrize=['2A','2B','2C','2D','2E','2F','2H','2G ']
    let thirdPrize =['3A','3B','3C','3D','3E','3F','3G','3H','3J','3K','3L','3M','3N','3']
    let result=[]
    let random=''
    //抽一等奖
    for(let i=0;i<first;i++){
        random=Math.floor(Math.random()*firstPrize.length)
        result=result.concat(firstPrize.splice(random,1))
    }

    //抽二等奖
    for(let i=0;i<second;i++){
        random=Math.floor(Math.random()*secondPrize.length)
        result=result.concat(secondPrize.splice(random,1))
    }
    //抽三等奖
    for(let i=0;i<third;i++){
        random=Math.floor(Math.random()*thirdPrize.length)
        result=result.concat(thirdPrize.splice(random,1))
    }

}
let t=draw()

```


### ES6
```js

function * draw(first=1,second=3,third=5){
    let firstPrize=['1A','1B','1C','1D','1E']
    let secondPrize=['2A','2B','2C','2D','2E','2F','2H','2G ']
    let thirdPrize =['3A','3B','3C','3D','3E','3F','3G','3H','3J','3K','3L','3M','3N','3']
    let count=0
    let random 
    while(1){
        if(count<first){
            random=Math.floor(Math.random()*firstPrize.length)
            yield firstPrize[random]
            count++
            firstPrize.splice(random,1)
        }else if(count < first + second){
            random=Math.floor(Math.random()*secondPrize.length)
            yield secondPrize[random]
            count++
            secondPrize.splice(random,1)
        }else if(count < first + second + third){
            random=Math.floor(Math.random()*thirdPrize.length)
            yield thirdPrize[random]
            count++
            thirdPrize.splice(random,1)
        }else{
            return false
        }
    }

}
let t=draw()
t.next().value
t.next().value
t.next().value
t.next().value
```