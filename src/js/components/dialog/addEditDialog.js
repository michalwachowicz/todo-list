import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";
import DatePicker from "../picker/datePicker";
import ProjectSelect from "../select/projectSelect";
import projects from "../../store/projects";
import PrioritySelect from "../select/prioritySelect";

const dialog = document.querySelector("dialog#add-edit-dialog");
const form = document.querySelector("form#add-edit-form");

const nameInput = form.querySelector("#name");
const descriptionInput = form.querySelector("#description");

const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = form.querySelector(".btn-cancel");

const datePicker = new DatePicker(
  "form#add-edit-form",
  ".btn-label-date",
  'input[type="date"]'
);

const projectSelect = new ProjectSelect(
  'label[for="add-edit-project"]',
  ".form-project-popup",
  "#add-edit-project"
);

const prioritySelect = new PrioritySelect(
  'label[for="add-edit-priority"]',
  ".form-priority-popup",
  "#add-edit-priority"
);

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  nameInput.value = (task && task.title) || "";
  descriptionInput.value = (task && task.description) || "";
  submitBtn.textContent = task ? "Edit task" : "Add task";
  datePicker.updateDate((task && task.dueDate) || null);
  projectSelect.setCurrentProject(
    task && task.projectId
      ? projects.find((project) => project.id == task.projectId)
      : null
  );
  prioritySelect.setCurrentPriority((task && task.priority) || 4);

  dialog.showModal();
};

const closeDialog = () => {
  dialog.close();
};

cancelBtn.addEventListener("click", closeDialog);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = tasks.createTask(
    nameInput.value,
    descriptionInput.value || null,
    datePicker.getDate(),
    projectSelect.getInput().value,
    prioritySelect.getInput().value
  );

  if (currentTask && currentTask.id !== -1) {
    tasks.getTasks().update(currentTask.id, task);
  } else {
    tasks.getTasks().add(task);
  }

  tasks.renderTasks(navigator.getActiveItem().filter);
  closeDialog();
});

export default { openDialog, closeDialog };
