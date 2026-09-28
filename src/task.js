class Task {
  #title;
  #description;
  #dueDate;
  #priority = 4;
  #category = null;
  #complete = false;

  constructor(title, description, dueDate, priority, category) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#category = category;
  }

  get title() {
    return this.#title;
  }

  get description() {
    return this.#description;
  }

  get dueDate() {
    return this.#dueDate;
  }

  get priority() {
    return this.#priority;
  }

  get category() {
    return this.#category;
  }

  get complete() {
    return this.#complete;
  }

  set title(newTitle) {
    this.#title = newTitle;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  set dueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }

  set category(newProject) {
    this.#category = newProject;
  }

  set complete(status) {
    this.#complete = status;
  }
}
