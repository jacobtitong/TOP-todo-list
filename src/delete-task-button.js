import { dialog } from "./edit-task-dialog.js";
import { default as taskManager } from "./task-manager.js";
import { default as categoryManager } from "./category-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";

export default function allowDeleteTaskButton(selectedTask) {
  const form = document.querySelector(".edit-task-container");

  const deleteButton = form.querySelector(".delete-button");

  const changeTaskCountDOM = (currentCategory) => {
    const DOMAllCategories = document.querySelectorAll(".project-tab");
    const DOMChosenCategory = [...DOMAllCategories].find(
      (category) => category.dataset.id === currentCategory.id,
    );
    DOMChosenCategory.querySelector(".count").textContent =
      currentCategory.count;
  };

  function closeDialog() {
    dialog.close();
    dialog.remove();
  }

  function deleteTask(selectedTask) {
    const allCategories = categoryManager.showAllCategories();
    const currentCategory = allCategories.find(
      (category) => category.id === selectedTask.category,
    );
    taskManager.deleteTask({
      library: currentCategory.tasksList,
      task: selectedTask,
    });

    currentCategory.decreaseCount();
    changeTaskCountDOM(currentCategory);

    // Re-rendering main-content task list
    mainContentElements.taskList.textContent = "";
    displayTasks();

    closeDialog();
  }

  deleteButton.removeEventListener("click", (e) => deleteTask(selectedTask));
  deleteButton.addEventListener("click", (e) => deleteTask(selectedTask));
}
