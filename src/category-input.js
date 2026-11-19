import createDOM from "./createDOM.js";
import hashSVG from "./assets/icons/hash.svg";

const renderCategoryHash = () => {
  const categorySelect = document.querySelector(".category-select");
  const options = categorySelect.querySelectorAll(".option");

  options.forEach((option) => {
    const hashIcon = createDOM(hashSVG, { class: "hash-icon" });
    option.insertBefore(hashIcon, option.firstChild);
  });
};

export default renderCategoryHash;
