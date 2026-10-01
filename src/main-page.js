import "./main-page.css";
import { default as turnToDOM } from "./turnToDOM.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";

const renderMainPage = () => {
  // Due Date SVG
  const dueDateContainer = document.querySelector(".task-details .dueDate");
  const DOMCalendarSVG = turnToDOM(calendarSVG);

  DOMCalendarSVG.classList.add("due-date-icon");
  dueDateContainer.insertBefore(DOMCalendarSVG, dueDateContainer.firstChild);

  //  Hash SVG
  const projectLabelContainer = document.querySelector(".project-label");
  const DOMHashSVG = turnToDOM(hashSVG);

  DOMHashSVG.classList.add("hash-icon");
  projectLabelContainer.appendChild(DOMHashSVG);
};

export default renderMainPage;
