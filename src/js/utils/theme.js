import lightIcon from "!!raw-loader!../../assets/icons/light.svg";
import darkIcon from "!!raw-loader!../../assets/icons/dark.svg";

let currentTheme = "light";
const themeIcons = {
  light: lightIcon,
  dark: darkIcon,
};

const getCurrentThemeIcon = () => themeIcons[currentTheme];

const setThemeDOM = (themeBtn) => {
  themeBtn.innerHTML = getCurrentThemeIcon();
  document.body.classList = `theme-${currentTheme}`;
};

const switchTheme = () => {
  currentTheme = currentTheme == "light" ? "dark" : "light";
};

export default { getCurrentThemeIcon, switchTheme, setThemeDOM };