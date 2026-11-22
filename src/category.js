import { Tasks } from "./library.js";

class Category {
  #name;
  #color;
  #id = crypto.randomUUID();
  #tasksList = new Tasks();
  #count = 0;

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

  get tasksList() {
    return this.#tasksList;
  }

  get count() {
    return this.#count;
  }

  increaseCount() {
    this.#count++;
  }

  decreaseCount() {
    this.#count--;
  }
}

export default Category;
