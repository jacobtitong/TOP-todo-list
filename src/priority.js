import createDOM from "./createDOM.js";
import flagTriangleRightSVG from "./assets/icons/flag-triangle-right.svg";

const prioritySelect = document.querySelector(".priority-select");
const priority1 = prioritySelect.querySelector(".priority-1");
const priority2 = prioritySelect.querySelector(".priority-2");
const priority3 = prioritySelect.querySelector(".priority-3");
const priority4 = prioritySelect.querySelector(".priority-4");

const priority1Flag = createDOM(flagTriangleRightSVG, {
  class: "flag-icon priority-1",
});
const priority2Flag = createDOM(flagTriangleRightSVG, {
  class: "flag-icon priority-2",
});
const priority3Flag = createDOM(flagTriangleRightSVG, {
  class: "flag-icon priority-3",
});
const priority4Flag = createDOM(flagTriangleRightSVG, {
  class: "flag-icon priority-4",
});

priority1.insertBefore(priority1Flag, priority1.firstChild);
priority2.insertBefore(priority2Flag, priority2.firstChild);
priority3.insertBefore(priority3Flag, priority3.firstChild);
priority4.insertBefore(priority4Flag, priority4.firstChild);
