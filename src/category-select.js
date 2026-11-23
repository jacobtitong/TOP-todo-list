import { default as categoryManager } from "./category-manager.js";

const selectManager = (() => {
  const deactivateSelect = (select) => {
    if (!select.classList.contains("active")) return;

    const optList = select.querySelector(".optList");

    optList.classList.add("hidden");
    select.classList.remove("active");
  };

  const activeSelect = (select, selectList) => {
    if (select.classList.contains("active")) return;

    selectList.forEach(deactivateSelect);
    select.classList.add("active");
  };

  const toggleOptList = (select) => {
    const optList = select.querySelector(".optList");

    optList.classList.toggle("hidden");
  };

  const highlightOption = (select, option) => {
    const optionList = select.querySelectorAll(".option");

    optionList.forEach((other) => {
      other.classList.remove("highlight");
    });

    option.classList.add("highlight");
  };

  const updateValue = (select, index) => {
    const nativeWidget = select.previousElementSibling;
    const value = select.querySelector(".value");
    const optionList = select.querySelectorAll(".option");
    const childNodes = optionList[index].childNodes;

    optionList.forEach((other) => {
      other.setAttribute("aria-selected", "false");
    });

    optionList[index].setAttribute("aria-selected", "true");

    /* FOR CATEGORY SELECT ONLY */
    //
    value.classList.remove("inbox");
    if (optionList[index].classList.contains("inbox")) {
      value.classList.add("inbox");
    }
    //
    /* FOR CATEGORY SELECT ONLY */

    nativeWidget.selectedIndex = index;
    const allOptions = nativeWidget.querySelectorAll("option");
    for (let i = 0; i < allOptions.length; i++) {
      if (i === index) {
        allOptions[i].setAttribute("selected", "");
        continue;
      }
      allOptions[i].removeAttribute("selected");
    }

    /* FOR CATEGORY SELECT ONLY */
    //
    const getColor = (() => {
      let chosenColor;
      allOptions.forEach((option) => {
        if (option.hasAttribute("selected")) {
          const allCategories = categoryManager.showAllCategories();
          const chosenCategory = allCategories.filter(
            (category) => category.id === option.value,
          )[0];

          chosenColor = chosenCategory.color;
        }
      });
      return chosenColor;
    })();
    select.style["border-color"] = getColor;
    if (index === 0) {
      const style = window.getComputedStyle(document.body);

      select.style["border-color"] = style.getPropertyValue("--divider-clr");
    }
    //
    /* FOR CATEGORY SELECT ONLY */

    value.textContent = "";

    childNodes.forEach((child) => {
      const clone = child.cloneNode(true);
      value.appendChild(clone);
    });

    /* FOR CATEGORY SELECT ONLY */
    //
    const path = value.querySelector(".hash-icon path");
    path.setAttribute("stroke", getColor);
    if (index === 0) {
      const style = window.getComputedStyle(document.body);
      path.setAttribute("stroke", style.getPropertyValue("--secondary-txt"));
    }
    //
    /* FOR CATEGORY SELECT ONLY */

    highlightOption(select, optionList[index]);
  };

  const getIndex = (select) => {
    const nativeWidget = select.previousElementSibling;

    return nativeWidget.selectedIndex;
  };

  return {
    deactivateSelect,
    activeSelect,
    toggleOptList,
    highlightOption,
    updateValue,
    getIndex,
  };
})();

const activateSelect = () => {
  const form = document.querySelector("form");

  form.classList.remove("no-widget");
  form.classList.add("widget");

  const selectList = document.querySelectorAll(".category-select");

  selectList.forEach((select) => {
    const optionList = select.querySelectorAll(".option");
    const selectedIndex = selectManager.getIndex(select);

    select.tabIndex = 0;
    select.previousElementSibling.tabIndex = -1;

    selectManager.updateValue(select, selectedIndex);

    optionList.forEach((option, index) => {
      option.addEventListener("mouseover", () => {
        selectManager.highlightOption(select, option);
      });

      option.addEventListener("click", (event) => {
        selectManager.updateValue(select, index);
      });
    });

    select.addEventListener("click", (event) => {
      selectManager.toggleOptList(select);
    });

    select.addEventListener("focus", (event) => {
      selectManager.activeSelect(select, selectList);
    });

    select.addEventListener("blur", (event) => {
      selectManager.deactivateSelect(select);
    });

    select.addEventListener("keyup", (event) => {
      let index = selectManager.getIndex(select);

      if (event.key === "Escape") {
        selectManager.deactivateSelect(select);
      }
      if (event.key === "ArrowDown" && index < optionList.length - 1) {
        index++;
        event.preventDefault();
      }
      if (event.key === "ArrowUp" && index > 0) {
        index--;
        event.preventDefault();
      }

      if (event.key === "Enter" || event.key === " ") {
        selectManager.toggleOptList(select);
      }

      selectManager.updateValue(select, index);
    });
  });
};

export default activateSelect;
