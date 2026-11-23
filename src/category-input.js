import createDOM from "./createDOM.js";
import hashSVG from "./assets/icons/hash.svg";
import { default as categoryManager } from "./category-manager.js";

const renderCategoryHash = () => {
  const categorySelect = document.querySelector(".category-select");
  const options = categorySelect.querySelectorAll(".option");
  const allCategories = categoryManager.showAllCategories();

  options.forEach((option, index) => {
    const hashIcon = createDOM(hashSVG, { class: "hash-icon" });
    hashIcon
      .querySelector("path")
      .setAttribute("stroke", allCategories[index].color);
    option.insertBefore(hashIcon, option.firstChild);
  });
};

export default renderCategoryHash;
