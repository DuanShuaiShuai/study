// 属性装饰器也是一个函数 该函数需要两个参数
// 1.如果是静态属性 target则为类本身 如果是实例属性 target则为类的原型
// 2.固定为一个字符串 表示属性名
// function d(target: any, key: string) {
//   console.log(target);
//   if (!target.__props) {
//     target.__props = [];
//   }
//   target.__props.push(key);
// }

// class A {
//   @d
//   static prop1: string = "4";
//   @d
//   prop2: string;
//   constructor() {
//     this.prop2 = "2";
//   }
// }

// console.log((A.prototype as any).__props);
// console.log((A as any).__props);

// 方法
// 1. 如果是静态方法 则为类本身 如果是实例方法 则为类的原型
// 2. 固定为一个字符串，表示方法名
// 3. 描述符对象

function enumerable() {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    console.log(target, key, descriptor);
    descriptor.enumerable = true;
  };
}

function useless(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.value = function () {
    console.warn(key + "方法名已过期");
  };
}

class A {
  constructor(public a: string) {}
  @enumerable()
  method1() {}

  @useless
  @enumerable()
  method2() {}
}
const a = new A("ss");
for (const key in a) {
  //   if (Object.prototype.hasOwnProperty.call(a, key)) {
  console.log(key);
  //   }
}
a.method2();
