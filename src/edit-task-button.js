import { dialog } from "./edit-task-dialog.js";
import { default as categoryManager } from "./category-manager.js";
import { default as taskManager } from "./task-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";

const changeTaskCountDOM = () => {
  const allCategories = categoryManager.showAllCategories();
  const DOMAllProjects = document.querySelectorAll(".project-tab");

  DOMAllProjects.forEach((project, i) => {
    const DOMCount = project.querySelector(".count");
    DOMCount.textContent = `${allCategories[i].count}`;
  });
};

const storeTaskData = (formData, selectedTask) => {
  console.log(selectedTask);
  const oldTask = {};
  for (const key in formData) {
    oldTask[key] = selectedTask[key];
  }

  const previousCategoryID = oldTask.category;

  const newTask = taskManager.editTask(formData, selectedTask);

  if (formData.category !== oldTask.category) {
    const allCategories = categoryManager.showAllCategories();
    const previousCategory = allCategories.find(
      (category) => category.id === previousCategoryID,
    );
    const newCategory = allCategories.find(
      (category) => category.id === newTask.category,
    );
    taskManager.deleteTask({
      library: previousCategory.tasksList,
      task: newTask,
    });
    previousCategory.decreaseCount();
    taskManager.insertTask({ library: newCategory.tasksList, task: newTask });
    newCategory.increaseCount();
  }

  changeTaskCountDOM();
};

export default function allowEditTaskButton(selectedTask) {
  const form = document.querySelector(".edit-task-container");

  function gatherFormData(e, selectedTask) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));
    console.log(formData.dueDate);
    storeTaskData(formData, selectedTask);

    // Re-rendering main-content task list
    mainContentElements.taskList.textContent = "";
    displayTasks();

    dialog.close();
    dialog.remove();
  }

  form.removeEventListener("submit", (e) => gatherFormData(e, selectedTask));

  form.addEventListener("submit", (e) => gatherFormData(e, selectedTask));
}
