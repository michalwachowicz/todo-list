import deleteIcon from "!!raw-loader!../../../assets/icons/delete.svg";
import deleteDialog from "../dialog/deleteDialog";

const btn = document.querySelector(".btn.btn-delete");

(function addIcon() {
  btn.innerHTML = deleteIcon;
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

  console.log(id);
  deleteDialog.openDialog({ type: "project", id });
});

export default { showButton, hideButton };
