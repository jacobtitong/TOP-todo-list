class Category {
  #name;
  #color;
  #id = crypto.randomUUID();

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
}

export default Category;
