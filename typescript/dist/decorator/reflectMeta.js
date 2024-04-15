"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printObj = exports.descriptor = void 0;
require("reflect-metadata");
const key = Symbol.for("descriptor");
function descriptor(description) {
    return Reflect.metadata(key, description);
}
exports.descriptor = descriptor;
function printObj(obj) {
    const cons = Object.getPrototypeOf(obj);
    if (Reflect.hasMetadata(key, cons)) {
        console.log(Reflect.getMetadata(key, cons));
    }
    else {
        console.log(cons.constructor.name);
    }
    for (const k in obj) {
        if (Reflect.hasMetadata(key, obj, k)) {
            console.log(`\t${Reflect.getMetadata(key, obj, k)}:${obj[k]}`);
        }
        else {
            console.log(`\t${k}:${obj[k]}`);
        }
    }
}
exports.printObj = printObj;
let Article = class Article {
    constructor() {
        this.title = "";
        this.content = "";
        this.date = new Date();
    }
};
__decorate([
    descriptor("标题")
], Article.prototype, "title", void 0);
__decorate([
    descriptor("内容")
], Article.prototype, "content", void 0);
__decorate([
    descriptor("日期")
], Article.prototype, "date", void 0);
Article = __decorate([
    descriptor("文章")
], Article);
const ar = new Article();
ar.title = "xxxx";
ar.content = "asdfasdfasdfasdfasdf";
ar.date = new Date();
printObj(ar);
