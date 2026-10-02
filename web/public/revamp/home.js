(function () {
  function boot() {
  var header = document.getElementById("site-header");
  var hero = document.getElementById("home-hero");
  var menuBtn = document.getElementById("menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  var overHero = true;
  var mobileOpen = false;

  function syncHeader() {
    if (!header) {
      return;
    }
    var onHero = overHero && !mobileOpen;
    header.classList.toggle("is-solid", !onHero);
  }
  var planBtn = document.getElementById("plan-btn");
  var planMenu = document.getElementById("plan-menu");
  var planLabel = document.getElementById("plan-label");
  var planInput = document.getElementById("plan-input");
  var video = document.querySelector(".hero video");

  if (hero && header) {
    var observer = new IntersectionObserver(
      function (entries) {
        overHero = entries[0].isIntersecting;
        syncHeader();
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );
    observer.observe(hero);
  }

  function setMenu(open) {
    mobileOpen = open;
    mobileNav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    syncHeader();
  }

  if (menuBtn && mobileNav && header) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setMenu(!mobileOpen);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
    document.addEventListener("click", function (event) {
      if (!mobileOpen) {
        return;
      }
      if (mobileNav.contains(event.target) || menuBtn.contains(event.target)) {
        return;
      }
      setMenu(false);
    });
  }

  var searchForm = document.getElementById("property-search");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }

  if (planBtn && planMenu) {
    planBtn.addEventListener("click", function () {
      var open = planMenu.classList.toggle("is-open");
      planBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    planMenu.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-plan");
        planLabel.textContent = value;
        planInput.value = value;
        planMenu.classList.remove("is-open");
        planBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function bindScroll(rowId, leftId, rightId, amount) {
    var row = document.getElementById(rowId);
    var left = document.getElementById(leftId);
    var right = document.getElementById(rightId);
    if (!row) {
      return;
    }
    if (left) {
      left.addEventListener("click", function () {
        row.scrollBy({ left: -amount, behavior: "smooth" });
      });
    }
    if (right) {
      right.addEventListener("click", function () {
        row.scrollBy({ left: amount, behavior: "smooth" });
      });
    }
  }

  bindScroll("listings-row", "listings-left", "listings-right", 456);
  bindScroll("areas-row", "areas-left-btn", "areas-right-btn", 580);

  document.querySelectorAll(".area-card").forEach(function (card) {
    var id = card.getAttribute("data-area");
    card.addEventListener("mouseenter", function () {
      document.querySelectorAll(".map-pin").forEach(function (pin) {
        pin.classList.toggle("is-on", pin.getAttribute("data-area") === id);
      });
    });
    card.addEventListener("mouseleave", function () {
      document.querySelectorAll(".map-pin").forEach(function (pin) {
        pin.classList.remove("is-on");
      });
    });
  });

  if (video) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
    } else {
      video.play().catch(function () {});
    }
  }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
