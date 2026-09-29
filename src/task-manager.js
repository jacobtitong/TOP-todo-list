import { Task, globalScopeTasks } from "./task.js";

const taskManager = (() => {
  const createTask = (taskDetails) => {
    return new Task(taskDetails);
  };

  const deleteTask = (task) => {
    globalScopeTasks.removeItem(task);
  };

  const toggleTask = (task) => {
    task.toggle();
  };

  const editTask = (taskDetails, task) => {
    if (taskDetails.hasOwnProperty("title")) {
      const { title } = taskDetails;
      task.title = title;
    }

    if (taskDetails.hasOwnProperty("description")) {
      const { description } = taskDetails;
      task.description = description;
    }

    if (taskDetails.hasOwnProperty("dueDate")) {
      const { dueDate } = taskDetails;
      task.dueDate = dueDate;
    }

    if (taskDetails.hasOwnProperty("priority")) {
      const { priority } = taskDetails;
      task.priority = priority;
    }

    if (taskDetails.hasOwnProperty("category")) {
      const { category } = taskDetails;
      task.category = category;
    }
  };

  return { createTask, deleteTask, toggleTask, editTask };
})();
