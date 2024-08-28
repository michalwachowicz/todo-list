import projectIcon from "!!raw-loader!../../../assets/icons/project.svg";
import projects from "../../store/projects";
import Select from "./select";

export default class ProjectSelect extends Select {
  constructor(parent, button, popup, input) {
    super(parent, button, popup, input, [], (e) => this.#onClick(e));

    this.setCurrentProject(null);
    this.updateList();
  }

  updateList() {
    this.setList(this.getProjectsList());
  }

  setCurrentProject(project) {
    if (project) {
      const color = document.createElement("div");
      color.classList = "project-color project-color-s";
      color.style.backgroundColor = project.color;

      this.getButton().innerHTML = "";
      this.getButton().appendChild(color);
      this.getButton().innerHTML += project.name;

      this.getInput().value = project.id;
    } else {
      this.getInput().value = -1;
      this.getButton().innerHTML = projectIcon + "Project";
    }
  }

  getProjectsList() {
    return [
      ...projects.getProjects().getList(),
      { id: -1, name: "No project", icon: projectIcon },
    ];
  }

  #onClick(e) {
    const btn = e.target;
    const id = btn.dataset.id;
    const project = projects.find((p) => p.id == id);

    this.setCurrentProject(project);
  }
}
