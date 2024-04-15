declare function enumerable(): (target: any, key: string, descriptor: PropertyDescriptor) => void;
declare function useless(target: any, key: string, descriptor: PropertyDescriptor): void;
declare class A {
    a: string;
    constructor(a: string);
    method1(): void;
    method2(): void;
}
declare const a: A;
