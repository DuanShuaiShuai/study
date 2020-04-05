##  ES9中异步操作集合是如何遍历的呢

```js
function Gen(time){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            resolve(time)
        },time)
    })
}

function test(){
    let arr =[Gen(2000),Gen(3000),Gen(4000)]
    for(let item of arr){
        console.log(Date.now(),item.then(console.log))
    }
}

test()
/**
1584681283808 Promise { <pending> }
1584681283813 Promise { <pending> }
1584681283813 Promise { <pending> }
2000
3000
4000 
 */



async function test(){
    let arr =[Gen(2000),Gen(3000),Gen(4000)]
    for(let item of arr){
        console.log(Date.now(),await item.then(console.log))
    }
}

test()
/**
2000
1584681304711 undefined
3000
1584681306715 undefined
4000
1584681307714 undefined
 */


async function test(){
    let arr =[Gen(2000),Gen(3000),Gen(4000)]
    for await (let item of arr){
        console.log(Date.now(),item)
    }
}

test()
/**
1584681506366 2000
1584681507366 3000
1584681508366 4000
*/
//必须有asyncIterator属性才支持遍历
const obj ={
    count:0,
    Gen(time){
        return new Promise((resolve,reject)=>{
            setTimeout(function(){
                resolve({done:false,value:time})
            },time)
        })
    },
    [Symbol.asyncIterator](){
        let self=this
        return {
            next(){
                self.count++
                if(self.count<4){
                    return self.Gen(Math.random()*1000)
                }else{
                    return Promise.resolve({
                        done:true,
                        value:""
                    })
                }
            }
        }
    }
}
async function test(){
    for await(let item of obj){
        console.log(new Date(),item)
    }
}
test()
```


##  Promise 兜底


```js
function Gen(time){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            if(time<500){
                resolve(time)
            }else{
                reject(time)
            }
        },time)
    })
}

Gen(Math.random() * 1000)
.then(val=>console.log('resolve',val))
.catche(val=>console.log('resolve',val))
.finally(()=>{console.log('finished')})
```

## Object.rest.spread  
```js
//浅拷贝
const input={
    a:1,b:2
}
const outinput={
    ...input,
    a:3
}
console.log(input,output)
//-------------------------------
const input={
    a:1,
    b:2,
    c:3,
    d:4,
    d:5
}

const {a,b,...rest} = input
```

