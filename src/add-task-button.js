const form = document.querySelector(".add-task-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(Object.fromEntries(formData));
});
