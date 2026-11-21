import { default as createDOM } from "./createDOM.js";
import closeSVG from "./assets/icons/close.svg";
import checkSVG from "./assets/icons/check.svg";

const allowAddProject = (DOMProjects) => {
  // --- Project Section: Form (Adding a project)
  const DOMCloseSVG = createDOM(closeSVG, { class: "close-icon" });
  const DOMCheckSVG = createDOM(checkSVG, { class: "check-icon" });
  const actionButtonsContainer = createDOM(
    "div",
    { class: "action-buttons" },
    DOMCloseSVG,
    DOMCheckSVG,
  );
  const inputTextForm = createDOM("input", {
    id: "project-name",
    name: "project-name",
    type: "text",
  });
  const labelForm = createDOM(
    "label",
    { for: "project-name" },
    inputTextForm,
    actionButtonsContainer,
  );
  const formAddProject = createDOM(
    "form",
    { class: "add-project-form" },
    labelForm,
  );

  DOMProjects.insertBefore(formAddProject, DOMProjects.lastChild);
};

export default allowAddProject;
