import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
export class Movie {
  @IsNotEmpty({ message: "电影名称不可以为空" })
  @Type(() => String)
  public name: string;
  @ArrayMinSize(1, { message: "电影类型不可以为空" })
  @IsNotEmpty({ message: "电影类型至少有一个" })
  @Type(() => String)
  @IsArray({ message: "电影类型必须为数组" })
  public types: string[];

  @IsNotEmpty({ message: "上映地区不可以为空" })
  @ArrayMinSize(1, { message: "上映地区至少有一个" })
  @Type(() => String)
  @IsArray({ message: "上映地区必须为数组" })
  public areas: string[];

  @IsNotEmpty({ message: "时常不可以为空" })
  @IsInt({ message: "时长必须为整数" })
  @Min(1, { message: "时长最小1分钟" })
  @Max(999999, { message: "时长最大为999999分钟" })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message: "是否热映不可以为空" })
  @Type(() => Boolean)
  public isHot: boolean;

  @IsNotEmpty({ message: "是否是经典影片不可以为空" })
  @Type(() => Boolean)
  public isClassic: boolean;

  @Type(() => String)
  public description?: string;

  @Type(() => String)
  public poster?: string;
}
