import navigator from "./utils/navigator";
import formatDate from "./utils/date";
import projects from "./store/projects";

import createIconButton from "./components/button/iconButton";
import addEditDialog from "./components/dialog/addEditDialog";
import deleteDialog from "./components/dialog/deleteDialog";
import UndoPopup from "./components/undoPopup";

import calendarIcon from "!!raw-loader!../assets/icons/calendar.svg";
import editIcon from "!!raw-loader!../assets/icons/edit.svg";
import deleteIcon from "!!raw-loader!../assets/icons/delete.svg";

export default class TaskRenderer {
  #parent;
  #tasks;

  constructor(parent, tasks) {
    const undoPopup = new UndoPopup(".popup-undo");

    this.#parent = document.querySelector(parent);
    this.#tasks = tasks;

    this.#parent.addEventListener("click", (e) => {
      let target = e.target;

      while (target.tagName == "path" || target.tagName == "svg") {
        target = target.parentNode;
      }
      if (!target.classList) return;

      if (target.classList.contains("btn-check")) {
        const task = this.#findTask(target);

        this.#tasks.delete(task.id);
        undoPopup.open(task);

        this.render(navigator.getActiveItem().filter);
      } else if (target.classList.contains("btn-task-edit")) {
        const task = this.#findTask(target);

        addEditDialog.openDialog(task);
      } else if (target.classList.contains("btn-task-delete")) {
        const task = this.#findTask(target);

        deleteDialog.openDialog({ type: "task", id: task.id });
      }
    });
  }

  render(filter = (task) => task) {
    const sorted = this.#tasks
      .getList()
      .filter(filter)
      .sort((a, b) => a.priority - b.priority || a.dueDate - b.dueDate);

    this.#parent.innerHTML = "";
    sorted.forEach((task) => {
      this.#parent.appendChild(this.#renderTask(task));
    });
  }

  #findTask(target) {
    let taskElement = target;

    while (
      taskElement &&
      (!taskElement.classList.contains("task") || taskElement == document.body)
    ) {
      taskElement = taskElement.parentNode;
    }

    if (!taskElement || taskElement == document.body) return null;

    return this.#tasks
      .getList()
      .find((task) => task.id == taskElement.dataset.id);
  }

  #renderTask(task) {
    const element = document.createElement("li");
    element.classList = "task";
    element.dataset.id = task.id;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList = `btn btn-check btn-check-${task.priority}`;

    const container = document.createElement("div");
    container.classList = "task-container";

    const info = document.createElement("div");
    info.classList = "task-info";

    const title = document.createElement("h3");
    title.classList = "task-title";
    title.textContent = task.title;
    info.appendChild(title);

    if (task.description) {
      const description = document.createElement("p");
      description.classList = "task-description";
      description.textContent = task.description;
      info.appendChild(description);
    }

    if (task.dueDate) {
      const date = document.createElement("div");
      const fDate = formatDate(task.dueDate);

      date.classList = `task-date task-date-${fDate.dateClass}`;
      date.innerHTML = calendarIcon + fDate.formattedDate;

      info.appendChild(date);
    }

    const controls = document.createElement("div");
    controls.classList = "task-controls";

    const btns = document.createElement("div");
    btns.classList = "task-controls-btns";

    const editBtn = createIconButton(editIcon);
    editBtn.classList.add("btn-task-edit");

    const deleteBtn = createIconButton(deleteIcon);
    deleteBtn.classList.add("btn-task-delete");

    btns.append(editBtn, deleteBtn);

    const project = document.createElement("div");
    project.classList = "task-project";

    const projectTitle = document.createElement("div");
    const taskProject = projects.find((p) => p.id == task.projectId);

    projectTitle.classList = `task-project-title ${
      taskProject ? "" : "task-project-title-empty"
    }`;
    projectTitle.textContent = taskProject ? taskProject.name : "No Project";
    project.append(projectTitle);

    if (taskProject) {
      const projectColor = document.createElement("div");
      projectColor.classList = "project-color project-color-s";
      projectColor.style.backgroundColor = taskProject.color;
      project.append(projectColor);
    }

    controls.append(btns, project);
    container.append(info, controls);
    element.append(btn, container);

    return element;
  }
}
