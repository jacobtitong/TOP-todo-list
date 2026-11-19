import { dialog } from "./add-task-dialog.js";

export default function allowAddTaskButton() {
  const form = document.querySelector(".add-task-container");

  function gatherFormData(e) {
    e.preventDefault();

    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));

    dialog.close();
    dialog.remove();
  }

  form.removeEventListener("submit", (e) => gatherFormData(e));

  form.addEventListener("submit", (e) => gatherFormData(e));
}
