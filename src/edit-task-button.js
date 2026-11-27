import { dialog } from "./edit-task-dialog.js";
import { default as categoryManager } from "./category-manager.js";
import { default as taskManager } from "./task-manager.js";
import { default as mainContentElements } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";
import { globalScopeTasks } from "./library.js";

const storeTaskData = (formData, selectedTask) => {
  const currentTask = globalScopeTasks.library.find(
    (task) => task.id === selectedTask.id,
  );

  taskManager.editTask(formData, currentTask);

  //   increaseTaskCount(chosenCategory);
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
