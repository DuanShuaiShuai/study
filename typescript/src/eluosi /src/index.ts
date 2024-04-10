import { Square } from "./core/square";
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
    x: 3,
    y: sq.point.y + 1,
  };
});

$("#btnAdd").on("click", () => {
  sq.viewer = new SquarePageViewer(sq, $("#root"));
});
$("#btnRemove").on("click", () => {
  sq.viewer?.remove();
});
