"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printObj = exports.propDescriptor = exports.classDescriptor = void 0;
function classDescriptor(description) {
    return function (target) {
        target.prototype.$classDescription = description;
    };
}
exports.classDescriptor = classDescriptor;
function propDescriptor(description) {
    return function (target, propName) {
        if (!target.$propDescriptions) {
            target.$propDescriptions = [];
        }
        target.$propDescriptions.push({
            propName,
            description,
        });
    };
}
exports.propDescriptor = propDescriptor;
function printObj(obj) {
    if (obj.$classDescription) {
        console.log(obj.$classDescription);
    }
    else {
        console.log(Object.getPrototypeOf(obj).constructor.name);
    }
    if (!obj.$propDescriptions) {
        obj.$propDescriptions = [];
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const prop = obj.$propDescriptions.find((p) => p.propName === key);
            if (prop) {
                console.log(`\t${prop.description}:${obj[key]}`);
            }
            else {
                console.log(`\t${key}:${obj[key]}`);
            }
        }
    }
}
exports.printObj = printObj;
let User = class User {
    constructor() {
        this.id = "1";
        this.name = "xxxx";
    }
};
__decorate([
    propDescriptor("唯一id")
], User.prototype, "id", void 0);
__decorate([
    propDescriptor("姓名")
], User.prototype, "name", void 0);
User = __decorate([
    classDescriptor("用户")
], User);
const u = new User();
printObj(u);
