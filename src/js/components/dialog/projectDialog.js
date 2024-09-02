import projects from "../../store/projects";
import tasks from "../../store/tasks";
import navigator from "../../utils/navigator";
import visibility from "../../utils/visibility";
import ColorPicker from "../picker/colorPicker";
import Dialog from "./dialog";

class ProjectDialog extends Dialog {
  constructor() {
    super(".dialog-add-project", ".form-add-project");

    this.projectName = this.form.querySelector(".form-input-title");
    this.error = this.form.querySelector(".form-error");

    this.colorPicker = new ColorPicker(".form-add-project");
  }

  open(object) {
    super.open(object);

    this.submitBtn.textContent = this.current ? "Edit project" : "Add project";
    this.projectName.value = (this.current && this.current.name) || "";

    this.colorPicker.updateColor(this.current);

    this.projectName.addEventListener("input", (e) => {
      const text = e.target.value;

      const isCurrentName =
        this.current && text.toLowerCase() == this.current.name.toLowerCase();

      if (!navigator.exists(text) || isCurrentName) {
        visibility.hide(this.error);
        this.submitBtn.disabled = false;
      } else {
        this.error.textContent = "A project with this name already exists";
        visibility.show(this.error);
        this.submitBtn.disabled = true;
      }
    });
  }

  close() {
    super.close();
    this.colorPicker.close();
  }

  onSubmit(e) {
    e.preventDefault();

    let id;
    let project = projects.createProject(
      this.projectName.value,
      this.colorPicker.getInput().value
    );

    if (this.current && this.current.id !== -1) {
      id = this.current.id;
      project = { ...project, id };

      projects.getProjects().update(id, project);
      projects.renderProjects(
        document.querySelector(".sidebar-nav-list-projects")
      );

      tasks.renderTasks((task) => task.projectId == project.id);
    } else {
      projects.getProjects().add(project);
      projects.renderProjects(
        document.querySelector(".sidebar-nav-list-projects")
      );

      id = projects.getProjects().getCurrentId();
    }

    navigator.activate(project);
    navigator.updateNavigationDOM();

    tasks.renderTasks((task) => task.projectId == id);
    this.close();
  }
}

export default new ProjectDialog();
