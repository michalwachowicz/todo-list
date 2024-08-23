import createIconButton from "./iconButton";

import lightIcon from "!!raw-loader!../../assets/icons/light.svg";
import darkIcon from "!!raw-loader!../../assets/icons/dark.svg";
import sidebarIcon from "!!raw-loader!../../assets/icons/sidebar.svg";

export default function createSidebar() {
  const themeBtn = createIconButton(lightIcon);
  const sidebarBtn = createIconButton(sidebarIcon);

  const sidebarHeader = document.querySelector(".sidebar-header");
  sidebarHeader.append(themeBtn, sidebarBtn);
}
