import {
  format,
  getDaysInMonth,
  lastDayOfMonth,
  isSameWeek,
  subDays,
  addDays,
  subMonths,
} from "date-fns";
import { default as createDOM } from "./createDOM.js";

const dateTimeManager = (() => {
  const deactivateDateTimePicker = (dateTimePicker) => {
    if (!dateTimePicker.classList.contains("active")) return;

    const dateTime = dateTimePicker.querySelector(".date-time");

    dateTime.classList.add("hidden");
    dateTimePicker.classList.remove("active");
  };

  const activeDateTimePicker = (dateTimePicker, dateTimePickerList) => {
    if (dateTimePicker.classList.contains("active")) return;

    dateTimePickerList.forEach(deactivateDateTimePicker);
    dateTimePicker.classList.add("active");
  };

  const toggleDateTime = (dateTimePicker) => {
    const dateTime = dateTimePicker.querySelector(".date-time");

    dateTime.classList.toggle("hidden");
  };

  const unselectDay = (day) => {
    day.classList.remove("selected");
  };

  const selectDay = (days, day) => {
    if (day.classList.contains("selected")) return;

    days.forEach(unselectDay);
    day.classList.add("selected");
  };

  const getPreviousMonth = (currentDate) => {
    return subMonths(currentDate, 1);
  };

  const displayPreviousMonth = (dateTimePicker, currentDate) => {
    const previousMonth = getPreviousMonth(currentDate);

    const monthYear = dateTimePicker.querySelector(".dates .month");

    monthYear.textContent = format(previousMonth, "MMMM yyyy");

    return previousMonth;
  };

  const displayCurrentMonthYear = (dateTimePicker, currentDate) => {
    const monthYear = dateTimePicker.querySelector(".dates .month");

    monthYear.textContent = format(currentDate, "MMMM yyyy");
  };

  const getDays = (currentDate) => {
    const numberOfDays = getDaysInMonth(currentDate);

    const firstDay = currentDate;
    firstDay.setDate(1); // Get's the first day of the current month
    const lastDay = lastDayOfMonth(currentDate); // Get's the last day of the current month

    let prevDay = subDays(firstDay, 1);
    let nextDay = addDays(lastDay, 1);

    // Gets the days of the previous month that is the same week as the first day of the current month.
    const prevMonthDays = [];
    while (isSameWeek(firstDay, prevDay, { weekStartsOn: 1 })) {
      prevMonthDays.push(prevDay.getDate());
      prevDay = subDays(prevDay, 1);
    }
    prevMonthDays.sort();

    // Gets the days of next month that is the same week as the last day of the current month.
    const nextMonthDays = [];
    while (isSameWeek(lastDay, nextDay, { weekStartsOn: 1 })) {
      nextMonthDays.push(nextDay.getDate());
      nextDay = addDays(nextDay, 1);
    }
    nextMonthDays.sort();

    // Gets the days of the current month.
    const monthDays = [];
    for (let i = 1; i <= numberOfDays; i++) {
      monthDays.push(i);
    }

    return { prevMonthDays, monthDays, nextMonthDays };
  };

  const populateDays = (dateTimePicker, currentDate) => {
    const days = getDays(currentDate);

    const daysContainer = dateTimePicker.querySelector(".days");

    days.prevMonthDays.forEach((day) => {
      const div = createDOM("div", { class: "non-month-day" }, day.toString());
      daysContainer.appendChild(div);
    });

    days.monthDays.forEach((day) => {
      const div = createDOM("div", {}, day.toString());
      daysContainer.appendChild(div);
    });

    days.nextMonthDays.forEach((day) => {
      const div = createDOM("div", { class: "non-month-day" }, day.toString());
      daysContainer.appendChild(div);
    });
  };

  const unPopulateDays = (daysList) => {
    daysList.forEach((day) => day.remove());
    console.log("removed");
  };

  return {
    deactivateDateTimePicker,
    activeDateTimePicker,
    toggleDateTime,
    selectDay,
    populateDays,
    displayPreviousMonth,
    displayCurrentMonthYear,
    unPopulateDays,
  };
})();

const activateDateTimePicker = () => {
  const form = document.querySelector("form");

  form.classList.remove("no-widget");
  form.classList.add("widget");

  const dateTimePickerList = document.querySelectorAll(".date-time-picker");

  dateTimePickerList.forEach((dateTimePicker) => {
    let daysList = dateTimePicker.querySelectorAll(".days div:not(.day)");
    const dateTime = dateTimePicker.querySelector(".date-time");
    const dateTimePickerValue = dateTimePicker.querySelector(".value");
    const monthLeftArrow = dateTimePicker.querySelector(
      ".month-tab .arrows.prev-month",
    );
    const monthRightArrow = dateTimePicker.querySelector(
      ".month-tab .arrows.next-month",
    );

    dateTimePickerValue.addEventListener("click", (event) => {
      if (!dateTime.classList.contains("hidden")) {
        dateTimeManager.unPopulateDays(daysList);
        dateTimeManager.toggleDateTime(dateTimePicker);
        return;
      }

      let currentDate = new Date();

      // Populates the days in the DOM within the dateTimePicker
      dateTimeManager.populateDays(dateTimePicker, currentDate);
      daysList = dateTimePicker.querySelectorAll(".days div:not(.day)");

      dateTimeManager.displayCurrentMonthYear(dateTimePicker, currentDate);

      // Makes each day have an event listener for being selected.
      const dayListContainer = dateTimePicker.querySelector(".days");
      const days = dayListContainer.querySelectorAll(
        "div:not(.non-month-day, .day)",
      );
      days.forEach((day) => {
        day.addEventListener("click", (event) => {
          dateTimeManager.selectDay(days, day);
        });
      });

      monthLeftArrow.addEventListener("click", (event) => {
        currentDate = dateTimeManager.displayPreviousMonth(
          dateTimePicker,
          currentDate,
        );
      });

      // Shows/Hides date-time container
      dateTimeManager.toggleDateTime(dateTimePicker);
    });

    dateTimePicker.addEventListener("focus", (event) => {
      dateTimeManager.activeDateTimePicker(dateTimePicker, dateTimePickerList);
    });

    dateTimePicker.addEventListener("blur", (event) => {
      dateTimeManager.unPopulateDays(daysList);
      dateTimeManager.deactivateDateTimePicker(dateTimePicker);
    });

    dateTimePicker.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        dateTimeManager.unPopulateDays(daysList);
        dateTimeManager.deactivateDateTimePicker(dateTimePicker);
      }

      if (event.key === "Enter" || event.key === " ") {
        // Add the same functionalities here when dateTimePickerValue is clicked ("click" listener)
        dateTimeManager.toggleDateTime(dateTimePicker);
      }
    });
  });
};

export default activateDateTimePicker;
