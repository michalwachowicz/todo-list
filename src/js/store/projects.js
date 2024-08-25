import Store from "./store";

const createProject = (name, color) => {
  return { name, color, dataName: name.replace(" ", "_").toLowerCase() };
};

const projects = new Store("projects");
const getProjects = () => projects;

const renderProjects = (container) => {
  container.innerHTML = "";

  projects.getList().forEach((project) => {
    const li = document.createElement("li");
    li.classList = "sidebar-nav-list-item";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList = "btn btn-sidebar btn-sidebar-s btn-project";

    const color = document.createElement("div");
    color.classList = "btn-project-color";
    color.style.backgroundColor = project.color;

    btn.appendChild(color);
    btn.innerHTML += project.name;

    li.appendChild(btn);
    container.appendChild(li);
  });
};

export default { createProject, getProjects, renderProjects };
