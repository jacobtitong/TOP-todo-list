import { default as createDOM } from "./createDOM.js";
import closeSVG from "./assets/icons/close.svg";
import checkSVG from "./assets/icons/check.svg";

const createForm = (actionButtonAdd, DOMProjects) => {
  if (actionButtonAdd.classList.contains("clicked")) return;
  actionButtonAdd.classList.add("clicked");
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
    value: "#FFFFFF",
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

  listenForCheck(formAddProject, actionButtonAdd);
  listenForClose(formAddProject, buttonClose, actionButtonAdd);
};

const allowAddProject = (DOMProjects) => {
  const actionButtonAdd = DOMProjects.querySelector(
    ".actions .plus-circle-icon",
  );
  actionButtonAdd.addEventListener("click", (e) =>
    createForm(actionButtonAdd, DOMProjects),
  );
};

const gatherFormData = (e, form) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form));
  form.remove();
};

const listenForCheck = (form, actionButtonAdd) => {
  console.log("working listen");
  form.addEventListener("submit", (e) => {
    gatherFormData(e, form);
    actionButtonAdd.classList.remove("clicked");
  });
};

const closeForm = (form) => {
  form.remove();
};

const listenForClose = (form, buttonClose, actionButtonAdd) => {
  buttonClose.addEventListener("click", (e) => {
    closeForm(form);
    actionButtonAdd.classList.remove("clicked");
  });
};

export default allowAddProject;
