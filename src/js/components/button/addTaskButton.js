import addIcon from "!!raw-loader!../../../assets/icons/plus-circle.svg";

export default function createAddTaskButton(classList, onClick = null) {
  const btn = document.createElement("button");

  btn.classList = `btn btn-add-task ${classList}`;
  btn.innerHTML = addIcon + "Add task";
  if (onClick) btn.addEventListener("click", onClick);

  return btn;
}
