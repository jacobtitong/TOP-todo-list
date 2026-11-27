import { dialog } from "./edit-task-dialog.js";

export default function allowCancelEditTask() {
  const form = document.querySelector(".edit-task-container");

  const cancelButton = form.querySelector(".cancel-button");

  function closeDialog(e) {
    console.log("cancelled!");
    dialog.close();
    dialog.remove();
  }

  cancelButton.removeEventListener("click", closeDialog);
  cancelButton.addEventListener("click", closeDialog);
}
