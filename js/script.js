document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll("[data-nav-toggle]");
  const mainScroll = document.querySelector(".main-scroll");

  navButtons.forEach(function (button) {
    const navId = button.getAttribute("aria-controls");
    const nav = document.getElementById(navId);
    if (!nav) return;

    button.addEventListener("click", function () {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      closeAllNavs();

      requestAnimationFrame(function () {
        if (shouldUseMainScroll(mainScroll)) {
          mainScroll.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        } else {
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  });

  function shouldUseMainScroll(scrollElement) {
    if (!scrollElement) return false;

    const styles = window.getComputedStyle(scrollElement);
    const canScroll =
      styles.overflowY === "auto" ||
      styles.overflowY === "scroll" ||
      styles.overflowY === "overlay";

    return canScroll && scrollElement.scrollHeight > scrollElement.clientHeight;
  }

  function closeAllNavs() {
    document.querySelectorAll(".global-nav.is-open").forEach(function (nav) {
      nav.classList.remove("is-open");
    });

    document.querySelectorAll("[data-nav-toggle]").forEach(function (button) {
      button.setAttribute("aria-expanded", "false");
    });
  }
});
