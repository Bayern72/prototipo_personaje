/* ============================================================
   PORTAFOLIO MULTIMEDIA — Interacciones (JS vanilla)
   - Contenido de las 9 secciones
   - HUD índice + fases con progreso
   - Hero scroll-driven con ELEVEN-BITE
   - Cursor gaming + panel de accesibilidad (WCAG 2.1)
   ============================================================ */

/* ---------- 1. CONTENIDO: edita aquí tus rutas de medios ---------- */
const sections = [
  { id: "investigacion", num: "01", title: "Investigación", label: "Los 10 mejores portafolios web", icon: "📄",
    media: { kind: "pdf", src: "pdfs/Investigación.pdf" } },
  { id: "brief", num: "02", title: "Brief", label: "Brief Informativo · Portafolio Web Multimedia", icon: "📋",
    media: { kind: "pdf", src: "brief.pdf" } },
  { id: "idea", num: "03", title: "Idea", label: "Idea · Registro de audio", icon: "🎧",
    media: { kind: "audio", src: "audio/idea (online-audio-converter.com) (1).mp3", bg: "pdfs/Brief/fondobrief.png" } },
  { id: "concepto_grafico", num: "04", title: "Concepto Gráfico", label: "Concepto Gráfico · Portafolio Web Multimedia", icon: "🎨",
    media: { kind: "video", src: "videos/concepto_grafico.mp4" } },
  { id: "manual_de_marca", num: "05", title: "Manual de marca", label: "Manual de marca · Portafolio Web Multimedia", icon: "📘",
    media: { kind: "pdf", src: "pdfs/manual_de_marca_js.pdf" } },
  { id: "scketch", num: "06", title: "Sketch", label: "Sketch · Portafolio Web Multimedia", icon: "✏️",
    media: { kind: "pdf", src: "pdfs/sketch_prototipo_portfolio.pdf" } },
  { id: "wireframes", num: "07", title: "Wireframes", label: "Wireframes · Portafolio Web Multimedia", icon: "📐",
    media: { kind: "pdf", src: "pdfs/wireframe_portfolio_js.pdf" } },
  { id: "mockup", num: "08", title: "Mockup", label: "Mockup · Portafolio Web Multimedia", icon: "🖼️",
    media: { kind: "pdf", src: "mockup.pdf" } },
  { id: "prototipos", num: "09", title: "Prototipos", label: "Prototipos · Portafolio Web Multimedia", icon: "⚙️",
    media: { kind: "image", src: "img/qr_prototipo.png", alt: "Código QR para abrir el prototipo interactivo" } },
];

const phases = [
  "Exploración visual",
  "Recolección de información",
  "Idea",
  "Concepto gráfico",
  "Producción",
  "Post-producción",
];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 2. Render de secciones ---------- */
function mediaHTML(s) {
  const m = s.media;
  if (m.kind === "pdf")
    return `<iframe class="doc-frame chamfer-sm" src="${esc(m.src)}" loading="lazy"
      title="Documento PDF: ${esc(s.title)}" aria-label="Visor de PDF de la sección ${esc(s.title)}"></iframe>`;
  if (m.kind === "video")
    return `<video class="doc-video chamfer-sm" controls preload="metadata" aria-label="Video de la sección ${esc(s.title)}">
      <source src="${esc(m.src)}" type="video/mp4" />Tu navegador no admite video HTML5.</video>`;
  if (m.kind === "audio")
    return `<div class="audio-wrap chamfer-sm">
      ${m.bg ? `<img class="audio-bg" src="${esc(m.bg)}" alt="" aria-hidden="true" loading="lazy" />` : ""}
      <div class="audio-inner">
        <h3 class="audio-title">Nota de voz · Idea</h3>
        <audio controls preload="metadata" aria-label="Reproductor de audio con la explicación de la idea">
          <source src="${esc(m.src)}" type="audio/mpeg" />Tu navegador no admite audio HTML5.</audio>
      </div></div>`;
  return `<img class="doc-img chamfer-sm" src="${esc(m.src)}" alt="${esc(m.alt || "")}" loading="lazy" />`;
}

document.querySelector(".main").innerHTML =
  sections
    .map(
      (s) => `<section class="doc reveal" id="${s.id}" data-section="${s.id}">
    <header class="doc-header">
      <span class="doc-num" aria-hidden="true">${s.num}</span>
      <div class="doc-titlewrap">
        <h2 class="doc-title glitch" data-text="${esc(s.title)}">${esc(s.title)}</h2>
      </div>
    </header>
    <div class="doc-card hud-panel chamfer">
      <div class="doc-bar">
        <span aria-hidden="true">${s.icon}</span>
        <span class="doc-label">${esc(s.label)}</span>
      </div>
      <div class="doc-body">${mediaHTML(s)}</div>
    </div>
  </section>`,
    )
    .join("") +
  `<footer class="site-footer hud-panel chamfer scanlines">
    <p class="name">Sebastian Cortes</p>
    <p class="meta">© 2026 · Hecho con dedicación desde Bogotá, mi ciudad</p>
    <p class="tag">Producción Multimedia · Colombia</p>
  </footer>`;

