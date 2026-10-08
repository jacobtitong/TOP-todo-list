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

  return {
    deactivateDateTimePicker,
    activeDateTimePicker,
    toggleDateTime,
    selectDay,
  };
})();

const activateDateTimePicker = () => {
  const form = document.querySelector("form");

  form.classList.remove("no-widget");
  form.classList.add("widget");

  const dateTimePickerList = document.querySelectorAll(".date-time-picker");

  dateTimePickerList.forEach((dateTimePicker) => {
    const dateTimeList = dateTimePicker.querySelectorAll(".date-time");

    dateTimeList.forEach((dateTime) => {
      const dayListContainer = dateTime.querySelector(".days");

      const days = dayListContainer.querySelectorAll(
        "div:not(.non-month-day, .day)",
      );

      days.forEach((day) => {
        day.addEventListener("click", (event) => {
          dateTimeManager.selectDay(days, day);
        });
      });
    });

    const dateTimePickerValue = dateTimePicker.querySelector(".value");

    dateTimePickerValue.addEventListener("click", (event) => {
      dateTimeManager.toggleDateTime(dateTimePicker);
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

      if (event.key === "Enter" || event.key === " ") {
        dateTimeManager.toggleDateTime(dateTimePicker);
      }
    });
  });
};

export default activateDateTimePicker;
