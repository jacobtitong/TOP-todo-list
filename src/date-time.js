import {
  format,
  getDaysInMonth,
  lastDayOfMonth,
  isSameWeek,
  subDays,
  addDays,
  subMonths,
  addMonths,
  set,
  getDate,
  isSameDay,
  getHours,
  getMinutes,
  addHours,
  subHours,
  subMinutes,
  addMinutes,
} from "date-fns";
import { default as createDOM } from "./createDOM.js";

const dateTimeManager = (() => {
  let chosenDate;

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

  const selectDay = (days, day, currentDate, index) => {
    if (day.classList.contains("selected")) return;

    days.forEach(unselectDay);
    day.classList.add("selected");

    updateChosenDate(currentDate, index);
  };

  const allowSelection = (dateTimePicker, currentDate) => {
    // Makes each day have an event listener for being selected.
    const dayListContainer = dateTimePicker.querySelector(".days");
    const days = dayListContainer.querySelectorAll(
      "div:not(.non-month-day, .day)",
    );
    days.forEach((day, index) => {
      day.addEventListener("click", (event) => {
        selectDay(days, day, currentDate, index + 1);
      });
    });
  };

  const updateChosenDate = (currentDate, selectedDay) => {
    currentDate.setDate(selectedDay);
    chosenDate = currentDate;
  };

  const getPreviousMonth = (currentDate) => {
    return subMonths(currentDate, 1);
  };

  const getNextMonth = (currentDate) => {
    return addMonths(currentDate, 1);
  };

  const updateChosenTime = (currentDate) => {
    chosenDate = set(currentDate, {
      hours: getHours(currentDate),
      minutes: getMinutes(currentDate),
    });
    currentDate.setTime(chosenDate);
  };

  const getPreviousHour = (currentDate) => {
    return subHours(currentDate, 1);
  };

  const getNextHour = (currentDate) => {
    return addHours(currentDate, 1);
  };

  const getPreviousMinute = (currentDate) => {
    return subMinutes(currentDate, 1);
  };

  const getNextMinute = (currentDate) => {
    return addMinutes(currentDate, 1);
  };

  const displayCurrentTime = (dateTimePicker, currentDate) => {
    const timeContainer = dateTimePicker.querySelector(".time");
    const hour = timeContainer.querySelector(".hour");
    const minute = timeContainer.querySelector(".minute");
    const stateContainer = timeContainer.querySelector(".state");

    let hourValue = getHours(currentDate);
    const minuteValue = getMinutes(currentDate);
    let morning = true;

    // Because AM corresponds from 00:00 to 11:59 in a 24-hour clock
    if (hourValue > 11) {
      morning = false;
    }

    // So that the time becomes a 12-hour clock.
    if (hourValue > 12) {
      hourValue = hourValue - 12;
    }

    if (hourValue === 0) {
      hourValue = 12;
    }

    hour.textContent = hourValue.toString().padStart(2, "0");
    minute.textContent = minuteValue.toString().padStart(2, "0");

    selectState(stateContainer, morning);

    updateChosenTime(currentDate);

    return currentDate;
  };

  const selectState = (stateContainer, state) => {
    deselectStates(stateContainer);
    if (state) {
      const AM = stateContainer.querySelector("div:nth-of-type(1)");
      AM.classList.add("selected");
    } else {
      const PM = stateContainer.querySelector("div:nth-of-type(2)");
      PM.classList.add("selected");
    }
  };

  const deselectStates = (stateContainer) => {
    const allStates = stateContainer.querySelectorAll("div");
    allStates.forEach((state) => {
      state.classList.remove("selected");
    });
  };

  const displayCurrentMonthYear = (dateTimePicker, currentDate) => {
    const monthYear = dateTimePicker.querySelector(".dates .month");
    monthYear.textContent = format(currentDate, "MMMM yyyy");

    const daysList = dateTimePicker.querySelectorAll(".days div:not(.day)");
    unPopulateDays(daysList);

    populateDays(dateTimePicker, currentDate);

    allowSelection(dateTimePicker, currentDate);

    // It remembers to select the chosen date so that, even if the user navigates to a different monthYear, the chosenDate will always be selected in the appropriate monthYear tab.
    if (isSameDay(currentDate, chosenDate)) {
      const dayListContainer = dateTimePicker.querySelector(".days");
      const days = dayListContainer.querySelectorAll(
        "div:not(.non-month-day, .day)",
      );

      selectDay(
        days,
        days[getDate(chosenDate) - 1],
        chosenDate,
        getDate(chosenDate),
      );
    }

    return currentDate;
  };

  const getDays = (currentDate) => {
    const numberOfDays = getDaysInMonth(currentDate);

    const firstDay = set(currentDate, { date: 1 }); // Get's the first day of the current month
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
  };

  return {
    deactivateDateTimePicker,
    activeDateTimePicker,
    toggleDateTime,
    getPreviousMonth,
    getNextMonth,
    displayCurrentMonthYear,
    updateChosenDate,
    displayCurrentTime,
    getPreviousHour,
    getNextHour,
    getPreviousMinute,
    getNextMinute,
  };
})();

