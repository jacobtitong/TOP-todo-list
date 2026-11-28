import {
  Tasks,
  Categories,
  globalScopeCategories,
  globalScopeTasks,
} from "./library.js";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// At every page load, this will run:
if (storageAvailable("localStorage")) {
  // If there is local storage
  if (localStorage.length == 0) {
    // If local storage is empty, populate the storage.
    localStorage.setItem(
      "globalScopeCategories",
      JSON.stringify(globalScopeCategories.data),
    );
    localStorage.setItem(
      "globalScopeTasks",
      JSON.stringify(globalScopeTasks.data),
    );
  } else {
    // If local storage has items, replace variables with stored data.
    globalScopeCategories = new Categories(
      JSON.parse(localStorage.getItem("globalScopeCategories")),
    );
    globalScopeTasks = new Tasks(
      JSON.parse(localStorage.getItem("globalScopeTasks")),
    );
  }
}

export {};
