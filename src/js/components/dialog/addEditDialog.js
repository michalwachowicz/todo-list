const dialog = document.querySelector("dialog#add-edit-dialog");
const form = document.querySelector("form#add-edit-form");

const nameInput = form.querySelector("#name");
const descriptionInput = form.querySelector("#description");

const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = form.querySelector("#add-edit-btn-cancel");

let currentTask = null;

const openDialog = (task = null) => {
  currentTask = task;

  nameInput.value = task.title || "";
  descriptionInput.value = task.description || "";
  submitBtn.textContent = task ? "Edit task" : "Add task";

  dialog.showModal();
};

const closeDialog = () => {
  dialog.close();
};

export default { openDialog, closeDialog };
