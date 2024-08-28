import visibility from "../utils/visibility";

export default class Popup {
  #button;
  #popup;
  #input;
  #isOpen;

  constructor(button, popup, input, onClick) {
    this.#button = document.querySelector(button);
    this.#popup = document.querySelector(popup);
    this.#input = document.querySelector(input);
    this.#isOpen = false;

    this.#button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.open();
    });

    this.#popup.addEventListener("click", (e) => {
      e.stopPropagation();

      onClick(e);
    });

    window.addEventListener("click", (e) => {
      const target = e.target;

      if (
        this.#isOpen &&
        !this.#button.contains(target) &&
        !this.#popup.contains(target)
      ) {
        this.close();
      }
    });
  }

  open() {
    this.#isOpen = true;
    visibility.show(this.#popup);
  }

  close() {
    this.#isOpen = false;
    visibility.hide(this.#popup);
  }

  getPopup() {
    return this.#popup;
  }

  getButton() {
    return this.#button;
  }

  getInput() {
    return this.#input;
  }
}
