import { default as allowAddTaskButton } from "./add-task-button.js";
import { default as allowCancelAddTaskButton } from "./cancel-add-task-button.js";
import { default as createDOM } from "./createDOM.js";
import { default as activateDateTimePicker } from "./date-time.js";
import { default as activatePrioritySelect } from "./priority-select.js";
import { default as activateCategorySelect } from "./category-select.js";
import { default as renderPriorityFlags } from "./priority.js";
import { default as renderCategoryHash } from "./category-input.js";
import { default as categoryManager } from "./category-manager.js";
import { default as mainContentElements } from "./main-content.js";

let dialog;

const allowAddTask = (sideBarContainer) => {
  const addTaskButton = sideBarContainer.querySelector(".add-task");

  function showDialog() {
    dialog = renderDialog();
    dialog.showModal();
    activateDateTimePicker();
    activatePrioritySelect();
    activateCategorySelect();
    allowAddTaskButton();
    allowCancelAddTaskButton();

    ["click", "cancel", "keyup"].forEach((event) => {
      dialog.addEventListener(event, (e) => {
        if (event === "cancel") e.preventDefault();
        if (e.target === e.currentTarget || e.key === "Escape") dialog.remove();
      });
    });
  }

  addTaskButton.removeEventListener("click", showDialog);
  addTaskButton.addEventListener("click", showDialog);
};

