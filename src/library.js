class Library {
  #inventory = [];

  get library() {
    return this.#inventory;
  }

  set library(newLibrary) {
    this.#inventory = newLibrary;
  }
}

const canAddItems = {
  addItem(task) {
    this.library.push(task);
  },
};

const canRemoveItems = {
  removeItem(task) {
    this.library = this.library.filter((item) => item !== task);
  },
};

class Tasks extends Library {}

Object.assign(Tasks.prototype, canAddItems);
Object.assign(Tasks.prototype, canRemoveItems);

class Categories extends Library {}

Object.assign(Tasks.prototype, canAddItems);
Object.assign(Tasks.prototype, canRemoveItems);
