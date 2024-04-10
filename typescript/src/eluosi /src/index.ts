import { Square } from "./core/Square";
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { IViewer, MoveDirection } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
const teris = createTeris({ x: 3, y: 2 });
teris.squares.forEach((sq) => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
});

$("#btnDown").on("click", () => {
  TerisRule.moveDirectly(teris, MoveDirection.down);
});

$("#btnUp").on("click", () => {
  TerisRule.move(teris, { x: 2, y: 1 });
});

$("#btnLeft").on("click", () => {
  TerisRule.moveDirectly(teris, MoveDirection.left);
});

$("#btnRight").on("click", () => {
  TerisRule.moveDirectly(teris, MoveDirection.right);
});
