import { default as createDOM } from "./createDOM.js";
import { default as mainContentElements } from "./main-content.js";
import { globalScopeTasks } from "./library.js";
import calendarSVG from "./assets/icons/calendar.svg";
import hashSVG from "./assets/icons/hash.svg";
import { default as categoryManager } from "./category-manager.js";
import { format, parseISO } from "date-fns";

// CREATING ELEMENTS
const displayTasks = () => {
  const chosenCategory = categoryManager
    .showAllCategories()
    .filter(
      (category) => category.id === mainContentElements.projectName.dataset.id,
    )[0];

  const DOMTaskList = mainContentElements.taskList;
  const TasksList = chosenCategory.tasksList.library;

  TasksList.forEach((task) => {
    const categoryOfTask = categoryManager
      .showAllCategories()
      .filter((category) => category.id === task.category)[0].name;

    const checkbox = createDOM("input", {
      id: task.id,
      type: "checkbox",
      "data-priority": task.priority,
    });

    const checkboxLabel = createDOM(
      "label",
      {
        class: "checkbox-label",
        for: task.id,
      },
      checkbox,
    );
    const projectLabelSpan = createDOM("span", {}, categoryOfTask);
    const DOMHashSVG = createDOM(hashSVG, { class: "hash-icon" });
    const projectLabel = createDOM(
      "div",
      {
        class: "project-label",
      },
      projectLabelSpan,
      DOMHashSVG,
    );
    const title = createDOM(
      "p",
      {
        class: "title",
      },
      task.title,
    );
    const description = createDOM(
      "p",
      {
        class: "description",
      },
      task.description,
    );

    const DOMCalendarSVG = createDOM(calendarSVG, { class: "due-date-icon" });

    let dateText = "No Date";
    if (task.dueDate) {
      dateText = format(parseISO(task.dueDate), "MMM dd, p");
    }

    const dueDateSpan = createDOM("span", {}, dateText);

    const dueDate = createDOM(
      "div",
      { class: "dueDate" },
      DOMCalendarSVG,
      dueDateSpan,
    );
    const taskDetails = createDOM(
      "div",
      { class: "task-details" },
      title,
      description,
      dueDate,
    );
    const DOMTask = createDOM(
      "div",
      { class: "task" },
      checkboxLabel,
      taskDetails,
      projectLabel,
    );

    if (task.complete) DOMTask.classList.add("complete");

    // DISPLAYING ELEMENTS (appending only direct children)
    DOMTaskList.appendChild(DOMTask);

    const toggleCheckbox = () => {
      task.toggle();
      if (task.complete) {
        DOMTask.classList.add("complete");
      } else {
        DOMTask.classList.remove("complete");
      }
    };

    // Listen for checkbox
    checkbox.addEventListener("change", toggleCheckbox);
  });
};

export default displayTasks;
