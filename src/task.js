import { Tasks } from "./library.js";
import { format, parseISO } from "date-fns";

class Task {
  #title;
  #description;
  #dueDate;
  #day;
  #priority = 4;
  #category = null;
  #complete = false;
  #id = crypto.randomUUID();
  #checklist = new Tasks();

  constructor({ title, description, dueDate, priority, category }) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#day = dueDate ? format(parseISO(dueDate), "yyyy-MM-dd") : undefined;
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

  get checklist() {
    return this.#checklist;
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
