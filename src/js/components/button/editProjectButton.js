import settingsIcon from "!!raw-loader!../../../assets/icons/settings.svg";
import projects from "../../store/projects";
import visibility from "../../utils/visibility";
import addEditProjectDialog from "../dialog/addEditProjectDialog";

const btn = document.querySelector(".btn-project-edit");

(function addIcon() {
  btn.innerHTML = settingsIcon;
})();

const showButton = (id) => {
  btn.dataset.id = id;
  visibility.show(btn);
};

const hideButton = () => {
  visibility.hide(btn);
};

btn.addEventListener("click", () => {
  const id = btn.dataset.id;

  addEditProjectDialog.openDialog(
    projects
      .getProjects()
      .getList()
      .find((project) => project.id == id)
  );
});

export default { showButton, hideButton };