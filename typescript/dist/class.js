"use strict";
class User {
    constructor(name, _age, pid, gender = "男") {
        this._age = _age;
        this.gender = "男";
        this.id = Math.random();
        this.name = name;
        this.gender = gender;
        this.pid = pid;
    }
    set age(val) {
        if (val < 0) {
            this._age = 0;
        }
        else if (val > 100) {
            this._age = 100;
        }
        else {
            this._age = val;
        }
        this._age = val;
    }
    get age() {
        return this._age;
    }
}
const u = new User("aa", 2, "sssss");
console.log(u.age);
u.age = 99;
console.log(u.age);
