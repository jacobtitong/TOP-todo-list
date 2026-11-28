import { format, parseISO } from "date-fns";

class Task {
  #title;
  #description;
  #dueDate;
  #day;
  #priority;
  #category;
  #complete;
  #id;

  constructor({
    title,
    description,
    dueDate = null,
    day,
    priority = 4,
    category = null,
    complete = false,
    id = crypto.randomUUID(),
  }) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#day = dueDate ? format(parseISO(dueDate), "yyyy-MM-dd") : null;
    this.#priority = priority;
    this.#category = category;
    this.#complete = complete;
    this.#id = id;
  }

  get data() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      day: this.#day,
      priority: this.#priority,
      category: this.#category,
      complete: this.#complete,
      id: this.#id,
    };
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

  get day() {
    return this.#day;
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

  get id() {
    return this.#id;
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

  set priority(newPriority) {
    this.#priority = newPriority;
  }

  set category(newProject) {
    this.#category = newProject;
  }

  toggle() {
    if (this.#complete) {
      this.#complete = false;
      return;
    }
    this.#complete = true;
  }
}

export default Task;
