import { Tasks } from "./library.js";

class Category {
  #name;
  #color;
  #id = crypto.randomUUID();
  #tasksList = new Tasks();
  #count = 0;
  #selection = false;

  constructor({ name, color }) {
    this.#name = name;
    this.#color = color;
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
