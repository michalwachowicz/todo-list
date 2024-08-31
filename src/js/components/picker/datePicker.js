import calendarIcon from "!!raw-loader!../../../assets/icons/calendar.svg";
import formatDate from "../../utils/date";

export default class DatePicker {
  #label;
  #input;
  #date;

  constructor(
    parent,
    onChange = null,
    label = ".btn-label-date",
    input = ".form-input-date"
  ) {
    const parentElement = document.querySelector(parent);

    this.#label = parentElement.querySelector(label);
    this.#input = parentElement.querySelector(input);

    this.#input.classList.add("form-date-picker-input");

    this.#resetLabelClass();
    this.#updateLabel();

    this.#label.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.#isIOS()) {
        if (!this.#input.value) {
          this.#input.value = new Date().toISOString().split("T")[0];
        }

        this.#input.classList.add("ios-switch");
        this.#input.focus();
      } else {
        this.#input.showPicker();
      }
    });

    this.#input.addEventListener("change", (e) => {
      const value = e.target.value;

      this.updateDate(value ? new Date(value) : null);
      if (onChange) onChange(e);

      if (this.#isIOS()) {
        this.#input.classList.remove("ios-switch");
      }
    });

    this.#input.addEventListener("blur", () => {
      if (this.#isIOS()) {
        this.#input.classList.remove("ios-switch");
      }
    });
  }

  #isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  #resetLabelClass() {
    this.#label.classList = "btn btn-label task-date";
  }

  #updateLabel() {
    const formattedDate = formatDate(this.#date);

    this.#label.innerHTML = calendarIcon + formattedDate.formattedDate;
    this.#label.appendChild(this.#input);

    this.#resetLabelClass();

    if (this.#date)
      this.#label.classList.add(`task-date-${formattedDate.dateClass}`);
  }

  updateDate(date) {
    this.#date = date;
    this.#updateLabel();
  }

  getDate() {
    return this.#date;
  }
}
