import "./reset.css";
import "./style-guide.css";
import "./add-task-dialog.css";
import "./edit-task-dialog.css";
import "./select.css";
import "./priority.css";
import "./priority.js";
import "./category.css";
import "./category-input.js";
import "./due-date.css";
import "./date-time.css";
import { default as renderMainContent } from "./main-content.js";
import { default as displayTasks } from "./display-tasks.js";
import "./show-side-bar.js";
import { globalScopeTasks, globalScopeCategories } from "./library.js";
import { default as taskManager } from "./task-manager.js";
import { default as categoryManager } from "./category-manager.js";

displayTasks();
