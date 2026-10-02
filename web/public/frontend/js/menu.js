(function () {
  function boot() {
    var button = document.querySelector(".ic.menu");
    var nav = document.querySelector(".header-section .main-nav");
    if (!button || !nav) {
      return;
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var open = document.body.classList.toggle("nav-open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (event) {
      if (!document.body.classList.contains("nav-open")) {
        return;
      }
      if (nav.contains(event.target) || button.contains(event.target)) {
        return;
      }
      document.body.classList.remove("nav-open");
      button.setAttribute("aria-expanded", "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        button.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