const renderDialog = () => {
  // .contents
  const inputTaskName = createDOM("input", {
    type: "text",
    placeholder: "Task name",
    id: "task-name",
    name: "title",
    required: "",
  });
  const labelTaskName = createDOM("label", { for: "task-name" }, inputTaskName);

  const inputDescription = createDOM("input", {
    type: "text",
    placeholder: "Description",
    id: "description",
    name: "description",
  });
  const labelDescription = createDOM(
    "label",
    { for: "description" },
    inputDescription,
  );

  const divContents = createDOM(
    "div",
    { class: "contents" },
    labelTaskName,
    labelDescription,
  );

  // .date-time-picker
  const inputDueDate = createDOM("input", {
    type: "datetime-local",
    id: "due-date",
    name: "dueDate",
  });
  const labelDueDate = createDOM("label", { for: "due-date" }, inputDueDate);
  const divDateValue = createDOM("div", { class: "value" }, "No Date");

  // .dates
  const divPrevMonth = createDOM("div", { class: "arrows prev-month" }, "<");
  const divMonth = createDOM("div", { class: "month" }, "October 2026");
  const divNextMonth = createDOM("div", { class: "arrows next-month" }, ">");
  const divMonthTab = createDOM(
    "div",
    { class: "month-tab" },
    divPrevMonth,
    divMonth,
    divNextMonth,
  );

  const dayLetters = ["M", "T", "W", "T", "F", "S", "S"];
  const dayElements = dayLetters.map((letter) =>
    createDOM("div", { class: "day" }, letter),
  );
  const divDays = createDOM("div", { class: "days" }, ...dayElements);
  const divDates = createDOM("div", { class: "dates" }, divMonthTab, divDays);

  // .time
  const divNextHour = createDOM("div", { class: "arrows next-hour" }, "<");
  const divHour = createDOM("div", { class: "hour" }, "9");
  const divPrevHour = createDOM("div", { class: "arrows prev-hour" }, ">");
  const divHours = createDOM(
    "div",
    { class: "hours" },
    divNextHour,
    divHour,
    divPrevHour,
  );

  const divColon = createDOM("div", { class: "colon" }, ":");

  const divNextMinute = createDOM("div", { class: "arrows next-minute" }, "<");
  const divMinute = createDOM("div", { class: "minute" }, "54");
  const divPrevMinute = createDOM("div", { class: "arrows prev-minute" }, ">");
  const divMinutes = createDOM(
    "div",
    { class: "minutes" },
    divNextMinute,
    divMinute,
    divPrevMinute,
  );

  const divAM = createDOM("div", { class: "selected" }, "AM");
  const divPM = createDOM("div", {}, "PM");
  const divState = createDOM("div", { class: "state" }, divAM, divPM);

  const divTime = createDOM(
    "div",
    { class: "time" },
    divHours,
    divColon,
    divMinutes,
    divState,
  );

  const divClear = createDOM("div", { class: "clear" }, "X");

  const divDateTime = createDOM(
    "div",
    { class: "date-time hidden" },
    divDates,
    divTime,
    divClear,
  );

  const divDateTimePicker = createDOM(
    "div",
    { class: "date-time-picker", tabindex: "0" },
    labelDueDate,
    divDateValue,
    divDateTime,
  );
  const divDateWrapper = createDOM("div", {}, divDateTimePicker);

  // Priority select
  const priorityOptions = [
    createDOM("option", { value: "1" }, "Priority 1"),
    createDOM("option", { value: "2" }, "Priority 2"),
    createDOM("option", { value: "3" }, "Priority 3"),
    createDOM("option", { value: "4", selected: "" }, "Priority 4"),
  ];
  const selectPriority = createDOM(
    "select",
    { name: "priority", tabindex: "0" },
    ...priorityOptions,
  );

  const spanPriorityValue = createDOM("span", { class: "value" }, "Priority 4");
  const priorityListItems = [
    createDOM(
      "li",
      { class: "option priority-1", role: "option" },
      "Priority 1",
    ),
    createDOM(
      "li",
      { class: "option priority-2", role: "option" },
      "Priority 2",
    ),
    createDOM(
      "li",
      { class: "option priority-3", role: "option" },
      "Priority 3",
    ),
    createDOM(
      "li",
      { class: "option priority-4", role: "option", "aria-selected": "true" },
      "Priority 4",
    ),
  ];
  const ulPriorityList = createDOM(
    "ul",
    { class: "optList hidden", role: "presentation" },
    ...priorityListItems,
  );
  const divCustomPriority = createDOM(
    "div",
    { class: "select priority-select", role: "listbox" },
    spanPriorityValue,
    ulPriorityList,
  );
  const divPriorityWrapper = createDOM(
    "div",
    {},
    selectPriority,
    divCustomPriority,
  );

  // Category select
  const categoryOptions = [];

  const allCategories = categoryManager.showAllCategories();

  const inboxCategory = allCategories[0];
  const initialChosenCategoryID = mainContentElements.projectName.dataset.id;

  for (const category of allCategories) {
    if (category.id === initialChosenCategoryID) {
      categoryOptions.push(
        createDOM(
          "option",
          { value: category.id, selected: "" },
          category.name,
        ),
      );
      continue;
    }
    categoryOptions.push(
      createDOM("option", { value: category.id }, category.name),
    );
  }

  const selectCategory = createDOM(
    "select",
    { name: "category", tabindex: "0" },
    ...categoryOptions,
  );

  const spanCategoryValue = createDOM(
    "span",
    { class: "value" },
    inboxCategory.name,
  );

  const categoryListItems = [];

  for (const option of categoryOptions) {
    if (option.value === inboxCategory.id) {
      categoryListItems.push(
        createDOM(
          "li",
          { class: "option inbox", role: "option", "aria-selected": "true" },
          `${option.textContent}`,
        ),
      );
      continue;
    }
    categoryListItems.push(
      createDOM(
        "li",
        { class: "option", role: "option" },
        `${option.textContent}`,
      ),
    );
  }

  const ulCategoryList = createDOM(
    "ul",
    { class: "optList hidden", role: "presentation" },
    ...categoryListItems,
  );
  const divCustomCategory = createDOM(
    "div",
    { class: "select category-select", role: "listbox" },
    spanCategoryValue,
    ulCategoryList,
  );
  const divCategoryWrapper = createDOM(
    "div",
    {},
    selectCategory,
    divCustomCategory,
  );

  // Wrapper for date, priority, and category controls
  const divControlsWrapper = createDOM(
    "div",
    {},
    divDateWrapper,
    divPriorityWrapper,
    divCategoryWrapper,
  );

  // .actions
  const btnCancel = createDOM(
    "button",
    { class: "cancel-button", type: "button" },
    "Cancel",
  );
  const btnAddTask = createDOM(
    "button",
    { class: "add-task-button" },
    "Add Task",
  );
  const divActions = createDOM(
    "div",
    { class: "actions" },
    btnCancel,
    btnAddTask,
  );

  // .additional-contents
  const divAdditionalContents = createDOM(
    "div",
    { class: "additional-contents" },
    divControlsWrapper,
    divActions,
  );

  // Form & Dialog
  const form = createDOM(
    "form",
    { class: "add-task-container no-widget" },
    divContents,
    divAdditionalContents,
  );
  const dialog = createDOM("dialog", {}, form);

  const body = document.querySelector("body");
  body.appendChild(dialog);

  renderPriorityFlags();
  renderCategoryHash();

  return dialog;
};

export { dialog, allowAddTask };
