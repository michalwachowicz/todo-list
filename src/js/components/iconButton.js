export default function createIconButton(svgFile, onClick = null) {
  const btn = document.createElement("button");

  btn.classList = "btn btn-icon";
  btn.type = "button";
  btn.innerHTML = svgFile;

  if (onClick) {
    btn.addEventListener("click", onClick);
  }

  return btn;
}
