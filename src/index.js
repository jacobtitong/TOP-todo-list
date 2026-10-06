import "./reset.css";
import "./style-guide.css";
import "./add-task-dialog.css";
import "./select.css";
import "./priority.css";
import "./priority.js";
import "./due-date.css";
import "./date-time.css";
import { default as activateSelect } from "./select.js";
import { default as renderMainContent } from "./main-content.js";
import "./addTask.js";
import "./display-tasks.js";
import "./show-side-bar.js";
import { globalScopeTasks, globalScopeCategories } from "./library.js";
import { default as taskManager } from "./task-manager.js";
import { default as categoryManager } from "./category-manager.js";

const dialog = document.querySelector("dialog");
dialog.showModal();

activateSelect();
