class Category {
  #name;
  #id = crypto.randomUUID();

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }
}
