import visibility from "../utils/visibility";
import createAddTaskButton from "./button/addTaskButton";
import { showSidebarBtn, setSidebarBtn } from "./button/sidebarButton";

const addSidebarIcon = () => {
  const header = document.querySelector(".main-header");
  const sidebarBtn = showSidebarBtn();

  header.appendChild(sidebarBtn);
  setSidebarBtn(sidebarBtn);
};

const addNewTaskButton = (onClick = null) => {
  const content = document.querySelector(".main-content");
  content.appendChild(createAddTaskButton("btn-add-task-l", onClick));
};

export default function createMainSection() {
  addSidebarIcon();
  addNewTaskButton();
}
