import theme from "../theme";
import createIconButton from "./iconButton";

import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";

export default function createSidebar() {
  const themeBtn = createIconButton(theme.getCurrentThemeIcon(), (e) => {
    theme.switchTheme();
    theme.setThemeDOM(e.target);
  });
  const sidebarBtn = createIconButton(sidebarIcon);

  const sidebarHeader = document.querySelector(".sidebar-header");
  sidebarHeader.append(themeBtn, sidebarBtn);
}
