import tasks from "../../store/tasks";
import createIconButton from "../button/iconButton";
import DatePicker from "../picker/datePicker";
import PrioritySelect from "../select/prioritySelect";
import ProjectSelect from "../select/projectSelect";
import closeIcon from "!!raw-loader!../../../assets/icons/close.svg";
import projects from "../../store/projects";
import navigator from "../../utils/navigator";

const dialog = document.querySelector("dialog#show-task-dialog");
const form = document.querySelector("form#show-task-form");

const titleInput = form.querySelector("#show-task-name");
const descriptionInput = form.querySelector("#show-task-description");

const btnCheck = dialog.querySelector(".btn-check");
const info = dialog.querySelector(".dialog-task-info");

const title = info.querySelector(".dialog-task-title");
const description = info.querySelector(".dialog-task-description");

const cancelBtn = form.querySelector(".btn-cancel");
const closeBtn = createIconButton(closeIcon, () => dialog.close());

dialog.appendChild(closeBtn);

const datePicker = new DatePicker(
  "dialog#show-task-dialog",
  ".btn-label-date",
  'input[type="date"]'
);

const projectSelect = new ProjectSelect(
  "dialog#show-task-dialog",
  'label[for="show-task-project"]',
  ".form-project-popup",
  "#show-task-project"
);

const prioritySelect = new PrioritySelect(
  "dialog#show-task-dialog",
  'label[for="show-task-priority"]',
  ".form-priority-popup",
  "#show-task-priority"
);

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  projectSelect.updateList();

  titleInput.value = (task && task.title) || "";
  title.textContent = (task && task.title) || "";

  descriptionInput.value = (task && task.description) || "";
  description.textContent = (task && task.description) || "";

  btnCheck.classList = "btn btn-check";
  if (task && task.priority)
    btnCheck.classList.add(`btn-check-${task.priority}`);

  datePicker.updateDate((task && task.dueDate) || null);
  projectSelect.setCurrentProject(
    task && task.projectId
      ? projects.find((project) => project.id == task.projectId)
      : null
  );
  prioritySelect.setCurrentPriority((task && task.priority) || 4);

  hideForm();
  dialog.showModal();
};

const showForm = () => {
  info.classList.add("hidden");
  form.classList.remove("hidden");

  titleInput.value = (currentTask && currentTask.title) || "";
  descriptionInput.value = (currentTask && currentTask.description) || "";
};

const hideForm = () => {
  info.classList.remove("hidden");
  form.classList.add("hidden");
};

cancelBtn.addEventListener("click", hideForm);
info.addEventListener("click", showForm);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = tasks.createTask(
    titleInput.value,
    descriptionInput.value || null,
    datePicker.getDate(),
    projectSelect.getInput().value,
    prioritySelect.getInput().value
  );

  if (currentTask && currentTask.id !== -1) {
    tasks.getTasks().update(currentTask.id, { ...task, id: currentTask.id });
    tasks.renderTasks(navigator.getActiveItem().filter);

    title.textContent = task.title;
    description.textContent = task.description;
  }

  hideForm();
});

export default { openDialog };
