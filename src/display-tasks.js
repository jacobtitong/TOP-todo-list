import { default as createDOM } from "./createDOM.js";
import { default as mainContentElements } from "./main-content.js";
import { globalScopeTasks } from "./library.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const DOMTaskList = mainContentElements.taskList;
const TaskList = globalScopeTasks.library;

// CREATING ELEMENTS
TaskList.forEach((task) => {
  const checkbox = createDOM("input", { id: task.id, type: "checkbox" });
  const checkboxLabel = createDOM(
    "label",
    {
      class: "checkbox-label",
      for: task.id,
    },
    checkbox,
  );
  const projectLabelSpan = createDOM("span", {}, task.category);
  const DOMHashSVG = createDOM(hashSVG, { class: "hash-icon" });
  const projectLabel = createDOM(
    "div",
    {
      class: "project-label",
    },
    projectLabelSpan,
    DOMHashSVG,
  );
  const title = createDOM(
    "p",
    {
      class: "title",
    },
    task.title,
  );
  const description = createDOM(
    "p",
    {
      class: "description",
    },
    task.description,
  );
  const DOMCalendarSVG = createDOM(calendarSVG, { class: "due-date-icon" });
  const dueDateSpan = createDOM("span", {}, task.dueDate);

  const dueDate = createDOM(
    "div",
    { class: "dueDate" },
    DOMCalendarSVG,
    dueDateSpan,
  );
  const taskDetails = createDOM(
    "div",
    { class: "task-details" },
    title,
    description,
    dueDate,
  );
  const DOMTask = createDOM(
    "div",
    { class: "task" },
    checkboxLabel,
    taskDetails,
    projectLabel,
  );

  // DISPLAYING ELEMENTS (appending only direct children)
  DOMTaskList.appendChild(DOMTask);
});
