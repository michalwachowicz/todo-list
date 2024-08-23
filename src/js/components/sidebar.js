import theme from "../theme";
import visibility from "../visibility";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";

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
}
