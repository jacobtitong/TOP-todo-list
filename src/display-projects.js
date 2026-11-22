import { default as createDOM } from "./createDOM.js";
import hashSVG from "./assets/icons/hash.svg";
import { default as categoryManager } from "./category-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";

const displayProjects = (projects, refresh) => {
  if (refresh) projects.querySelector(".projects-list").remove();

  // All Categories
  const allCategories = categoryManager.showAllCategories();
  const inboxCategory = allCategories[0];
  const projectItem = [];

  const createdCategories = allCategories.filter(
    (category) => category !== inboxCategory,
  );

  createdCategories.forEach((category) => {
    const item = [];

    const DOMHashSVG = createDOM(hashSVG, { class: "hash-icon" });

    DOMHashSVG.querySelector("path").setAttribute("stroke", category.color);

    const projectNameSpan = createDOM("span", {}, category.name);

    const projectName = createDOM(
      "span",
      { class: "project-name" },
      DOMHashSVG,
      projectNameSpan,
    );

    const count = createDOM("span", { class: "count" }, `${category.count}`);

    const projectTabDiv = createDOM("div", {}, projectName, count);
    const projectTab = createDOM(
      "div",
      { class: "project-tab", "data-id": category.id },
      projectTabDiv,
    );

    item.push(projectTab);
    item.push(projectTabDiv);
    item.push(projectName);
    item.push(projectNameSpan);
    item.push(count);

    projectItem.push(item);
  });

  // Append every projectTab to the projectsList as direct children.
  const projectsList = createDOM(
    "div",
    { class: "projects-list" },
    ...projectItem.map((p) => p[0]),
  );

  projects.appendChild(projectsList);

  listenForChosenCategories(projects, createdCategories);
};

const listenForChosenCategories = (projects, createdCategories) => {
  const allProjectTabs = projects.querySelectorAll(".project-tab");

  const switchCategory = (e) => {
    if (
      e.currentTarget.dataset.id === mainContentElements.projectName.dataset.id
    )
      return;
    const chosenCategory = createdCategories.filter(
      (category) => category.id === e.currentTarget.dataset.id,
    )[0];
    mainContentElements.taskList.textContent = "";
    mainContentElements.projectName.setAttribute("data-id", chosenCategory.id);
    mainContentElements.projectName.textContent = chosenCategory.name;
    displayTasks();
  };

  allProjectTabs.forEach((project) => {
    project.removeEventListener("click", (e) => switchCategory(e));
    project.addEventListener("click", (e) => switchCategory(e));
  });
};

export default displayProjects;
