import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";

const dialog = document.querySelector("dialog#delete-dialog");
const form = document.querySelector("form#delete-form");
const cancelBtn = form.querySelector("button.btn-cancel");

let currentTaskId = -1;

const openDialog = (taskId = -1) => {
  currentTaskId = taskId;
  dialog.showModal();
};

const closeDialog = () => {
  dialog.close();
};

cancelBtn.addEventListener("click", closeDialog);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  tasks.deleteTask(currentTaskId);
  tasks.renderTasks(
    document.querySelector(".task-list"),
    navigator.getActiveItem().filter
  );

  closeDialog();
});

() => {
  console.log(dialog);
};

export default { openDialog };
