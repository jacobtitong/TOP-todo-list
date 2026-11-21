import "./main-content.css";
import { default as createDOM } from "./createDOM.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";
import { default as categoryManager } from "./category-manager.js";

const mainContentContainer = document.querySelector("main.content");

const renderMainContent = (() => {
  const allCategories = categoryManager.showAllCategories();
  const inboxCategory = allCategories[0];

  // CREATING ELEMENTS
  const projectName = createDOM(
    "h1",
    {
      class: "project-name",
      "data-id": inboxCategory.id,
    },
    "Inbox",
  );

  const taskList = createDOM("div", { class: "task-list" });

  // DISPLAYING ELEMENTS (appending only direct children)
  mainContentContainer.appendChild(projectName);

  mainContentContainer.appendChild(taskList);

  return { projectName, taskList };
})();

export default renderMainContent;
