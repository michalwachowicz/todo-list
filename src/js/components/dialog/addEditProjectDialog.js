import projects from "../../store/projects";
import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";
import ColorPicker from "../colorPicker";
import { COLORS } from "../colorPicker";

const dialog = document.querySelector("dialog#add-project-dialog");
const form = document.querySelector("form#add-project-form");

const cancelBtn = form.querySelector("button.btn-cancel");
const submitBtn = form.querySelector('button[type="submit"]');

const projectName = form.querySelector("#project-name");
const error = form.querySelector(".form-error");

const colorPicker = new ColorPicker(
  'label[for="color"]',
  ".form-color-popup",
  "#color"
);

let currentProject = null;

const openDialog = (project = null) => {
  currentProject = project;

  const currentColor = (currentProject && currentProject.color) || COLORS[0];

  colorPicker.getButton().style.backgroundColor = currentColor;
  colorPicker.getInput().value = currentColor;

  submitBtn.textContent = currentProject ? "Edit project" : "Add project";
  projectName.value = (currentProject && currentProject.name) || "";

  dialog.showModal();
};

const closeDialog = () => {
  colorPicker.close();
  dialog.close();
};

cancelBtn.addEventListener("click", closeDialog);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let project = projects.createProject(
    projectName.value,
    colorPicker.getInput().value
  );

  if (currentProject && currentProject.id !== -1) {
    project = { ...project, id: currentProject.id };

    projects.getProjects().update(currentProject.id, project);
    projects.renderProjects(
      document.querySelector(".sidebar-nav-list-projects")
    );

    navigator.activate(project);
    navigator.updateNavigationDOM();
  } else {
    projects.getProjects().add(project);
    projects.renderProjects(
      document.querySelector(".sidebar-nav-list-projects")
    );
  }

  tasks.renderTasks(
    document.querySelector(".task-list"),
    navigator.getActiveItem().filter
  );

  closeDialog();
});

projectName.addEventListener("input", (e) => {
  const text = e.target.value;

  const isCurrentName =
    currentProject && text.toLowerCase() == currentProject.name.toLowerCase();

  if (!navigator.exists(text) || isCurrentName) {
    error.classList.add("hidden");
    submitBtn.disabled = false;
  } else {
    error.textContent = "A project with this name already exists";
    error.classList.remove("hidden");
    submitBtn.disabled = true;
  }
});

export default { openDialog };
