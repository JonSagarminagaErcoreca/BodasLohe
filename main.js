const menuModel = [
  { type: "link", id: "home", label: "HOME", href: "index.html" },
  {
    type: "group",
    id: "maquillaje",
    label: "MAQUILLAJE",
    children: [
      { id: "maquillaje-novias", label: "Maquillaje para novias", href: "maquillaje-novias.html" },
      { id: "maquillaje-moda-tv", label: "Maquillaje profesional para moda y TV", href: "maquillaje-moda-tv.html" },
      { id: "maquillaje-eventos", label: "Maquillaje para eventos", href: "maquillaje-eventos.html" },
      { id: "belly-painting", label: "Belly painting", href: "belly-painting.html" }
    ]
  },
  {
    type: "group",
    id: "micropigmentacion",
    label: "MICROPIGMENTACION",
    children: [
      { id: "micropigmentacion-cejas", label: "Cejas", href: "micropigmentacion-cejas.html" },
      { id: "micropigmentacion-ojos", label: "Ojos", href: "micropigmentacion-ojos.html" },
      { id: "micropigmentacion-labios", label: "Labios", href: "micropigmentacion-labios.html" },
      {
        id: "micropigmentacion-areolas-cicatrices",
        label: "Areolas y cicatrices",
        href: "micropigmentacion-areolas-cicatrices.html"
      },
      {
        id: "micropigmentacion-paramedica-oncologica",
        label: "Paramedica y oncologica",
        href: "micropigmentacion-paramedica-oncologica.html"
      },
      {
        id: "micropigmentacion-eliminacion-tatuajes",
        label: "Eliminacion de tatuajes",
        href: "micropigmentacion-eliminacion-tatuajes.html"
      }
    ]
  },
  { type: "link", id: "cursos-formacion", label: "CURSOS Y FORMACION", href: "cursos-formacion.html" },
  { type: "link", id: "sobre-lohe", label: "SOBRE LOHE", href: "sobre-lohe.html" },
  { type: "link", id: "contacto", label: "CONTACTO", href: "contacto.html" }
];

const pageToGroup = {
  "maquillaje-novias": "maquillaje",
  "maquillaje-moda-tv": "maquillaje",
  "maquillaje-eventos": "maquillaje",
  "belly-painting": "maquillaje",
  "micropigmentacion-cejas": "micropigmentacion",
  "micropigmentacion-ojos": "micropigmentacion",
  "micropigmentacion-labios": "micropigmentacion",
  "micropigmentacion-areolas-cicatrices": "micropigmentacion",
  "micropigmentacion-paramedica-oncologica": "micropigmentacion",
  "micropigmentacion-eliminacion-tatuajes": "micropigmentacion"
};

const currentPage = document.body.dataset.page || "";
const activeGroup = pageToGroup[currentPage] || "";

const renderMenu = () =>
  menuModel
    .map((item) => {
      if (item.type === "link") {
        const isActive = currentPage === item.id;
        return `
          <li class="nav-item">
            <a class="nav-link ${isActive ? "is-active" : ""}" href="${item.href}" ${isActive ? 'aria-current="page"' : ""}>
              ${item.label}
            </a>
          </li>
        `;
      }

      const isGroupActive = activeGroup === item.id;
      const submenuId = `submenu-${item.id}`;
      const children = item.children
        .map((child) => {
          const isChildActive = currentPage === child.id;
          return `
            <li>
              <a class="submenu-link ${isChildActive ? "is-active" : ""}" href="${child.href}" ${
                isChildActive ? 'aria-current="page"' : ""
              }>
                ${child.label}
              </a>
            </li>
          `;
        })
        .join("");

      return `
        <li class="nav-item nav-item--group ${isGroupActive ? "is-open" : ""}" data-group="${item.id}">
          <button
            type="button"
            class="nav-link nav-link--button ${isGroupActive ? "is-active" : ""}"
            data-submenu-toggle
            aria-expanded="${isGroupActive ? "true" : "false"}"
            aria-controls="${submenuId}"
          >
            ${item.label}
          </button>
          <ul class="submenu" id="${submenuId}">
            ${children}
          </ul>
        </li>
      `;
    })
    .join("");

