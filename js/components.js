/** Accessible navigation and active section tracking. */
export class NavigationManager {
  constructor() {
    this.header = document.querySelector(".site-header");
    this.menu = document.querySelector("#site-navigation");
    this.toggle = document.querySelector("#mobile-menu-button");
    this.links = [...this.menu.querySelectorAll("a")];
    this.mobile = matchMedia("(max-width: 760px)");
    this.toggle.hidden = !this.mobile.matches;
    this.toggle.addEventListener("click", () =>
      this.setOpen(this.toggle.getAttribute("aria-expanded") !== "true"),
    );
    this.menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) this.setOpen(false);
    });
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        this.toggle.getAttribute("aria-expanded") === "true"
      ) {
        this.setOpen(false);
        this.toggle.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) this.setOpen(false);
    });
    this.mobile.addEventListener("change", () => {
      this.toggle.hidden = !this.mobile.matches;
      this.setOpen(false);
    });
    const sections = [...document.querySelectorAll("main section[id]")];
    let scheduled = false;
    const update = () => {
      scheduled = false;
      this.header.classList.toggle("is-scrolled", window.scrollY > 24);
      let active = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 150) active = section;
      }
      for (const link of this.links) {
        const current = link.hash === `#${active.id}`;
        link.classList.toggle("active", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!scheduled) {
          scheduled = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true },
    );
    update();
  }
  setOpen(open) {
    this.toggle.setAttribute("aria-expanded", String(open));
    this.menu.classList.toggle("is-open", open);
    this.toggle.querySelector(".menu-label").textContent = open ? "Close" : "Index";
  }
}
