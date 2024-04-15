import "reflect-metadata";
const key = Symbol.for("descriptor");

export function descriptor(description: string) {
  return Reflect.metadata(key, description);
}

export function printObj(obj: any) {
  const cons = Object.getPrototypeOf(obj);

  // 输出类的名字
  if (Reflect.hasMetadata(key, cons)) {
    console.log(Reflect.getMetadata(key, cons));
  } else {
    console.log(cons.constructor.name);
  }

  //输出所有属性的描述和属性值
  for (const k in obj) {
    if (Reflect.hasMetadata(key, obj, k)) {
      console.log(`\t${Reflect.getMetadata(key, obj, k)}:${obj[k]}`);
    } else {
      console.log(`\t${k}:${obj[k]}`);
    }
  }
}

@descriptor("文章")
class Article {
  @descriptor("标题")
  title: string;

  @descriptor("内容")
  content: string;

  @descriptor("日期")
  date: Date;

  constructor() {
    this.title = "";
    this.content = "";
    this.date = new Date();
  }
}

const ar = new Article();
ar.title = "xxxx";
ar.content = "asdfasdfasdfasdfasdf";
ar.date = new Date();

printObj(ar);
