import "reflect-metadata";
import { validate } from "class-validator";
import { Movie } from "./entities/Movie";
import { plainToClass } from "class-transformer";

const m: any = {};
m.name = 121;
// m.types = ["喜剧"];
m.types = [2, 3, 4, 5];
m.areas = ["中国"];
m.timeLong = 2;
m.isHot = false;
m.isClassic = false;
// 将plain Object平面对象转换为Movie对象

const movie = plainToClass(Movie, m);
console.log(movie);
validate(movie).then((errors) => {
  console.log(errors);
});
