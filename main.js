const menuModel = [
  {
      type: "group",
    id: "maquillaje",
    label: "MAQUILLAJE",
    children: [
      { id: "maquillaje-novias", label: "Maquillaje para novias", href: "maquilladora/boda/" },
      { id: "maquillaje-moda-tv", label: "Maquillaje profesional para moda y TV", href: "maquilladora/moda/" },
      { id: "maquillaje-eventos", label: "Maquillaje para eventos", href: "maquilladora/eventos/" },
      { id: "belly-painting", label: "Belly painting", href: "maquilladora/belly-painting/" }
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
        href: "tatuaje/eliminacion-de-tatuajes/"
      }
    ]
  },
  { type: "link", id: "cursos-formacion", label: "CURSOS Y FORMACION", href: "cursos/" },
  { type: "link", id: "sobre-lohe", label: "SOBRE LOHE", href: "lohe/" },
  { type: "link", id: "contacto", label: "CONTACTO", href: "contacto/" }
];

const pageToGroup = {
  "maquillaje-novias": "maquillaje",
  "maquillaje-moda-tv": "maquillaje",
  "maquillaje-eventos": "maquillaje",
  "belly-painting": "maquillaje",
  micropigmentacion: "micropigmentacion",
  "micropigmentacion-cejas": "micropigmentacion",
  "micropigmentacion-ojos": "micropigmentacion",
  "micropigmentacion-labios": "micropigmentacion",
  "micropigmentacion-areolas-cicatrices": "micropigmentacion",
  "micropigmentacion-paramedica-oncologica": "micropigmentacion",
  "micropigmentacion-eliminacion-tatuajes": "micropigmentacion"
};

const currentPage = document.body.dataset.page || "";
const activeGroup = pageToGroup[currentPage] || "";

if (currentPage === "micropigmentacion") {
  const microHashRoutes = {
    "#cejas": "micropigmentacion-cejas.html",
    "#ojos": "micropigmentacion-ojos.html",
    "#labios": "micropigmentacion-labios.html",
    "#areolas": "micropigmentacion-areolas-cicatrices.html",
    "#oncologica": "micropigmentacion-paramedica-oncologica.html"
  };
  const target = microHashRoutes[window.location.hash.toLowerCase()];
  if (target) {
    window.location.replace(new URL(target, document.baseURI).toString());
  }
}

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
        <li class="nav-item nav-item--group" data-group="${item.id}">
          <button
            type="button"
            class="nav-link nav-link--button ${isGroupActive ? "is-active" : ""}"
            data-submenu-toggle
            aria-expanded="false"
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
    <a class="brand" href="./" aria-label="LOHE Estudio">
      <img src="assets/img/LoheAssets/LE_Logotipo_charcoal.svg" alt="LOHE Estudio" width="250" height="56" />
    </a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="Abrir menu">
      <span class="nav-toggle-icon"></span>
    </button>
    <nav class="site-nav" data-nav>
      <ul class="nav-list">
        ${renderMenu()}
      </ul>
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
          <li><a href="maquilladora/boda/">Maquillaje</a></li>
          <li><a href="micropigmentacion/">Micropigmentacion</a></li>
          <li><a href="cursos/">Cursos y formacion</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-title">Contacto</p>
        <ul class="footer-links">
          <li><a href="tel:+34635943587">+34 635 94 35 87</a></li>
          <li><a href="mailto:info@loheestudio.com">info@loheestudio.com</a></li>
          <li><a href="contacto/">Pedir cita</a></li>
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

    if (!isMobile()) {
      closeGroups({ except: parent });
      parent.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      return;
    }

    toggleGroup(parent);
  });
});

