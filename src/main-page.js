import { default as createDOM } from "./createDOM.js";
import sortFilterSVG from "./assets/icons/sort-filter.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

// Sort Filter SVG
const sortFilterContainer = document.querySelector(".sort-filter");
const DOMSortFilterSVG = createDOM(sortFilterSVG);

sortFilterContainer.insertBefore(
  DOMSortFilterSVG,
  sortFilterContainer.firstChild,
);

// Side Bar SVG
const topContainer = document.querySelector(".top");
const DOMSideBarSVG = createDOM(sideBarSVG);

DOMSideBarSVG.classList.add("side-bar-icon");
topContainer.insertBefore(DOMSideBarSVG, topContainer.firstChild);

// Due Date SVG
const dueDateContainer = document.querySelector(".task-details .dueDate");
const DOMCalendarSVG = createDOM(calendarSVG);

DOMCalendarSVG.classList.add("due-date-icon");
dueDateContainer.insertBefore(DOMCalendarSVG, dueDateContainer.firstChild);

//  Hash SVG
const projectLabelContainer = document.querySelector(".project-label");
const DOMHashSVG = createDOM(hashSVG);

DOMHashSVG.classList.add("hash-icon");
projectLabelContainer.appendChild(DOMHashSVG);
