import "./reset.css";
import "./style-guide.css";
import { default as renderMainPage } from "./main-page.js";
import "./show-side-bar.js";
import { globalScopeTasks, globalScopeCategories } from "./library.js";
import { default as taskManager } from "./task-manager.js";
import { default as categoryManager } from "./category-manager.js";

renderMainPage();
