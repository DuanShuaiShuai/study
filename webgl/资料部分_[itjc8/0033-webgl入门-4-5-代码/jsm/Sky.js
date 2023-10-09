export default class Sky{
  constructor(gl){
    this.gl=gl
    this.children=[]
  }
  add(obj){
    obj.gl=this.gl
    obj.init()
    this.children.push(obj)
  }
  draw(){
    this.children.forEach(ele=>{
      ele.init()
      ele.draw()
    })
  }
}