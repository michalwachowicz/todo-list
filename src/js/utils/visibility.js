const hide = (element) => {
  element.classList.add("hidden");
};

const show = (element) => {
  element.classList.remvoe("hidden");
};

export default { hide, show };
