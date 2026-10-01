import { default as taskManager } from "./task-manager.js";

taskManager.insertTask({
  task: taskManager.createTask({
    title: "title 1",
    description: "desc 1",
    dueDate: "Sep 27",
    priority: "4",
    category: "personal",
  }),
});

taskManager.insertTask({
  task: taskManager.createTask({
    title: "title 2",
    description: "desc 2",
    dueDate: "Today",
    priority: "2",
    category: "inbox",
  }),
});

taskManager.insertTask({
  task: taskManager.createTask({
    title: "title 3",
    description: "desc 3",
    dueDate: "Aug 21",
    priority: "4",
    category: "university",
  }),
});

taskManager.insertTask({
  task: taskManager.createTask({
    title: "title 3",
    description: "desc 3",
    dueDate: "Sep 27",
    priority: "4",
    category: "personal",
  }),
});
