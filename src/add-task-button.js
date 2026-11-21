import { dialog } from "./add-task-dialog.js";
import { default as categoryManager } from "./category-manager.js";
import { default as taskManager } from "./task-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";

const storeTaskData = (formData) => {
  const categoryID = formData.category;
  const allCategories = categoryManager.showAllCategories();

  const chosenCategory = allCategories.filter(
    (category) => category.id === categoryID,
  )[0].tasksList;
  console.log(chosenCategory);

  const task = taskManager.createTask(formData);

  taskManager.insertTask({ library: chosenCategory, task });
};

export default function allowAddTaskButton() {
  const form = document.querySelector(".add-task-container");

  function gatherFormData(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));

    storeTaskData(formData);

    // Re-rendering main-content task list
    mainContentElements.taskList.textContent = "";
    displayTasks();

    dialog.close();
    dialog.remove();
  }

  form.removeEventListener("submit", (e) => gatherFormData(e));

  form.addEventListener("submit", (e) => gatherFormData(e));
}