const activateDateTimePicker = () => {
  const form = document.querySelector("form");

  form.classList.remove("no-widget");
  form.classList.add("widget");

  const dateTimePickerList = document.querySelectorAll(".date-time-picker");

  dateTimePickerList.forEach((dateTimePicker) => {
    let currentDate;
    const dateTime = dateTimePicker.querySelector(".date-time");
    const dateTimePickerValue = dateTimePicker.querySelector(".value");
    const monthLeftArrow = dateTimePicker.querySelector(
      ".month-tab .arrows.prev-month",
    );
    const monthRightArrow = dateTimePicker.querySelector(
      ".month-tab .arrows.next-month",
    );
    const hoursArrowDown = dateTimePicker.querySelector(
      ".time .arrows.prev-hour",
    );
    const hoursArrowUp = dateTimePicker.querySelector(
      ".time .arrows.next-hour",
    );
    const minutesArrowDown = dateTimePicker.querySelector(
      ".time .arrows.prev-minute",
    );
    const minutesArrowUp = dateTimePicker.querySelector(
      ".time .arrows.next-minute",
    );

    monthLeftArrow.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentMonthYear(
        dateTimePicker,
        dateTimeManager.getPreviousMonth(currentDate),
      );
    });

    monthRightArrow.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentMonthYear(
        dateTimePicker,
        dateTimeManager.getNextMonth(currentDate),
      );
    });

    hoursArrowDown.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentTime(
        dateTimePicker,
        dateTimeManager.getPreviousHour(currentDate),
      );
    });

    hoursArrowUp.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentTime(
        dateTimePicker,
        dateTimeManager.getNextHour(currentDate),
      );
    });

    minutesArrowDown.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentTime(
        dateTimePicker,
        dateTimeManager.getPreviousMinute(currentDate),
      );
    });

    minutesArrowUp.addEventListener("click", (event) => {
      currentDate = dateTimeManager.displayCurrentTime(
        dateTimePicker,
        dateTimeManager.getNextMinute(currentDate),
      );
    });

    ["click", "keyup"].forEach((listen) => {
      dateTimePicker.addEventListener(listen, (event) => {
        if (
          event.target === dateTimePickerValue ||
          event.target === dateTimePicker
        ) {
          if (!dateTime.classList.contains("hidden")) {
            // Hides date-time container
            dateTimeManager.toggleDateTime(dateTimePicker);
            return;
          }
          if (
            event.key === "Enter" ||
            event.key === " " ||
            event.type === "click"
          ) {
            currentDate = new Date();

            dateTimeManager.updateChosenDate(currentDate, getDate(currentDate)); // Updates chosen date to today's date.

            dateTimeManager.displayCurrentMonthYear(
              dateTimePicker,
              currentDate,
            );

            dateTimeManager.displayCurrentTime(dateTimePicker, currentDate);

            // Shows date-time container
            dateTimeManager.toggleDateTime(dateTimePicker);
          }
        }
        return;
      });
    });

    dateTimePicker.addEventListener("focus", (event) => {
      dateTimeManager.activeDateTimePicker(dateTimePicker, dateTimePickerList);
    });

    dateTimePicker.addEventListener("blur", (event) => {
      dateTimeManager.deactivateDateTimePicker(dateTimePicker);
    });

    dateTimePicker.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        dateTimeManager.deactivateDateTimePicker(dateTimePicker);
      }
    });
  });
};

export default activateDateTimePicker;
