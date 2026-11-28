import { default as Category } from "./category.js";
import { default as categoryManager } from "./category-manager.js";

class Library {
  #inventory;

  constructor({ inventory = [] } = {}) {
    this.#inventory = inventory;
    if (this.#inventory.length) {
      // If inventory already contains data.
      this.populateInventory();
    }
  }

  get library() {
    return this.#inventory;
  }

  set library(newLibrary) {
    this.#inventory = newLibrary;
  }

  get data() {
    return {
      inventory: this.#inventory.map((obj) => obj.data),
    };
  }

  populateInventory() {
    if ("name" in this.#inventory[0]) {
      // Since "name" exists in only categories, the inventory is assumed to be an array of category instances.

      this.#inventory = this.#inventory.map((obj) => new Category(obj));
    }
    // Nothing will be done for tasks, because they will be populated in each Category instance which would also populate globalScopeTasks.
  }
}

const canAddItems = {
  addItem(obj) {
    this.library.push(obj);
  },
};

const canRemoveItems = {
  removeItem(obj) {
    this.library = this.library.filter((item) => item !== obj);
  },
};

class Tasks extends Library {
  #id = crypto.randomUUID();

  get id() {
    return this.#id;
  }
}

Object.assign(Tasks.prototype, canAddItems, canRemoveItems);

class Categories extends Library {}

Object.assign(Categories.prototype, canAddItems, canRemoveItems);

let globalScopeCategories = new Categories();
let globalScopeTasks = new Tasks();

const changeGlobalScopeCategories = (library) => {
  globalScopeCategories = library;
};

const changeGlobalScopeTasks = (library) => {
  globalScopeTasks = library;
};

export {
  Tasks,
  Categories,
  globalScopeCategories,
  globalScopeTasks,
  changeGlobalScopeCategories,
  changeGlobalScopeTasks,
};
