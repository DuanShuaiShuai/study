type gender = "男" | "女";
declare class User {
    private _age;
    readonly id: number;
    name: string;
    gender: gender;
    pid?: string;
    constructor(name: string, _age: number, pid: string, gender?: gender);
    set age(val: number);
    get age(): number;
}
declare const u: User;
