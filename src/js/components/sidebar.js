import theme from "../utils/theme";
import navigator from "../utils/navigator";
import createIconButton from "./button/iconButton";
import createAddTaskButton from "./button/addTaskButton";

import { hideSidebarBtn } from "./button/sidebarButton";

import addProjectIcon from "!!raw-loader!../../assets/icons/plus.svg";

const createSidebarButton = (navItem, classList, onClick = null) => {
  const { name, dataName, icon, active } = navItem;
  const btn = document.createElement("button");

  btn.type = "button";
  btn.classList = `btn btn-sidebar ${active ? "active" : ""} ${
    classList || ""
  }`;
  btn.innerHTML = icon + name;
  btn.dataset.name = dataName;

  if (onClick) btn.addEventListener("click", onClick);

  return btn;
};

const createNavListItem = (child) => {
  const li = document.createElement("li");

  li.classList = "sidebar-nav-list-item";
  li.appendChild(child);

  return li;
};

export default function createSidebar() {
  const themeBtn = createIconButton(theme.getCurrentThemeIcon(), (e) => {
    theme.switchTheme();
    theme.setThemeDOM(e.target);
  });
  const sidebarBtn = hideSidebarBtn();

  const sidebarHeader = document.querySelector(".sidebar-header");
  sidebarHeader.append(themeBtn, sidebarBtn);

  const sidebarMainNav = document.querySelector(".sidebar-nav-list-main");
  sidebarMainNav.appendChild(
    createNavListItem(createAddTaskButton("btn-sidebar btn-sidebar-l"))
  );

  navigator.mainNav.forEach((element) => {
    const btn = createSidebarButton(element, "btn-sidebar-l", () => {
      navigator.activate(element);
    });

    sidebarMainNav.appendChild(createNavListItem(btn));
  });

  const addProjectBtn = createIconButton(addProjectIcon);
  const projectsHeader = document.querySelector(".sidebar-projects-header");

  projectsHeader.appendChild(addProjectBtn);
}
