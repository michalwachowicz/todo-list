import navigator from "../../utils/navigator";
import tasks from "../../store/tasks";
import DatePicker from "../datePicker";

const dialog = document.querySelector("dialog#add-edit-dialog");
const form = document.querySelector("form#add-edit-form");

const nameInput = form.querySelector("#name");
const descriptionInput = form.querySelector("#description");

const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = form.querySelector(".btn-cancel");

const datePicker = new DatePicker(
  "form#add-edit-form",
  ".form-btn-label-date",
  'input[type="date"]'
);

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  nameInput.value = (task && task.title) || "";
  descriptionInput.value = (task && task.description) || "";
  submitBtn.textContent = task ? "Edit task" : "Add task";
  datePicker.updateDate((task && task.dueDate) || null);

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
    datePicker.getDate()
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
