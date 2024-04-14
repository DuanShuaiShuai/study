// 1.装饰器 experimentalDecorators:true
// function d1(target: new () => object) {
//   console.log(target);
// }
// @d1
// class A {}

// console.log(A);
// 2.重写
// function d1(target: new () => object) {
//   console.log(target);
//   return class B {};
// }
// @d1
// class A {}

// console.log(A);

// 3. 参数
// function d1(name: string) {
//   console.log(name);
//   return (target: new () => object) => {
//     console.log(target);
//     return A;
//   };
// }

// @d1("测试一个类")
// class A {}
// console.log(A);

// 4. 多个装饰器执行顺序
// function d1(name: string) {
//   console.log("d1");
//   return (target: new () => object) => {
//     console.log("d1 decorator");
//   };
// }
// function d2(name: string) {
//   console.log("d2");
//   return (target: new () => object) => {
//     console.log("d2 decorator");
//   };
// }

// @d1("测试一个类")
// @d2("测试一个类")
// class A {}
