import { Tasks } from "./library.js";
import Task from "./task.js";

class Category {
  #name;
  #color;
  #id;
  #tasksList;
  #count;
  #selection;

  constructor({
    name,
    color,
    id = crypto.randomUUID(),
    tasksList = new Tasks(),
    count = 0,
    selection = false,
  }) {
    this.#name = name;
    this.#color = color;
    this.#id = id;
    this.#tasksList = tasksList;
    this.#count = count;
    this.#selection = selection;

    if (tasksList.library) {
      // If tasks list already contains data, populate it with the data.
      populateTasksList();
    }
  }

  get data() {
    return {
      name: this.#name,
      color: this.#color,
      id: this.#id,
      tasksList: this.#tasksList.data,
      count: this.#count,
      selection: this.#selection,
    };
  }

  populateTasksList() {
    this.#tasksList.library = this.#tasksList.library.map(
      (obj) => new Task(obj),
    );
  }

  get name() {
    return this.#name;
  }

  get color() {
    return this.#color;
  }

  set name(newName) {
    this.#name = newName;
  }

  get id() {
    return this.#id;
  }

  get tasksList() {
    return this.#tasksList;
  }

  get count() {
    return this.#count;
  }

  get selection() {
    return this.#selection;
  }

  increaseCount() {
    this.#count++;
  }

  decreaseCount() {
    this.#count--;
  }

  select() {
    this.#selection = true;
  }

  unselect() {
    this.#selection = false;
  }
}

export default Category;
