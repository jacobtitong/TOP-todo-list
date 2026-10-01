import "./main-content.css";
import { default as createDOM } from "./createDOM.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const mainContentContainer = document.querySelector("main.content");

const renderMainContent = () => {
  // CREATING ELEMENTS
  const projectName = createDOM(
    "h1",
    {
      class: "project-name",
    },
    "Inbox",
  );

  const taskList = createDOM("div", { class: "task-list" });

  // DISPLAYING ELEMENTS (appending only direct children)
  mainContentContainer.appendChild(projectName);

  mainContentContainer.appendChild(taskList);

  return { projectName, taskList };
};

export default renderMainContent();
