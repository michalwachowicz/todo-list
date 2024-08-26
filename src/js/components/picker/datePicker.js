import calendarIcon from "!!raw-loader!../../../assets/icons/calendar.svg";
import formatDate from "../../utils/date";

export default class DatePicker {
  #label;
  #input;
  #date;

  constructor(parent, label, input, date = null) {
    const parentElement = document.querySelector(parent);

    this.#label = parentElement.querySelector(label);
    this.#input = parentElement.querySelector(input);
    this.#date = date;

    this.#input.classList.add("form-date-picker-input");

    this.#resetLabelClass();
    this.#updateLabel();

    this.#label.addEventListener("click", (e) => {
      e.preventDefault();
      this.#input.showPicker();
    });

    this.#input.addEventListener("change", (e) => {
      this.updateDate(new Date(e.target.value));
    });
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
