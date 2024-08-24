import createIconButton from "./components/button/iconButton";
import formatDate from "./utils/date";

import calendarIcon from "!!raw-loader!../assets/icons/calendar.svg";
import editIcon from "!!raw-loader!../assets/icons/edit.svg";
import deleteIcon from "!!raw-loader!../assets/icons/delete.svg";

const createTask = (id, title, description, dueDate, project, priority = 4) => {
  return { title, description, dueDate, project, priority, id };
};

const tasks = [
  createTask(
    0,
    "Go rock climbing",
    "Meet my friends at the rock climbing center",
    new Date(),
    null,
    1
  ),
  createTask(1, "Do the dishes", null, new Date(), null, 2),
  createTask(2, "Buy milk and cigarettes", null, new Date(), null, 3),
  createTask(3, "Run 1 kilometer", null, new Date()),
];

const renderTask = (task) => {
  const element = document.createElement("li");
  element.classList = "task";

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

  const editBtn = createIconButton(editIcon);
  const deleteBtn = createIconButton(deleteIcon);

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
    projectColor.classList = "task-project-color";
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
    .filter(filter)
    .sort((a, b) => a.priority - b.priority || a.dueDate - b.dueDate);

  container.innerHTML = "";
  sorted.forEach((task) => {
    container.appendChild(renderTask(task));
  });
};

export { renderTasks };