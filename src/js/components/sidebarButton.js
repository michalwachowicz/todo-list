import visibility from "../utils/visibility";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";

let sidebarBtn;
const sidebar = document.querySelector(".sidebar");

const createSidebarBtn = (onClick) => createIconButton(sidebarIcon, onClick);
const setSidebarBtn = (btn) => (sidebarBtn = btn);

const showSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.show(sidebar);
    if (sidebarBtn) visibility.hide(sidebarBtn);
  });

const hideSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.hide(sidebar);
    if (sidebarBtn) visibility.show(sidebarBtn);
  });

export { showSidebarBtn, hideSidebarBtn, setSidebarBtn };
