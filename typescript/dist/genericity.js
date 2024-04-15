"use strict";
function take(arr, n) {
    if (n > arr.length) {
        return arr;
    }
    const newArr = [];
    for (let i = 0; i < n; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
const newArr = take([1, 2], 2);
function filter(arr, callback) {
    const newArr = [];
    arr.forEach((o, i) => {
        if (callback(o, i)) {
            newArr.push(o);
        }
    });
    return newArr;
}
const arr = filter([1, 2, 3, 4, 5, 6], (o, i) => o % 2 === 0);
class ArrayHelper {
    constructor(arr) {
        this.arr = arr;
    }
    getRandom(min, max) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }
    take(n) {
        if (n > this.arr.length) {
            return arr;
        }
        const newArr = [];
        for (let i = 0; i < n; i++) {
            newArr.push(arr[i]);
        }
        return newArr;
    }
    shuffle(arr) {
        this.arr.forEach((o, i) => {
            let targetIndex = this.getRandom(0, this.arr.length);
            let tem = this.arr[i];
            this.arr[i] = this.arr[targetIndex];
            this.arr[targetIndex] = tem;
        });
    }
}
function nameToUpperCase(obj) {
    obj.name = obj.name
        .split(" ")
        .map((o) => o[0].toUpperCase() + o.substr(1))
        .join(" ");
    return obj;
}
const o = {
    name: "duan shuai",
    t: "sss",
};
const newObj = nameToUpperCase(o);
console.log(newObj);
function mixArray(a, b) {
    if (a.length !== b.length) {
        throw new Error("长度不相等");
    }
    let result = [];
    arr.forEach((o, i) => {
        result.push(a[i]);
        result.push(b[i]);
    });
    return result;
}
console.log(mixArray([1, 2, 3, 4], ["a", "b", "c", "d"]));