groupNodes.forEach((group) => {
  group.addEventListener("mouseenter", () => {
    if (isMobile()) {
      return;
    }

    closeGroups({ except: group });
    group.classList.add("is-open");
    const trigger = group.querySelector("[data-submenu-toggle]");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

if (nav) {
  nav.addEventListener("mouseleave", () => {
    if (!isMobile()) {
      closeGroups();
    }
  });

  nav.addEventListener("mouseover", (event) => {
    if (isMobile()) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const overGroup = target.closest(".nav-item--group");
    if (!overGroup) {
      closeGroups();
    }
  });
}

document.querySelectorAll(".nav-list a").forEach((link) => {
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

const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const shapeBlurNodes = [...document.querySelectorAll("[data-shape-blur]")];

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const initShapeBlur = (node) => {
  const host = node.parentElement || node;
  const canvas = document.createElement("canvas");
  canvas.className = "shape-blur-canvas";
  node.appendChild(canvas);

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const variation = toNumber(node.dataset.variation, 0);
  const shapeSize = toNumber(node.dataset.shapeSize, 1);
  const roundness = toNumber(node.dataset.roundness, 0.5);
  const borderSize = toNumber(node.dataset.borderSize, 0.05);
  const circleSize = toNumber(node.dataset.circleSize, 0.25);
  const circleEdge = toNumber(node.dataset.circleEdge, 1);
  const backgroundColor = node.dataset.bgColor || "#232323";
  const pixelRatioProp = node.dataset.pixelRatio === "device" ? window.devicePixelRatio || 1 : toNumber(node.dataset.pixelRatio, 1);
  const dpr = Math.min(Math.max(pixelRatioProp, 1), 2);

  let width = 1;
  let height = 1;
  let rafId = null;
  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  const interaction = { hover: 0, hoverTarget: 0 };

  const isotope = new Image();
  isotope.decoding = "async";
  isotope.src = "assets/img/LoheAssets/LE_Isotipo_taupe.svg";

  const shapes = [
    { phase: 0.25 + variation * 0.4, scale: 1.8, alpha: 0.31, ampX: 0.085, ampY: 0.06 },
    { phase: 2.2 + variation * 0.3, scale: 2.35, alpha: 0.19, ampX: 0.07, ampY: 0.08 },
    { phase: 4.35 + variation * 0.5, scale: 1.5, alpha: 0.24, ampX: 0.09, ampY: 0.065 }
  ];

  const resize = () => {
    const rect = node.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const drawShapeLayer = (time, isStatic) => {
    const mouseOffsetX = (pointer.x - 0.5) * width * 0.18;
    const mouseOffsetY = (pointer.y - 0.5) * height * 0.16;
    const centerX = width * 0.5 + mouseOffsetX;
    const centerY = height * 0.52 + mouseOffsetY;
    const hoverMix = isStatic ? 0 : interaction.hover;
    const blurMax = Math.max(12, Math.min(54, Math.min(width, height) * (0.038 + circleSize * 0.11)));
    const blurAmount = blurMax * hoverMix;
    const driftScale = 0.58 + hoverMix * 1.08;
    const pulseAmplitude = 0.02 + hoverMix * 0.08;

    shapes.forEach((shape) => {
      const pulse = isStatic ? 1 : 1 + Math.sin(time * 0.0002 + shape.phase) * pulseAmplitude;
      const dynamicScale = shape.scale * shapeSize * pulse;
      const drawWidth = isotope.width * dynamicScale;
      const drawHeight = isotope.height * dynamicScale;

      const driftX = isStatic
        ? 0
        : Math.sin(time * 0.00011 + shape.phase) * width * shape.ampX * circleEdge * driftScale;
      const driftY = isStatic
        ? 0
        : Math.cos(time * 0.00013 + shape.phase) * height * shape.ampY * circleEdge * driftScale;
      const rotation = isStatic ? 0 : Math.sin(time * 0.00009 + shape.phase) * (0.08 + roundness * 0.2 + hoverMix * 0.26);

      if (blurAmount > 0.4) {
        context.save();
        context.translate(centerX + driftX, centerY + driftY);
        context.rotate(rotation);
        context.globalAlpha = Math.min(0.92, shape.alpha * (0.26 + hoverMix * 2.05));
        context.filter = `blur(${blurAmount}px)`;
        context.drawImage(isotope, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        context.restore();
      }

      context.save();
      context.translate(centerX + driftX, centerY + driftY);
      context.rotate(rotation);
      context.globalAlpha = Math.max(0.08, shape.alpha * (0.78 - hoverMix * 0.55));
      context.filter = "none";
      context.drawImage(isotope, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      context.restore();
    });

    context.filter = "none";
    context.globalAlpha = 1;
  };

  const draw = (time = 0, isStatic = false) => {
    context.clearRect(0, 0, width, height);
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, width, height);

    if (!isotope.complete || isotope.naturalWidth === 0) {
      return;
    }

    const haloRadius = Math.max(width, height) * (0.55 + circleSize * 0.45);
    const halo = context.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, haloRadius);
    halo.addColorStop(0, `rgba(251, 247, 244, ${0.02 + borderSize * 0.28})`);
    halo.addColorStop(1, "rgba(251, 247, 244, 0)");
    context.fillStyle = halo;
    context.fillRect(0, 0, width, height);

    drawShapeLayer(time, isStatic);
  };

  const animate = (time) => {
    pointer.x += (pointer.targetX - pointer.x) * 0.08;
    pointer.y += (pointer.targetY - pointer.y) * 0.08;
    interaction.hover += (interaction.hoverTarget - interaction.hover) * 0.09;
    draw(time, false);
    rafId = window.requestAnimationFrame(animate);
  };

  const start = () => {
    if (prefersReducedMotionQuery) {
      draw(performance.now(), true);
      return;
    }

    if (!rafId) {
      rafId = window.requestAnimationFrame(animate);
    }
  };

  resize();
  isotope.addEventListener("load", start);

  const updatePointerTarget = (clientX, clientY) => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const nextX = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const nextY = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    pointer.targetX = nextX;
    pointer.targetY = nextY;
  };

  host.addEventListener("pointermove", (event) => {
    interaction.hoverTarget = 1;
    updatePointerTarget(event.clientX, event.clientY);
  });

  host.addEventListener("pointerenter", (event) => {
    interaction.hoverTarget = 1;
    updatePointerTarget(event.clientX, event.clientY);
  });

  host.addEventListener("pointerleave", () => {
    pointer.targetX = 0.5;
    pointer.targetY = 0.5;
    interaction.hoverTarget = 0;
  });

  if (isotope.complete && isotope.naturalWidth > 0) {
    start();
  } else {
    draw(0, true);
  }

  window.addEventListener("resize", () => {
    resize();
    if (prefersReducedMotionQuery) {
      draw(performance.now(), true);
    }
  });
};

shapeBlurNodes.forEach((node) => initShapeBlur(node));

const scrambleNodes = [...document.querySelectorAll("[data-scramble-text]")];
const shouldReduceMotion = prefersReducedMotionQuery;

const initScrambleText = (node) => {
  const text = (node.textContent || "").replace(/\s+/g, " ").trim();
  if (!text) {
    return;
  }

  const radius = Number(node.dataset.scrambleRadius || 100);
  const durationMs = Number(node.dataset.scrambleDuration || 1.2) * 1000;
  const speedMs = Math.max(24, Number(node.dataset.scrambleSpeed || 0.5) * 100);
  const scrambleChars = (node.dataset.scrambleChars || ".:").split("");

  node.textContent = "";
  const words = text.split(" ");
  const states = [];
  const spans = [];

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "scramble-word";
    [...word].forEach((char) => {
      const span = document.createElement("span");
      span.className = "scramble-char";
      span.dataset.original = char;
      span.textContent = char;
      states.push({ until: 0, lastSwap: 0 });
      spans.push(span);
      wordSpan.appendChild(span);
    });
    node.appendChild(wordSpan);
    if (wordIndex < words.length - 1) {
      node.appendChild(document.createTextNode(" "));
    }
  });

  const randomScrambleChar = () => scrambleChars[Math.floor(Math.random() * scrambleChars.length)] || ".";
  let rafId = null;

  const tick = (now) => {
    let keepAnimating = false;

    spans.forEach((span, index) => {
      const state = states[index];
      const original = span.dataset.original || "";
      if (now < state.until) {
        keepAnimating = true;
        if (now - state.lastSwap >= speedMs) {
          span.textContent = randomScrambleChar();
          state.lastSwap = now;
        }
      } else if (span.textContent !== original) {
        span.textContent = original;
      }
    });

    if (keepAnimating) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  const energizeFromPoint = (x, y) => {
    const now = performance.now();
    spans.forEach((span, index) => {
      const rect = span.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(x - centerX, y - centerY);
      if (distance > radius) {
        return;
      }

      const power = 1 - distance / radius;
      states[index].until = Math.max(states[index].until, now + durationMs * power);
    });

    if (!rafId) {
      rafId = window.requestAnimationFrame(tick);
    }
  };

  node.addEventListener("pointermove", (event) => {
    energizeFromPoint(event.clientX, event.clientY);
  });

  node.addEventListener("pointerenter", (event) => {
    energizeFromPoint(event.clientX, event.clientY);
  });

  node.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      energizeFromPoint(touch.clientX, touch.clientY);
    },
    { passive: true }
  );
};

if (!shouldReduceMotion) {
  scrambleNodes.forEach((node) => initScrambleText(node));
}

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
