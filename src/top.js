import "./top.css";
import { default as createDOM } from "./createDOM.js";
import sortFilterSVG from "./assets/icons/sort-filter.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";

const renderTop = () => {
  const topContainer = document.querySelector("div.top");
  const sortFilterSpan = createDOM("span", {}, "Sort / Filter");
  const sortFilter = createDOM("div", { class: "sort-filter" }, sortFilterSpan);

  topContainer.appendChild(sortFilter);

  /* SVGs */

  // Sort Filter SVG
  const sortFilterContainer = document.querySelector(".sort-filter");
  const DOMSortFilterSVG = createDOM(sortFilterSVG, {});

  sortFilterContainer.insertBefore(
    DOMSortFilterSVG,
    sortFilterContainer.firstChild,
  );

  // Side Bar SVG
  const DOMSideBarSVG = createDOM(sideBarSVG, { class: "side-bar-icon" });

  return { topContainer, DOMSideBarSVG };
};

export default renderTop();
