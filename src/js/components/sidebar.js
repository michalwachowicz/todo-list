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

const addHeaderIcons = () => {
  const themeBtn = createIconButton(theme.getCurrentThemeIcon(), (e) => {
    theme.switchTheme();
    theme.setThemeDOM(e.target);
  });
  const sidebarBtn = hideSidebarBtn();

  const header = document.querySelector(".sidebar-header");
  header.append(themeBtn, sidebarBtn);
};

const addMainNavButtons = () => {
  const nav = document.querySelector(".sidebar-nav-list-main");
  nav.appendChild(
    createNavListItem(createAddTaskButton("btn-sidebar btn-sidebar-l"))
  );

  navigator.mainNav.forEach((element) => {
    const btn = createSidebarButton(element, "btn-sidebar-l", () => {
      navigator.activate(element);
    });

    nav.appendChild(createNavListItem(btn));
  });
};

const addProjectSection = () => {
  const btn = createIconButton(addProjectIcon);
  const header = document.querySelector(".sidebar-projects-header");

  header.appendChild(btn);
};

export default function createSidebar() {
  addHeaderIcons();
  addMainNavButtons();
  addProjectSection();
}
