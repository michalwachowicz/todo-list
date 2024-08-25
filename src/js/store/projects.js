const createProject = (name, color) => {
  return { name, color, dataName: name.replace(" ", "_").toLowerCase() };
};

const projects = localStorage.projects ? JSON.parse(localStorage.projects) : [];
