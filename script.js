const menuToggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
const navLinks = Array.from(document.querySelectorAll("#menu a"));
const revealItems = document.querySelectorAll(".reveal");
const sections = Array.from(document.querySelectorAll("section[id]"));
const projectsToggle = document.getElementById("projects-toggle");
const projectsPanel = document.getElementById("projects-panel");
const projectsBox = document.querySelector(".projects-box");

const closeMenu = () => {
  menu.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const openMenu = () => {
  menu.classList.add("is-open");
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
};

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.contains("is-open");
  if (isOpen) {
    closeMenu();
    return;
  }

  openMenu();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const setActiveLink = () => {
  const currentSection = sections.findLast((section) => {
    const offset = section.offsetTop - 180;
    return window.scrollY >= offset;
  });

  const currentId = currentSection ? currentSection.id : "home";

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  revealObserver.observe(item);
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

if (projectsToggle && projectsPanel && projectsBox) {
  projectsToggle.addEventListener("click", () => {
    const isOpen = projectsToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      projectsToggle.setAttribute("aria-expanded", "false");
      projectsPanel.style.maxHeight = "0px";
      projectsBox.classList.remove("is-open");
      window.setTimeout(() => {
        if (projectsToggle.getAttribute("aria-expanded") === "false") {
          projectsPanel.hidden = true;
        }
      }, 350);
      return;
    }

    projectsPanel.hidden = false;
    projectsToggle.setAttribute("aria-expanded", "true");
    projectsBox.classList.add("is-open");
    projectsPanel.style.maxHeight = `${projectsPanel.scrollHeight}px`;
  });
}
