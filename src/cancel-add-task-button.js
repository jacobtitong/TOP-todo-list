import { dialog } from "./add-task-dialog.js";

export default function allowCancelAddTask() {
  const form = document.querySelector(".add-task-container");

  const cancelButton = form.querySelector(".cancel-button");

  function closeDialog(e) {
    console.log("cancelled!");
    dialog.close();
    dialog.remove();
  }

  cancelButton.removeEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);
}
