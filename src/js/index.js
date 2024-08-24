import "../scss/index.scss";
import createMainSection from "./components/main";
import createSidebar from "./components/sidebar";
import navigator from "./utils/navigator";

createSidebar();
createMainSection();
navigator.updateNavigationDOM("btn-sidebar", "main-title");
