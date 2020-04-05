# Iteritor
让不支持遍历的对象可遍历
##ES5
```js

let authors={
    allAuthors:{
        fiction:['A','B','C','D'],
        scienceFiction:['N','S','E'],
        fantasy:['ASDF','ASDF','FDVS']
    },
    Address:[]
}
let r=[]
for(let |k,v| of Object.entries(authors.allAuthors)){
    r=r.concat(r) 
}
```

## ES6 

```js
let authors={
    allAuthors:{
        fiction:['A','B','C','D'],
        scienceFiction:['N','S','E'],
        fantasy:['ASDF','ASDF','FDVS']
    },
    Address:[]
}
authors[Symbol.iterator]=function(){
    let allAuthors=this.allAuthors
    let keys=Reflect.ownKeys(allAuthors)
    let values=[]
    return {
        next(){
            if(!values.length){
                if(keys.length){
                    values=allAuthors[keys[0]]
                    keys.shift()
                }
            }
            return{
                done:!values.length,
                value:values.shift()
            }
        }
    }
}
let r=[]
for(let v of authors){
    r=r.push(V) 
}




authors[Symbol.iterator]= function * (){
    let allAuthors=this.allAuthors
    let keys=Reflect.ownKeys(allAuthors)
    let values=[]
    while(1){
        if(!values.length){
            if(keys.length){
                values=allAuthors[keys[0]]
                keys.shift()
                yield values.shift()
            }
        }else{
            yield values.shift()
        }
    }
}
```