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

export { Tasks, Categories };
