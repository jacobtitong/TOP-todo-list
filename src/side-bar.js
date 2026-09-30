import { default as createDOM } from "./createDOM.js";
import inboxSVG from "./assets/icons/inbox.svg";
import avatarWrapperSVG from "./assets/icons/avatar-wrapper.svg";
import chevronDownSVG from "./assets/icons/chevron-down.svg";
import plusCircleSVG from "./assets/icons/plus-circle.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";
import hashSVG from "./assets/icons/hash.svg";

// Avatar Wrapper SVG
const profileContainer = document.querySelector(".profile");
const DOMAvatarWrapperSVG = createDOM(avatarWrapperSVG);

DOMAvatarWrapperSVG.classList.add("avatar-wrapper-icon");
profileContainer.insertBefore(DOMAvatarWrapperSVG, profileContainer.firstChild);

// Chevron Down SVG
const DOMChevronDownSVG = createDOM(chevronDownSVG);

DOMChevronDownSVG.classList.add("chevron-down-icon");
profileContainer.appendChild(DOMChevronDownSVG);

// Side Bar SVG
const topContainer = document.querySelector(".side-bar .top");
const DOMSideBarSVG1 = createDOM(sideBarSVG);

DOMSideBarSVG1.classList.add("side-bar-icon");
topContainer.appendChild(DOMSideBarSVG1);

// Plus Circle SVG - Add Task Button
const addTaskButton = document.querySelector(".add-task button");
const DOMPlusCircleSVG = createDOM(plusCircleSVG);

DOMPlusCircleSVG.classList.add("plus-circle-icon");
addTaskButton.insertBefore(DOMPlusCircleSVG, addTaskButton.firstChild);

// Inbox SVG
const inboxContainer = document.querySelector(".inbox");
const DOMInboxSVG = createDOM(inboxSVG);

inboxContainer.insertBefore(DOMInboxSVG, inboxContainer.firstChild);

// Plus Circle SVG - Projects Tab
const projectsTopContainer = document.querySelector(".side-bar .projects .top");
const DOMPlusCircleSVG2 = createDOM(plusCircleSVG);

DOMPlusCircleSVG2.classList.add("plus-circle-icon");
projectsTopContainer.appendChild(DOMPlusCircleSVG2);

// Hash SVG
const projectContainer = document.querySelectorAll(
  ".projects-list .project-tab .project-name",
);

projectContainer.forEach((container) => {
  const DOMHashSVG = createDOM(hashSVG);

  DOMHashSVG.classList.add("hash-icon");
  container.insertBefore(DOMHashSVG, container.firstChild);
});
