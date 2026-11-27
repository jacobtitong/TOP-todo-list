import "./top.css";
import { default as createDOM } from "./createDOM.js";
import sortFilterSVG from "./assets/icons/sort-filter.svg";
import sideBarSVG from "./assets/icons/side-bar.svg";

const renderTop = () => {
  const topContainer = document.querySelector("div.top");

  // Side Bar SVG
  const DOMSideBarSVG = createDOM(sideBarSVG, { class: "side-bar-icon" });

  return { topContainer, DOMSideBarSVG };
};

export default renderTop();
