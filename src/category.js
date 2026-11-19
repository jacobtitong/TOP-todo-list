import { Tasks } from "./library.js";

class Category {
  #name;
  #color;
  #id = crypto.randomUUID();
  #tasksList = new Tasks();

  constructor({ name, color }) {
    this.#name = name;
    this.#color = color;
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

  get tasks() {
    return this.#tasksList;
  }
}

export default Category;
