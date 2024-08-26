export default class Popup {
  #button;
  #popup;
  #isOpen;

  constructor(button, popup, onClick) {
    this.#button = document.querySelector(button);
    this.#popup = document.querySelector(popup);
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
    this.#popup.classList.remove("hidden");
  }

  close() {
    this.#isOpen = false;
    this.#popup.classList.add("hidden");
  }

  getPopup() {
    return this.#popup;
  }

  getButton() {
    return this.#button;
  }
}
