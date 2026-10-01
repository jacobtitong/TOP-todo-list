import "./top.css";
import { default as turnToDOM } from "./turnToDOM.js";
import { default as createDOM } from "./createDOM.js";
import sortFilterSVG from "./assets/icons/sort-filter.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";

const renderTop = () => {
  const topContainer = document.querySelector("div.top");
  const sortFilter = createDOM({ element: "div", classList: "sort-filter" });
  const sortFilterSpan = createDOM({
    element: "span",
    textContent: "Sort / Filter",
  });

  topContainer.appendChild(sortFilter);
  sortFilter.appendChild(sortFilterSpan);

  /* SVGs */

  // Sort Filter SVG
  const sortFilterContainer = document.querySelector(".sort-filter");
  const DOMSortFilterSVG = turnToDOM(sortFilterSVG);

  sortFilterContainer.insertBefore(
    DOMSortFilterSVG,
    sortFilterContainer.firstChild,
  );

  // Side Bar SVG
  const DOMSideBarSVG = turnToDOM(sideBarSVG);
  DOMSideBarSVG.classList.add("side-bar-icon");

  return { topContainer, DOMSideBarSVG };
};

export default renderTop;
