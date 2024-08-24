import visibility from "../utils/visibility";
import { showSidebarBtn, setSidebarBtn } from "./sidebarButton";

export default function createMainSection() {
  const header = document.querySelector(".main-header");
  const sidebarBtn = showSidebarBtn();

  visibility.hide(sidebarBtn);
  header.appendChild(sidebarBtn);

  setSidebarBtn(sidebarBtn);
}
