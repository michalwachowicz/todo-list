import Store from "./store";

const createProject = (name, color) => {
  return { name, color, dataName: name.replace(" ", "_").toLowerCase() };
};

const projects = new Store("projects");
const getProjects = () => projects;

export default { createProject, getProjects };
