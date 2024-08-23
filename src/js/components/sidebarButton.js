export default function createSidebarButton(
  icon,
  text,
  size,
  active,
  onClick = null
) {
  const btn = document.createElement("button");

  btn.type = "button";
  btn.classList = `btn btn-sidebar btn-sidebar-${size} ${
    active ? "active" : ""
  }`;
  btn.innerHTML = icon + text;
  if (onClick) btn.addEventListener("click", onClick);

  return btn;
}
