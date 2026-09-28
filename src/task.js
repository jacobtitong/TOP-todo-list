class Task {
  #title;
  #description;
  #dueDate;
  #priority;
  #project = null;
  #complete = false;

  constructor(title, description, dueDate, priority, project) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#project = project;
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

  get project() {
    return this.#project;
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

  set project(newProject) {
    this.#project = newProject;
  }

  set complete(status) {
    this.#complete = status;
  }
}
