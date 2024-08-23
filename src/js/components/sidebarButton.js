export default function createSidebarButton(
  icon,
  text,
  active,
  onClick = null
) {
  const btn = document.createElement("button");

  btn.type = "button";
  btn.classList = `btn btn-sidebar ${active ? "active" : ""}`;
  btn.innerHTML = icon + text;
  if (onClick) btn.addEventListener("click", onClick);

  return btn;
}
