// class User {
//   constructor(name: string, age: number) {
//     this.name = name; // js允许 ts 不允许
//     this.age = age;
//   }
// }

// class User {
//   name: string;
//   age: number;//strictPropertyInitialization
//   constructor(name: string, age: number) {
//     this.name = name; // js允许 ts 不允许
//     //   this.age = age;
//   }
// }
type gender = "男" | "女";
class User {
  readonly id: number;
  name: string;
  gender: gender = "男"; //默认值1
  //   pid: string | undefined; 等价于
  pid?: string;
  constructor(
    name: string,
    private _age: number,
    pid: string,
    gender: gender = "男"
  ) {
    this.id = Math.random();
    //默认值2
    this.name = name; // js允许 ts 不允许
    this.gender = gender;
    this.pid = pid;
  }
  set age(val) {
    if (val < 0) {
      this._age = 0;
    } else if (val > 100) {
      this._age = 100;
    } else {
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
