import "./side-bar.css";
import { default as createDOM } from "./createDOM.js";
import inboxSVG from "./assets/icons/inbox.svg";
import avatarWrapperSVG from "./assets/icons/avatar-wrapper.svg";
import chevronDownSVG from "./assets/icons/chevron-down.svg";
import plusCircleSVG from "./assets/icons/plus-circle.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";
import { default as categoryManager } from "./category-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";
import { default as displayCategories } from "./display-projects.js";

const renderSideBar = () => {
  const sideBarContainer = document.querySelector(".side-bar");

  // All Categories
  const allCategories = categoryManager.showAllCategories();
  const inboxCategory = allCategories[0];

  // CREATING SIDE BAR ELEMENTS (Built bottom-up to pass children):
  // Profile Section
  const profileName = createDOM("span", { class: "profile-name" }, "username");
  const profile = createDOM("div", { class: "profile" }, profileName);
  const top1 = createDOM("div", { class: "top" }, profile);

  // Add Task Section
  const addTaskButtonSpan = createDOM("span", {}, "Add Task");
  const addTaskButton = createDOM("button", {}, addTaskButtonSpan);
  const addTask = createDOM("div", { class: "add-task" }, addTaskButton);

  // Project Tab (Inbox) Section
  const inboxSpan = createDOM("span", {}, inboxCategory.name);
  const inbox = createDOM("span", { class: "inbox" }, inboxSpan);
  const count = createDOM("span", { class: "count" }, "22");
  const projectTabDiv = createDOM("div", {}, inbox, count);
  const projectTab = createDOM(
    "div",
    { class: "project-tab", "data-id": inboxCategory.id },
    projectTabDiv,
  );

  // Divider
  const hr = createDOM("hr", {});

  // Projects Section
  const top2Span = createDOM("span", {}, "My Projects");
  const actions = createDOM("div", { class: "actions" });
  const top2 = createDOM("div", { class: "top" }, top2Span, actions);

  const projects = createDOM("div", { class: "projects" }, top2);

  displayCategories(projects, false);

  // DISPLAYING SIDEBAR ELEMENTS (Appending only direct children):
  sideBarContainer.appendChild(top1);
  sideBarContainer.appendChild(addTask);
  sideBarContainer.appendChild(projectTab);
  sideBarContainer.appendChild(hr);
  sideBarContainer.appendChild(projects);

  /* SVG's */

  // Avatar Wrapper SVG
  const profileContainer = document.querySelector(".profile");
  const DOMAvatarWrapperSVG = createDOM(avatarWrapperSVG, {
    class: "avatar-wrapper-icon",
  });

  profileContainer.insertBefore(
    DOMAvatarWrapperSVG,
    profileContainer.firstChild,
  );

  // Chevron Down SVG
  const DOMChevronDownSVG = createDOM(chevronDownSVG, {
    class: "chevron-down-icon",
  });

  profileContainer.appendChild(DOMChevronDownSVG);

  // Side Bar SVG
  const topContainer = document.querySelector(".side-bar .top");
  const DOMSideBarSVG = createDOM(sideBarSVG, { class: "side-bar-icon" });

  // Plus Circle SVG - Add Task Button
  const addTaskButtonContainer = document.querySelector(".add-task button");
  const DOMPlusCircleSVG = createDOM(plusCircleSVG, {
    class: "plus-circle-icon",
  });

  addTaskButtonContainer.insertBefore(
    DOMPlusCircleSVG,
    addTaskButtonContainer.firstChild,
  );

  // Inbox SVG
  const inboxContainer = document.querySelector(".inbox");
  const DOMInboxSVG = createDOM(inboxSVG, {});

  inboxContainer.insertBefore(DOMInboxSVG, inboxContainer.firstChild);

  // Plus Circle SVG - Projects Tab
  const projectsTopActionsContainer = document.querySelector(
    ".side-bar .projects .top .actions",
  );
  const DOMPlusCircleSVG2 = createDOM(plusCircleSVG, {
    class: "plus-circle-icon",
  });

  projectsTopActionsContainer.appendChild(DOMPlusCircleSVG2);

  listenForInboxCategory(sideBarContainer, inboxCategory);

  return { sideBarContainer, topContainer, projects, DOMSideBarSVG };
};

const listenForInboxCategory = (sideBarContainer, inboxCategory) => {
  const inboxTab = sideBarContainer.querySelector(".project-tab");

  const switchCategory = (e) => {
    if (
      e.currentTarget.dataset.id === mainContentElements.projectName.dataset.id
    )
      return;
    mainContentElements.taskList.textContent = "";
    mainContentElements.projectName.setAttribute("data-id", inboxCategory.id);
    mainContentElements.projectName.textContent = inboxCategory.name;
    displayTasks();
  };

  inboxTab.removeEventListener("click", (e) => switchCategory(e));
  inboxTab.addEventListener("click", (e) => switchCategory(e));
};

export default renderSideBar;
