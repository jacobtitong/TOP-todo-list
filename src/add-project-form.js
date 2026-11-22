import { default as createDOM } from "./createDOM.js";
import closeSVG from "./assets/icons/close.svg";
import checkSVG from "./assets/icons/check.svg";
import { format } from "date-fns";

const allowAddProject = (DOMProjects) => {
  // --- Project Section: Form (Adding a project)
  const DOMCloseSVG = createDOM(closeSVG, { class: "close-icon" });
  const DOMCheckSVG = createDOM(checkSVG, { class: "check-icon" });
  const buttonClose = createDOM("button", { type: "button" }, DOMCloseSVG);
  const buttonCheck = createDOM("button", {}, DOMCheckSVG);
  const actionButtonsContainer = createDOM(
    "div",
    { class: "action-buttons" },
    buttonClose,
    buttonCheck,
  );
  const inputTextForm = createDOM("input", {
    id: "project-name",
    name: "project-name",
    type: "text",
    required: "",
  });
  const inputColorForm = createDOM("input", {
    id: "project-color",
    name: "color",
    type: "color",
  });
  const labelColorInput = createDOM(
    "label",
    { for: "project-color" },
    inputColorForm,
  );
  const labelTextInput = createDOM(
    "label",
    { for: "project-name" },
    labelColorInput,
    inputTextForm,
    actionButtonsContainer,
  );

  const formAddProject = createDOM(
    "form",
    { class: "add-project-form" },
    labelTextInput,
  );

  DOMProjects.insertBefore(formAddProject, DOMProjects.lastChild);

  listenForCheck(formAddProject);
  listenForClose(formAddProject, buttonClose);
};

const gatherFormData = (e, form) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  console.log(formData);
};

const listenForCheck = (form) => {
  console.log("working listen");
  form.addEventListener("submit", (e) => gatherFormData(e, form));
};

const closeForm = (form) => {
  form.remove();
};

const listenForClose = (form, buttonClose) => {
  buttonClose.addEventListener("click", (e) => closeForm(form));
};

export default allowAddProject;
