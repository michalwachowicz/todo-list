import theme from "../utils/theme";
import visibility from "../utils/visibility";
import createIconButton from "./iconButton";
import createSidebarButton from "./sidebarButton";

import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";
import addIcon from "!!raw-loader!../../assets/icons/plus-circle.svg";
import inboxIcon from "!!raw-loader!../../assets/icons/inbox.svg";
import starIcon from "!!raw-loader!../../assets/icons/star.svg";
import calendarIcon from "!!raw-loader!../../assets/icons/calendar.svg";

const mainNav = [
  { name: "Add task", icon: addIcon, active: false },
  { name: "All tasks", icon: inboxIcon, active: false },
  { name: "Today", icon: starIcon, active: false },
  { name: "Upcoming", icon: calendarIcon, active: false },
];

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
  mainNav.forEach((element) => {
    const li = document.createElement("li");

    li.classList = "sidebar-nav-list-item";
    li.appendChild(
      createSidebarButton(element.icon, element.name, element.active)
    );

    sidebarMainNav.appendChild(li);
  });
}
