import tasks from "../../store/tasks";
import createIconButton from "../button/iconButton";
import DatePicker from "../picker/datePicker";
import PrioritySelect from "../select/prioritySelect";
import ProjectSelect from "../select/projectSelect";
import closeIcon from "!!raw-loader!../../../assets/icons/close.svg";
import projects from "../../store/projects";
import navigator from "../../utils/navigator";
import visibility from "../../utils/visibility";

const dialog = document.querySelector(".dialog-show-task");
const form = document.querySelector(".form-show-task");

const titleInput = form.querySelector(".form-input-title");
const descriptionInput = form.querySelector(".form-input-description");

const btnCheck = dialog.querySelector(".btn-check");
const info = dialog.querySelector(".dialog-task-info");

const title = info.querySelector(".dialog-task-title");
const description = info.querySelector(".dialog-task-description");

const cancelBtn = form.querySelector(".btn-cancel");
const closeBtn = createIconButton(closeIcon, "Close dialog", () =>
  dialog.close()
);

const labelBtns = dialog.querySelector(".form-btns-label");
const hr = dialog.querySelector("hr");

dialog.appendChild(closeBtn);

const updateValue = (key, value) => {
  const updatedTask = { ...currentTask, [key]: value };

  tasks.getTasks().update(currentTask.id, updatedTask);
  tasks.renderTasks(navigator.getActiveItem().filter);

  currentTask = updatedTask;
};

const datePicker = new DatePicker(".dialog-show-task", () =>
  updateValue("dueDate", datePicker.getDate())
);

const projectSelect = new ProjectSelect(".dialog-show-task", () =>
  updateValue("projectId", projectSelect.getCurrentProject().id)
);

const prioritySelect = new PrioritySelect(".dialog-show-task", () => {
  const priority = prioritySelect.getCurrentPriority();

  updateValue("priority", priority);
  btnCheck.classList = `btn btn-check btn-check-${priority}`;
});

let currentTask = null;
let taskChecked = false;

const openDialog = (task = null) => {
  currentTask = task;
  taskChecked = false;

  projectSelect.updateList();

  const titleValue = (task && task.title) || "";

  titleInput.value = titleValue;
  title.textContent = titleValue;

  const descriptionValue = (task && task.description) || "";

  descriptionInput.value = descriptionValue;
  descriptionInput.parentNode.dataset.value = descriptionValue;
  description.textContent = descriptionValue;

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
  uncheckTask();

  dialog.showModal();
};

const showForm = () => {
  info.classList.add("hidden");
  form.classList.remove("hidden");

  titleInput.value = (currentTask && currentTask.title) || "";
  descriptionInput.value = (currentTask && currentTask.description) || "";

  btnCheck.disabled = true;
};

const hideForm = () => {
  info.classList.remove("hidden");
  form.classList.add("hidden");

  btnCheck.disabled = false;
};

const uncheckTask = (checkedClass = "checked") => {
  taskChecked = false;

  btnCheck.classList.remove(checkedClass);
  title.classList.remove(checkedClass);

  visibility.show(labelBtns);
  visibility.show(hr);
};

cancelBtn.addEventListener("click", hideForm);
info.addEventListener("click", () => {
  if (!taskChecked) showForm();
});

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

btnCheck.addEventListener("click", () => {
  const checkedClass = "checked";
  taskChecked = !taskChecked;

  if (taskChecked) {
    taskChecked = true;

    btnCheck.classList.add(checkedClass);
    title.classList.add(checkedClass);

    visibility.hide(labelBtns);
    visibility.hide(hr);

    tasks.getTasks().delete(currentTask.id);
  } else {
    uncheckTask(checkedClass);
    tasks.getTasks().add(currentTask);
  }

  tasks.renderTasks(navigator.getActiveItem().filter);
});

export default { openDialog };
