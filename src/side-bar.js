import { default as turnToDOM } from "./turnToDOM.js";
import { default as createDOM } from "./createDOM.js";
import inboxSVG from "./assets/icons/inbox.svg";
import avatarWrapperSVG from "./assets/icons/avatar-wrapper.svg";
import chevronDownSVG from "./assets/icons/chevron-down.svg";
import plusCircleSVG from "./assets/icons/plus-circle.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";
import hashSVG from "./assets/icons/hash.svg";

const sideBarContainer = document.querySelector(".side-bar");
/* 
    <div class="top">
        <div class="profile">
          <span class="profile-name">username</span>
        </div>
      </div>
      <div class="add-task">
        <button>
          <span>Add task</span>
        </button>
      </div>
      <div class="project-tab">
        <div>
          <span class="inbox"><span>Inbox</span></span>
          <span class="count">22</span>
        </div>
      </div>
      <hr />
      <div class="projects">
        <div class="top">
          <span>My Projects</span>
          <div class="actions"></div>
        </div>
        <div class="projects-list">
          <div class="project-tab">
            <div>
              <span class="project-name"><span>Personal</span></span>
              <span class="count">5</span>
            </div>
          </div>
          <div class="project-tab">
            <div>
              <span class="project-name"><span>Personal</span></span>
              <span class="count">5</span>
            </div>
          </div>
          <div class="project-tab">
            <div>
              <span class="project-name"><span>Personal</span></span>
              <span class="count">5</span>
            </div>
          </div>
          <div class="project-tab">
            <div>
              <span class="project-name"><span>Personal</span></span>
              <span class="count">5</span>
            </div>
          </div>
        </div>
      </div>
*/

// CREATING SIDE BAR ELEMENTS:

const top1 = createDOM({ element: "div", classList: "top" });

const profile = createDOM({ element: "div", classList: "profile" });

const profileName = createDOM({
  element: "span",
  classList: "profile-name",
  textContent: "username",
});

const addTask = createDOM({ element: "div", classList: "add-task" });

const addTaskButton = createDOM({ element: "button" });

const addTaskButtonSpan = createDOM({
  element: "span",
  textContent: "Add Task",
});

const projectTab = createDOM({ element: "div", classList: "project-tab" });

const projectTabDiv = createDOM({ element: "div" });

const inbox = createDOM({ element: "span", classList: "inbox" });

const inboxSpan = createDOM({ element: "span" });

const count = createDOM({ element: "span", classList: "count" });

const hr = createDOM({ element: "hr" });

const projects = createDOM({ element: "div", classList: "projects" });

const top2 = createDOM({ element: "div", classList: "top" });

const top2Span = createDOM({ element: "span" });

const actions = createDOM({ element: "div", classList: "actions" });

const projectsList = createDOM({ element: "div", classList: "projects-list" });

const projectItem = [];

for (let i = 0; i < 4; i++) {
  const item = [];

  const projectTab = createDOM({ element: "div", classList: "project-tab" });
  const projectTabDiv = createDOM({ element: "div" });

  const projectName = createDOM({ element: "span", classList: "project-name" });
  const projectNameSpan = createDOM({ element: "span" });

  const count = createDOM({ element: "span", classList: "count" });

  item.push(projectTab);
  item.push(projectTabDiv);
  item.push(projectName);
  item.push(projectNameSpan);
  item.push(count);

  projectItem.push(item);
}

// DISPLAYING SIDEBAR ELEMENTS:
sideBarContainer.appendChild(top1);
top1.appendChild(profile);
profile.appendChild(profileName);

sideBarContainer.appendChild(addTask);
addTask.appendChild(addTaskButton);
addTaskButton.appendChild(addTaskButtonSpan);

sideBarContainer.appendChild(projectTab);
projectTab.appendChild(projectTabDiv);
projectTabDiv.appendChild(inbox);
inbox.appendChild(inboxSpan);
projectTabDiv.appendChild(count);

sideBarContainer.appendChild(hr);

sideBarContainer.appendChild(projects);
projects.appendChild(top2);
top2.appendChild(top2Span);
top2.appendChild(actions);
projects.appendChild(projectsList);

/* SVG's */

/*
// Avatar Wrapper SVG
const profileContainer = document.querySelector(".profile");
const DOMAvatarWrapperSVG = turnToDOM(avatarWrapperSVG);

DOMAvatarWrapperSVG.classList.add("avatar-wrapper-icon");
profileContainer.insertBefore(DOMAvatarWrapperSVG, profileContainer.firstChild);

// Chevron Down SVG
const DOMChevronDownSVG = turnToDOM(chevronDownSVG);

DOMChevronDownSVG.classList.add("chevron-down-icon");
profileContainer.appendChild(DOMChevronDownSVG);

// Side Bar SVG
const topContainer = document.querySelector(".side-bar .top");
const DOMSideBarSVG1 = turnToDOM(sideBarSVG);

DOMSideBarSVG1.classList.add("side-bar-icon");
topContainer.appendChild(DOMSideBarSVG1);

// Plus Circle SVG - Add Task Button
const addTaskButton = document.querySelector(".add-task button");
const DOMPlusCircleSVG = turnToDOM(plusCircleSVG);

DOMPlusCircleSVG.classList.add("plus-circle-icon");
addTaskButton.insertBefore(DOMPlusCircleSVG, addTaskButton.firstChild);

// Inbox SVG
const inboxContainer = document.querySelector(".inbox");
const DOMInboxSVG = turnToDOM(inboxSVG);

inboxContainer.insertBefore(DOMInboxSVG, inboxContainer.firstChild);

// Plus Circle SVG - Projects Tab
const projectsTopContainer = document.querySelector(".side-bar .projects .top");
const DOMPlusCircleSVG2 = turnToDOM(plusCircleSVG);

DOMPlusCircleSVG2.classList.add("plus-circle-icon");
projectsTopContainer.appendChild(DOMPlusCircleSVG2);

// Hash SVG
const projectContainer = document.querySelectorAll(
  ".projects-list .project-tab .project-name",
);

projectContainer.forEach((container) => {
  const DOMHashSVG = turnToDOM(hashSVG);

  DOMHashSVG.classList.add("hash-icon");
  container.insertBefore(DOMHashSVG, container.firstChild);
});
*/