/* ---------- 3. HUD índice y fases ---------- */
const hudIndex = document.getElementById("hud-index");
hudIndex.innerHTML = sections
  .map(
    (s) => `<a class="hud-item glitch chamfer-sm" href="#${s.id}" data-link="${s.id}" data-text="${esc(s.title)}">
      <span class="hud-num">${s.num}</span>${esc(s.title)}</a>`,
  )
  .join("");

const hudPhases = document.getElementById("hud-phases");
hudPhases.innerHTML = phases
  .map((p) => `<li class="hud-item chamfer-sm"><span class="phase-mark" aria-hidden="true"></span>${esc(p)}</li>`)
  .join("");

const pad = (n) => String(n).padStart(2, "0");
function setActive(id) {
  hudIndex.querySelectorAll("a").forEach((a) => {
    const on = a.dataset.link === id;
    a.dataset.active = on ? "true" : "false";
    if (on) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
  const idx = Math.max(sections.findIndex((s) => s.id === id), 0);
  const phaseIndex = Math.min(Math.floor((idx / sections.length) * phases.length), phases.length - 1);
  hudPhases.querySelectorAll("li").forEach((li, i) => {
    li.classList.toggle("phase-done", i <= phaseIndex);
    li.dataset.active = i === phaseIndex ? "true" : "false";
  });
  document.getElementById("hud-progress").textContent = `Progreso ${pad(phaseIndex + 1)} / ${pad(phases.length)}`;
}

/* ---------- 4. IntersectionObserver: activo + scroll reveal ---------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.intersectionRatio > 0.25 && e.target.dataset.section) setActive(e.target.dataset.section);
    });
  },
  { rootMargin: "-15% 0px -45% 0px", threshold: [0, 0.25, 0.6] },
);
document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
setActive(sections[0].id);

/* ---------- 5. Hero scroll-driven: ELEVEN-BITE revela "PORTAFOLIO" ---------- */
const heroTitle = document.getElementById("hero-title");
const hero = document.getElementById("hero");
const bot = document.getElementById("bot");
const letters = "PORTAFOLIO".split("");
heroTitle.innerHTML = letters.map((l) => `<span aria-hidden="true">${l}</span>`).join("");
const spans = [...heroTitle.querySelectorAll("span")];

let raf = 0;
function onScroll() {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const h = hero.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), Math.max(h, 1));
    render(scrolled / Math.max(h, 1));
  });
}
function render(p) {
  spans.forEach((el, i) => {
    const t = Math.min(Math.max(p * letters.length * 1.15 - i, 0), 1);
    el.style.opacity = 0.12 + t * 0.88;
    el.style.transform = `translateY(${(1 - t) * 26}px)`;
    el.style.color = t > 0.85 ? "var(--neon)" : "";
    el.style.textShadow = t > 0.85 ? "0 0 28px rgba(0,202,250,.55)" : "none";
    el.style.transition = "color .3s ease, text-shadow .3s ease";
  });
  bot.style.transform = `translateX(${(p - 0.5) * 55}vw) scale(${1 - p * 0.18})`;
}

/* ---------- 6. Cursor personalizado ---------- */
const cursor = document.getElementById("cursor");
function onMove(e) {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  const hot = e.target instanceof Element && e.target.closest("a, button, input, label, summary, [role='button']");
  cursor.classList.toggle("is-hot", !!hot);
}

/* ---------- 7. Panel de accesibilidad ---------- */
const STORAGE_KEY = "portfolio-a11y";
const prefs = { reduceMotion: false, highContrast: false, customCursor: true };

try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) Object.assign(prefs, JSON.parse(raw));
  else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    prefs.reduceMotion = true;
    prefs.customCursor = false;
  }
} catch (_) {}

function apply() {
  const root = document.documentElement;
  root.classList.toggle("reduce-motion", prefs.reduceMotion);
  root.classList.toggle("hc", prefs.highContrast);

  /* Cursor */
  const useCursor = prefs.customCursor && !prefs.reduceMotion && matchMedia("(pointer:fine)").matches;
  document.body.classList.toggle("cursor-fx", useCursor);
  window.removeEventListener("pointermove", onMove);
  if (useCursor) window.addEventListener("pointermove", onMove, { passive: true });

  /* Hero scroll-driven */
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  bot.classList.toggle("animate-float-bot", !prefs.reduceMotion);
  if (prefs.reduceMotion) {
    render(1);
    bot.style.transform = "";
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  /* Sincroniza checkboxes */
  Object.keys(prefs).forEach((k) => {
    const el = document.getElementById("opt-" + k);
    if (el) el.checked = prefs[k];
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (_) {}
}

Object.keys(prefs).forEach((k) => {
  const el = document.getElementById("opt-" + k);
  if (el) el.addEventListener("change", () => { prefs[k] = el.checked; apply(); });
});

const toggle = document.getElementById("a11y-toggle");
const panel = document.getElementById("a11y-panel");
toggle.addEventListener("click", () => {
  const open = panel.hidden;
  panel.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar opciones de accesibilidad" : "Abrir opciones de accesibilidad");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !panel.hidden) { panel.hidden = true; toggle.setAttribute("aria-expanded", "false"); toggle.focus(); }
});

apply();
