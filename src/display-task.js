import { default as createDOM } from "./createDOM.js";
import { default as mainContentElements } from "./main-content.js";
import { globalScopeTasks } from "./library.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const taskList = mainContentElements.taskList;

// CREATING ELEMENTS
function createTask() {
  const checkbox = createDOM("input", { id: "checkbox1", type: "checkbox" });
  const checkboxLabel = createDOM(
    "label",
    {
      class: "checkbox-label",
      for: "checkbox1",
    },
    checkbox,
  );
  const projectLabelSpan = createDOM("span", {}, "Inbox");
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
    "Title",
  );
  const description = createDOM(
    "p",
    {
      class: "description",
    },
    "Description",
  );
  const DOMCalendarSVG = createDOM(calendarSVG, { class: "due-date-icon" });
  const dueDateSpan = createDOM("span", {}, "Today");

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
  const task = createDOM(
    "div",
    { class: "task" },
    checkboxLabel,
    taskDetails,
    projectLabel,
  );

  // DISPLAYING ELEMENTS (appending only direct children)
  taskList.appendChild(task);
}

createTask();
createTask();
createTask();
