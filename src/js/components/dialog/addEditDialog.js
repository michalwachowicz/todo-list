import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";

const dialog = document.querySelector("dialog#add-edit-dialog");
const form = document.querySelector("form#add-edit-form");

const nameInput = form.querySelector("#name");
const descriptionInput = form.querySelector("#description");

const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = form.querySelector(".btn-cancel");

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  nameInput.value = (task && task.title) || "";
  descriptionInput.value = (task && task.description) || "";
  submitBtn.textContent = task ? "Edit task" : "Add task";

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
    null
  );

  if (currentTask && currentTask.id !== -1) {
    tasks.getTasks().update(currentTask.id, task);
  } else {
    tasks.getTasks().add(task);
  }

  tasks.renderTasks(
    document.querySelector(".task-list"),
    navigator.getActiveItem().filter
  );
  closeDialog();
});

export default { openDialog, closeDialog };
