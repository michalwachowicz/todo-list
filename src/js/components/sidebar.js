import theme from "../utils/theme";
import visibility from "../utils/visibility";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";
import addIcon from "!!raw-loader!../../assets/icons/plus-circle.svg";
import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";
import addProjectIcon from "!!raw-loader!../../assets/icons/plus.svg";

const addTask = { name: "Add task", icon: addIcon, active: false };
const mainNav = [
  { name: "All tasks", icon: inboxIcon, active: false },
  { name: "Today", icon: starIcon, active: false },
  { name: "Upcoming", icon: calendarIcon, active: false },
];

const createSidebarButton = (navItem, classList, onClick = null) => {
  const { name, icon, active } = navItem;
  const btn = document.createElement("button");

  btn.type = "button";
  btn.classList = `btn btn-sidebar ${active ? "active" : ""} ${
    classList || ""
  }`;
  btn.innerHTML = icon + name;

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
  const sidebar = document.querySelector(".sidebar");

  const themeBtn = createIconButton(theme.getCurrentThemeIcon(), (e) => {
    theme.switchTheme();
    theme.setThemeDOM(e.target);
  });
  const sidebarBtn = createIconButton(sidebarIcon, () => {
    visibility.hide(sidebar);
  });

  const sidebarHeader = document.querySelector(".sidebar-header");
  sidebarHeader.append(themeBtn, sidebarBtn);

  const sidebarMainNav = document.querySelector(".sidebar-nav-list-main");
  sidebarMainNav.appendChild(
    createNavListItem(
      createSidebarButton(addTask, "btn-sidebar-l btn-add-task")
    )
  );

  mainNav.forEach((element) => {
    const btn = createSidebarButton(element, "btn-sidebar-l");
    sidebarMainNav.appendChild(createNavListItem(btn));
  });

  const addProjectBtn = createIconButton(addProjectIcon);
  const projectsHeader = document.querySelector(".sidebar-projects-header");

  projectsHeader.appendChild(addProjectBtn);
}
