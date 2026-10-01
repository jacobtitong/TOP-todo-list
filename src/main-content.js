import "./main-content.css";
import { default as createDOM } from "./createDOM.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const renderMainContent = () => {
  const mainContentContainer = document.querySelector("main.content");

  // CREATING ELEMENTS
  const projectName = createDOM(
    "h1",
    {
      class: "project-name",
    },
    "Inbox",
  );

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
  const projectLabel = createDOM(
    "div",
    {
      class: "project-label",
    },
    projectLabelSpan,
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
  const dueDateSpan = createDOM("span", {}, "Today");
  const dueDate = createDOM("div", { class: "dueDate" }, dueDateSpan);
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
  const taskList = createDOM("div", { class: "task-list" }, task);

  // DISPLAYING ELEMENTS (appending only direct children)
  mainContentContainer.appendChild(projectName);

  mainContentContainer.appendChild(taskList);

  /* SVGs */

  // Due Date SVG
  const dueDateContainer = document.querySelector(".task-details .dueDate");
  const DOMCalendarSVG = createDOM(calendarSVG, { class: "due-date-icon" });

  dueDateContainer.insertBefore(DOMCalendarSVG, dueDateContainer.firstChild);

  //  Hash SVG
  const projectLabelContainer = document.querySelector(".project-label");
  const DOMHashSVG = createDOM(hashSVG, { class: "hash-icon" });

  projectLabelContainer.appendChild(DOMHashSVG);
};

export default renderMainContent;
