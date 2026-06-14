(function () {
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-theme-toggle]"));

  function syncButtons() {
    const light = root.classList.contains("light");
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(light));
      button.title = light ? "Use dark theme" : "Use light theme";
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("light");
      syncButtons();
    });
  });

  syncButtons();
})();
