"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function enumerable() {
    return (target, key, descriptor) => {
        console.log(target, key, descriptor);
        descriptor.enumerable = true;
    };
}
function useless(target, key, descriptor) {
    descriptor.value = function () {
        console.warn(key + "方法名已过期");
    };
}
class A {
    constructor(a) {
        this.a = a;
    }
    method1() { }
    method2() { }
}
__decorate([
    enumerable()
], A.prototype, "method1", null);
__decorate([
    useless,
    enumerable()
], A.prototype, "method2", null);
const a = new A("ss");
for (const key in a) {
    console.log(key);
}
a.method2();
