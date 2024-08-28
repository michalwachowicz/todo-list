import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";
import DatePicker from "../picker/datePicker";
import ProjectSelect from "../select/projectSelect";
import projects from "../../store/projects";
import PrioritySelect from "../select/prioritySelect";

const dialog = document.querySelector(".dialog-add-edit");
const form = document.querySelector(".form-add-edit");

const nameInput = form.querySelector(".form-input-title");
const descriptionInput = form.querySelector(".form-input-description");

const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = form.querySelector(".btn-cancel");

const datePicker = new DatePicker(".dialog-add-edit");
const projectSelect = new ProjectSelect(".dialog-add-edit");
const prioritySelect = new PrioritySelect(".dialog-add-edit");

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  projectSelect.updateList();

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
    tasks.getTasks().update(currentTask.id, { ...task, id: currentTask.id });
  } else {
    tasks.getTasks().add(task);
  }

  tasks.renderTasks(navigator.getActiveItem().filter);
  closeDialog();
});

export default { openDialog, closeDialog };
