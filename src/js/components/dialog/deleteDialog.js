import projects from "../../store/projects";
import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";

const dialog = document.querySelector(".dialog-delete");
const form = document.querySelector(".form-delete");
const title = form.querySelector(".form-title");

const cancelBtn = form.querySelector("button.btn-cancel");
const submitBtn = form.querySelector('button[type="submit"]');

let current = { type: null, id: -1 };

const openDialog = (target = { type: null, id: -1 }) => {
  if (!target.type || target.id === -1) return;

  current = target;

  title.textContent = `Are you sure you want to delete this ${current.type}?`;
  submitBtn.textContent = `Delete ${current.type}`;

  dialog.showModal();
};

const closeDialog = () => {
  dialog.close();
};

cancelBtn.addEventListener("click", closeDialog);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  closeDialog();
  if (current.id === -1) return;

  if (current.type == "task") {
    tasks.getTasks().delete(current.id);
  } else if (current.type == "project") {
    projects.getProjects().delete(current.id);
    projects.renderProjects(
      document.querySelector(".sidebar-nav-list-projects")
    );

    tasks.getTasks().filter((task) => task.projectId !== current.id);

    navigator.activate(navigator.mainNav[0]);
    navigator.updateNavigationDOM();
  }

  tasks.renderTasks(navigator.getActiveItem().filter);
});

() => {
  console.log(dialog);
};

export default { openDialog };
