import "reflect-metadata";
export declare function descriptor(description: string): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare function printObj(obj: any): void;
