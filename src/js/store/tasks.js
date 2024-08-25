import createIconButton from "../components/button/iconButton";
import addEditDialog from "../components/dialog/addEditDialog";
import deleteDialog from "../components/dialog/deleteDialog";
import formatDate from "../utils/date";
import Store from "./store";

import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";
import editIcon from "!!raw-loader!../../assets/icons/edit.svg";
import deleteIcon from "!!raw-loader!../../assets/icons/delete.svg";

const createTask = (title, description, dueDate, project, priority = 4) => {
  return { title, description, dueDate, project, priority };
};

const tasks = new Store("tasks");
const getTasks = () => tasks;

const renderTask = (task) => {
  const element = document.createElement("li");
  element.classList = "task";
  element.dataset.id = task.id;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList = `btn btn-check btn-check-${task.priority}`;
  btn.addEventListener("click", () => {});

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

  const editBtn = createIconButton(editIcon, () =>
    addEditDialog.openDialog(task)
  );
  const deleteBtn = createIconButton(deleteIcon, () => {
    deleteDialog.openDialog(task.id);
  });

  btns.append(editBtn, deleteBtn);

  const project = document.createElement("div");
  project.classList = "task-project";

  const projectTitle = document.createElement("div");
  projectTitle.classList = `task-project-title ${
    task.project ? "" : "task-project-title-empty"
  }`;
  projectTitle.textContent = task.project ? task.project.name : "No Project";
  project.append(projectTitle);

  if (task.project) {
    const projectColor = document.createElement("div");
    projectColor.classList = "project-color project-color-s";
    projectColor.style.backgroundColor = task.project.color;
    project.append(projectColor);
  }

  controls.append(btns, project);
  container.append(info, controls);
  element.append(btn, container);

  return element;
};

const renderTasks = (container, filter = (task) => task) => {
  const sorted = tasks
    .getList()
    .filter(filter)
    .sort((a, b) => a.priority - b.priority || a.dueDate - b.dueDate);

  container.innerHTML = "";
  sorted.forEach((task) => {
    container.appendChild(renderTask(task));
  });
};

export default { createTask, renderTasks, getTasks };
