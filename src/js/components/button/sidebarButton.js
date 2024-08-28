import visibility from "../../utils/visibility";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../../assets/icons/sidebar.svg";

let sidebarBtn;

const sidebar = document.querySelector(".sidebar");
const background = document.querySelector(".sidebar-bg");

const createSidebarBtn = (onClick) => createIconButton(sidebarIcon, onClick);
const setSidebarBtn = (btn) => (sidebarBtn = btn);

const showSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.show(sidebar);
    visibility.show(background);

    if (sidebarBtn) visibility.hide(sidebarBtn);
  });

const hideSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.hide(sidebar);
    visibility.hide(background);

    if (sidebarBtn) visibility.show(sidebarBtn);
  });

export { showSidebarBtn, hideSidebarBtn, setSidebarBtn };
