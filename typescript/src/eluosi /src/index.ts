import { Square } from "./core/Square";
import { IViewer } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
const sq = new Square({ x: 0, y: 0 }, "#fff");
sq.viewer = new SquarePageViewer(sq, $("#root"));
sq.point = {
  x: 3,
  y: 0,
};

$("#btnDown").on("click", () => {
  sq.point = {
    x: sq.point.x,
    y: sq.point.y + 1,
  };
});

$("#btnRemove").on("click", () => {
  sq.viewer?.remove();
});

$("#btnAdd").on("click", () => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
});
