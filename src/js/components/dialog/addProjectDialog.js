import projects from "../../store/projects";
import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";

const dialog = document.querySelector("dialog#add-project-dialog");
const form = document.querySelector("form#add-project-form");

const colorPicker = form.querySelector('label[for="color"]');
const colorPickerInput = form.querySelector("#color");
const colorPickerPopup = form.querySelector(".form-color-popup");

const cancelBtn = form.querySelector("button.btn-cancel");
const submitBtn = form.querySelector('button[type="submit"]');

const projectName = form.querySelector("#project-name");
const error = form.querySelector(".form-error");

let pickerOpen = false;
const colors = [
  "#dc2626",
  "#ea580c",
  "#d97706",
  "#ca8a04",
  "#65a30d",
  "#16a34a",
  "#059669",
  "#0d9488",
  "#0891b2",
  "#0284c7",
  "#2563eb",
  "#4f46e5",
];

const openDialog = () => {
  dialog.showModal();
};

const closeDialog = () => {
  closeColorPicker();
  dialog.close();
};

const openColorPicker = () => {
  pickerOpen = true;
  colorPickerPopup.classList.remove("hidden");
};

const closeColorPicker = () => {
  pickerOpen = false;
  colorPickerPopup.classList.add("hidden");
};

(function fillColors() {
  colors.forEach((color) => {
    const li = document.createElement("li");
    li.classList = "form-color-popup-item";

    const btn = document.createElement("button");
    btn.classList = "btn project-color project-color-m";
    btn.style.backgroundColor = color;
    btn.dataset.color = color;
    btn.type = "button";

    li.appendChild(btn);
    colorPickerPopup.appendChild(li);
  });

  const color = colors[0];
  colorPicker.style.backgroundColor = color;
  colorPickerInput.value = color;
})();

colorPicker.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  openColorPicker();
});

colorPickerPopup.addEventListener("click", (e) => {
  e.stopPropagation();

  const target = e.target;
  if (target.classList.contains("project-color")) {
    const color = target.dataset.color;

    colorPickerInput.value = color;
    colorPicker.style.backgroundColor = color;

    closeColorPicker();
  }
});

window.addEventListener("click", (e) => {
  if (
    pickerOpen &&
    !colorPicker.contains(e.target) &&
    !colorPickerPopup.contains(e.target)
  ) {
    closeColorPicker();
  }
});

cancelBtn.addEventListener("click", closeDialog);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const project = projects.createProject(
    projectName.value,
    colorPickerInput.value
  );

  projects.getProjects().add(project);
  projects.renderProjects(document.querySelector(".sidebar-nav-list-projects"));

  tasks.renderTasks(
    document.querySelector(".task-list"),
    navigator.getActiveItem().filter
  );

  closeDialog();
});

projectName.addEventListener("input", (e) => {
  const text = e.target.value;

  if (navigator.exists(text)) {
    error.textContent = "A project with this name already exists";
    error.classList.remove("hidden");
    submitBtn.disabled = true;
  } else {
    error.classList.add("hidden");
    submitBtn.disabled = false;
  }
});

export default { openDialog };
