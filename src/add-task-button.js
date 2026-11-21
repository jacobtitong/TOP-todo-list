import { dialog } from "./add-task-dialog.js";
import { default as categoryManager } from "./category-manager.js";
import { default as taskManager } from "./task-manager.js";

const storeTaskData = (formData) => {
  const categoryID = formData.category;
  const allCategories = categoryManager.showAllCategories();

  const chosenCategory = allCategories.filter(
    (category) => category.id === categoryID,
  )[0].tasksList;
  console.log(chosenCategory);

  const task = taskManager.createTask(formData);
  console.log(task);
  taskManager.insertTask({ library: chosenCategory, task: task });

  console.log(categoryManager.showAllCategories());
};

export default function allowAddTaskButton() {
  const form = document.querySelector(".add-task-container");

  function gatherFormData(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));

    storeTaskData(formData);

    dialog.close();
    dialog.remove();
  }

  form.removeEventListener("submit", (e) => gatherFormData(e));

  form.addEventListener("submit", (e) => gatherFormData(e));
}