const headerMarkup = `
  <div class="container topbar">
    <a class="brand" href="index.html" aria-label="LOHE Estudio">
      <img src="assets/img/LoheAssets/LE_Logotipo_charcoal.svg" alt="LOHE Estudio" width="250" height="56" />
    </a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="Abrir menu">
      <span class="nav-toggle-icon"></span>
    </button>
    <nav class="site-nav" data-nav>
      <ul class="nav-list">
        ${renderMenu()}
      </ul>
      <a class="nav-cta" href="contacto.html">Reservar valoracion</a>
    </nav>
  </div>
`;

const footerMarkup = `
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/img/LoheAssets/LE_Logotipo_milk.svg" alt="LOHE Estudio" width="250" height="56" />
        <p>
          Estudio premium en Getxo orientado al cuidado real: tecnica, calma y resultados naturales.
        </p>
      </div>
      <div>
        <p class="footer-title">Servicios</p>
        <ul class="footer-links">
          <li><a href="maquillaje-novias.html">Maquillaje</a></li>
          <li><a href="micropigmentacion-cejas.html">Micropigmentacion</a></li>
          <li><a href="cursos-formacion.html">Cursos y formacion</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-title">Contacto</p>
        <ul class="footer-links">
          <li><a href="tel:+34635943587">+34 635 94 35 87</a></li>
          <li><a href="mailto:info@loheestudio.com">info@loheestudio.com</a></li>
          <li><a href="contacto.html">Pedir cita</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-bottom">LOHE Estudio · <span data-year></span> · Getxo</p>
  </div>
`;

const headerRoot = document.querySelector("[data-site-header]");
if (headerRoot) {
  headerRoot.innerHTML = headerMarkup;
}

const footerRoot = document.querySelector("[data-site-footer]");
if (footerRoot) {
  footerRoot.innerHTML = footerMarkup;
}

const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const groupNodes = [...document.querySelectorAll(".nav-item--group")];
const isMobile = () => window.matchMedia("(max-width: 920px)").matches;

const closeGroups = ({ except } = {}) => {
  groupNodes.forEach((group) => {
    if (except && group === except) {
      return;
    }
    group.classList.remove("is-open");
    const trigger = group.querySelector("[data-submenu-toggle]");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
};

const closeMenu = () => {
  if (!nav || !navToggle) {
    return;
  }
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};

const toggleGroup = (group) => {
  const trigger = group.querySelector("[data-submenu-toggle]");
  if (!trigger) {
    return;
  }

  const open = !group.classList.contains("is-open");
  closeGroups({ except: open ? group : null });

  group.classList.toggle("is-open", open);
  trigger.setAttribute("aria-expanded", open ? "true" : "false");
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  });
}

document.querySelectorAll("[data-submenu-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = toggle.closest(".nav-item--group");
    if (!parent) {
      return;
    }
    toggleGroup(parent);
  });
});

document.querySelectorAll(".nav-list a, .nav-cta").forEach((link) => {
  link.addEventListener("click", () => {
    if (isMobile()) {
      closeMenu();
      closeGroups();
    }
  });
});

window.addEventListener("resize", () => {
  if (!isMobile()) {
    closeMenu();
  }
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (!target.closest(".nav-item--group")) {
    closeGroups();
  }

  if (isMobile()) {
    return;
  }

  if (!target.closest("[data-nav]") && !target.closest("[data-nav-toggle]")) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }
  closeGroups();
  closeMenu();
});

document.querySelectorAll("[data-year]").forEach((yearNode) => {
  yearNode.textContent = String(new Date().getFullYear());
});

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}
