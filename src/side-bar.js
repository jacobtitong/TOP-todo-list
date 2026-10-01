import "./side-bar.css";
import { default as createDOM } from "./createDOM.js";
import inboxSVG from "./assets/icons/inbox.svg";
import avatarWrapperSVG from "./assets/icons/avatar-wrapper.svg";
import chevronDownSVG from "./assets/icons/chevron-down.svg";
import plusCircleSVG from "./assets/icons/plus-circle.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";
import hashSVG from "./assets/icons/hash.svg";

const renderSideBar = () => {
  const sideBarContainer = document.querySelector(".side-bar");

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
  const inboxSpan = createDOM("span", {}, "Inbox");
  const inbox = createDOM("span", { class: "inbox" }, inboxSpan);
  const count = createDOM("span", { class: "count" }, "22");
  const projectTabDiv = createDOM("div", {}, inbox, count);
  const projectTab = createDOM("div", { class: "project-tab" }, projectTabDiv);

  // Divider
  const hr = createDOM("hr", {});

  // Projects Section
  const top2Span = createDOM("span", {}, "My Projects");
  const actions = createDOM("div", { class: "actions" });
  const top2 = createDOM("div", { class: "top" }, top2Span, actions);

  const projectItem = [];

  for (let i = 0; i < 4; i++) {
    const item = [];

    const projectNameSpan = createDOM("span", {}, "Personal");
    const projectName = createDOM(
      "span",
      { class: "project-name" },
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
  }

  // Append every projectTab to the projectsList as direct children.
  const projectsList = createDOM(
    "div",
    { class: "projects-list" },
    ...projectItem.map((p) => p[0]),
  );

  const projects = createDOM("div", { class: "projects" }, top2, projectsList);

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

  // Hash SVG
  const projectContainer = document.querySelectorAll(
    ".projects-list .project-tab .project-name",
  );

  projectContainer.forEach((container) => {
    const DOMHashSVG = createDOM(hashSVG, { class: "hash-icon" });

    container.insertBefore(DOMHashSVG, container.firstChild);
  });

  return { sideBarContainer, topContainer, DOMSideBarSVG };
};

export default renderSideBar;
