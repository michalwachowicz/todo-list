import closeIcon from "!!raw-loader!../../assets/icons/close.svg";
import tasks from "../store/tasks";
import navigator from "../utils/navigator";
import createIconButton from "./button/iconButton";

export default class UndoPopup {
  #popup;
  #task;
  #timeout;

  constructor(popup) {
    this.#popup = document.querySelector(popup);

    const undoBtn = this.#popup.querySelector(".btn-undo");
    undoBtn.addEventListener("click", () => {
      if (!this.#task || this.#task.id == -1) return;

      tasks.getTasks().add(this.#task);
      tasks.renderTasks(
        document.querySelector(".task-list"),
        navigator.getActiveItem().filter
      );

      this.close();
    });

    const closeBtn = createIconButton(closeIcon, () => this.close());
    this.#popup.appendChild(closeBtn);

    this.#popup.addEventListener("mouseover", () => this.addTimeout());
  }

  open(task) {
    this.#popup.classList.remove("hidden");
    this.#task = task;

    this.addTimeout();
  }

  addTimeout() {
    clearTimeout(this.#timeout);
    this.#timeout = setTimeout(() => this.close(), 5000);
  }

  close() {
    clearTimeout(this.#timeout);

    this.#popup.classList.add("hidden");
  }
}
