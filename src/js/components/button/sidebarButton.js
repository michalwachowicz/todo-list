import visibility from "../../utils/visibility";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../../assets/icons/sidebar.svg";

let sidebarBtn;

const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".sidebar-container");
const background = document.querySelector(".sidebar-bg");

const createSidebarBtn = (onClick) =>
  createIconButton(sidebarIcon, "Sidebar", onClick);
const setSidebarBtn = (btn) => (sidebarBtn = btn);

const showSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.show(background);
    visibility.show(sidebar);

    if (sidebarBtn) visibility.hide(sidebarBtn);

    setTimeout(() => {
      sidebar.style.transform = "translateX(0)";
      setTimeout(() => {
        container.style.position = "static";
      }, 150);
    }, 0);
  });

const hideSidebarBtn = () =>
  createSidebarBtn(() => {
    visibility.hide(background);
    container.style.position = "fixed";
    sidebar.style.transform = "translateX(-100%)";

    setTimeout(() => {
      visibility.hide(sidebar);
      if (sidebarBtn) visibility.show(sidebarBtn);
    }, 300);
  });

export { showSidebarBtn, hideSidebarBtn, setSidebarBtn };
