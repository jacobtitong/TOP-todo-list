import { default as createDOM } from "./createDOM.js";
import hashSVG from "./assets/icons/hash.svg";
import { default as categoryManager } from "./category-manager.js";

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

    const count = createDOM("span", { class: "count" }, "5");

    const projectTabDiv = createDOM("div", {}, projectName, count);
    const projectTab = createDOM(
      "div",
      { class: "project-tab" },
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
};

export default displayProjects;
