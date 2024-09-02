import addIcon from "!!raw-loader!../../../assets/icons/plus-circle.svg";
import addEditDialog from "../dialog/addEditDialog";

export default function createAddTaskButton(classList) {
  const btn = document.createElement("button");

  btn.classList = `btn btn-add-task ${classList}`;
  btn.innerHTML = addIcon + "Add task";
  btn.addEventListener("click", () => addEditDialog.open(null));

  return btn;
}
