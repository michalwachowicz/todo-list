import settingsIcon from "!!raw-loader!../../../assets/icons/settings.svg";
import projects from "../../store/projects";
import addProjectDialog from "../dialog/addProjectDialog";

const btn = document.querySelector(".btn-project-edit");

(function addIcon() {
  btn.innerHTML = settingsIcon;
})();

const showButton = (id) => {
  btn.dataset.id = id;
  btn.classList.remove("hidden");
};

const hideButton = () => {
  btn.classList.add("hidden");
};

btn.addEventListener("click", () => {
  const id = btn.dataset.id;

  addProjectDialog.openDialog(
    projects
      .getProjects()
      .getList()
      .find((project) => project.id == id)
  );
});

export default { showButton, hideButton };
