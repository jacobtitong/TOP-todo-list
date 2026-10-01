import { default as Task } from "./task.js";
import { globalScopeTasks } from "./library.js";

const taskManager = (() => {
  const createTask = (taskDetails) => {
    return new Task(taskDetails);
  };

  const deleteTask = ({ library, task }) => {
    globalScopeTasks.removeItem(task);
    if (library === undefined) return;
    library.removeItem(task);
  };

  const insertTask = ({ library, task }) => {
    globalScopeTasks.addItem(task);
    if (library === undefined) return;
    library.addItem(task);
  };

  const toggleTask = (task) => {
    task.toggle();
  };

  const editTask = (taskDetails, task) => {
    for (const key in taskDetails) {
      task.key = taskDetails[key];
    }
  };

  return { createTask, deleteTask, insertTask, toggleTask, editTask };
})();

export default taskManager;
