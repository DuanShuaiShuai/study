
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