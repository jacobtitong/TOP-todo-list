import { default as renderTop } from "./top.js";
import { default as renderSideBar } from "./side-bar.js";
import { allowAddTask } from "./add-task-dialog.js";
import { default as allowAddProjects } from "./add-project-form.js";

const topElements = renderTop;
const sideBarSVG1 = topElements.DOMSideBarSVG;
const topContainer1 = topElements.topContainer;

topContainer1.insertBefore(sideBarSVG1, topContainer1.firstChild);

/* Temporary fake click event */
const clickEvent = new Event("click");

sideBarSVG1.addEventListener("click", (e) => {
  sideBarSVG1.setAttribute("style", "display: none;");

  const sideBarElements = renderSideBar();
  const sideBarContainer = sideBarElements.sideBarContainer;
  const sideBarSVG2 = sideBarElements.DOMSideBarSVG;
  const topContainer2 = sideBarElements.topContainer;

  topContainer2.appendChild(sideBarSVG2);

  sideBarSVG2.addEventListener("click", (e) => {
    sideBarContainer.textContent = "";
    sideBarSVG1.setAttribute("style", "display");
  });

  allowAddTask(sideBarContainer);
  allowAddProjects(sideBarElements.projects);
});

/* Temporary fake click event */
sideBarSVG1.dispatchEvent(clickEvent);
