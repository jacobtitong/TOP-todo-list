import "./main-content.css";
import { default as createDOM } from "./createDOM.js";
import { default as turnToDOM } from "./turnToDOM.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const renderMainContent = () => {
  const mainContentContainer = document.querySelector("main.content");

  // CREATING ELEMENTS
  const projectName = createDOM({
    element: "h1",
    classList: "project-name",
    textContent: "Inbox",
  });
  const taskList = createDOM({ element: "div", classList: "task-list" });
  const task = createDOM({ element: "div", classList: "task" });
  const checkboxLabel = createDOM({
    element: "label",
    classList: "checkbox-label",
  });
  checkboxLabel.setAttribute("for", "checkbox1");
  const checkbox = createDOM({ element: "input" });
  checkbox.setAttribute("id", "checkbox1");
  checkbox.setAttribute("type", "checkbox");
  const taskDetails = createDOM({ element: "div", classList: "task-details" });
  const title = createDOM({
    element: "p",
    classList: "title",
    textContent: "Title",
  });
  const description = createDOM({
    element: "p",
    classList: "description",
    textContent: "Description",
  });
  const dueDate = createDOM({ element: "div", classList: "dueDate" });
  const dueDateSpan = createDOM({ element: "span", textContent: "Today" });
  const projectLabel = createDOM({
    element: "div",
    classList: "project-label",
  });
  const projectLabelSpan = createDOM({ element: "span", textContent: "Inbox" });

  // DISPLAYING ELEMENTS
  mainContentContainer.appendChild(projectName);

  mainContentContainer.appendChild(taskList);
  taskList.appendChild(task);
  task.appendChild(checkboxLabel);
  checkboxLabel.appendChild(checkbox);
  task.appendChild(taskDetails);
  taskDetails.appendChild(title);
  taskDetails.appendChild(description);
  taskDetails.appendChild(dueDate);
  dueDate.appendChild(dueDateSpan);
  task.appendChild(projectLabel);
  projectLabel.appendChild(projectLabelSpan);

  /* SVGs */

  // Due Date SVG
  const dueDateContainer = document.querySelector(".task-details .dueDate");
  const DOMCalendarSVG = turnToDOM(calendarSVG);

  DOMCalendarSVG.classList.add("due-date-icon");
  dueDateContainer.insertBefore(DOMCalendarSVG, dueDateContainer.firstChild);

  //  Hash SVG
  const projectLabelContainer = document.querySelector(".project-label");
  const DOMHashSVG = turnToDOM(hashSVG);

  DOMHashSVG.classList.add("hash-icon");
  projectLabelContainer.appendChild(DOMHashSVG);
};

export default renderMainContent;
