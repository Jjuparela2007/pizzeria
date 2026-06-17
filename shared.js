/* ===================================================================
   PIZZERÍA LA TOSCANA · interacciones compartidas (todas las páginas)
   Scroll reveal · contadores · parallax hero · FAQ · año footer
   ------------------------------------------------------------------- */
(function () {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Año del footer ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Scroll reveal (IntersectionObserver) ---- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const delay = el.dataset.revealDelay || 0;
              el.style.transitionDelay = delay + "ms";
              el.classList.add("is-visible");
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---- Contadores animados ---- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduce && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || "";
          const dur = 1400;
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            const val = target % 1 === 0
              ? Math.round(target * eased)
              : (target * eased).toFixed(0);
            el.textContent = val + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = el.dataset.count + (el.dataset.suffix || "");
    });
  }

  /* ---- Parallax suave del hero ---- */
  const heroPizza = document.querySelector(".hero__pizza");
  if (heroPizza && !reduce) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroPizza.style.translate = "0 " + y * 0.08 + "px";
          }
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* ---- Nav: sombra al hacer scroll ---- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("nav--scrolled");
      else nav.classList.remove("nav--scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- FAQ acordeón ---- */
  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq__q");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const open = item.classList.contains("is-open");
      faqItems.forEach((i) => {
        i.classList.remove("is-open");
        const b = i.querySelector(".faq__q");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---- Newsletter (demo, sin backend) ---- */
  const news = document.querySelector("[data-newsletter]");
  if (news) {
    const input = news.querySelector("input[type=email]");
    const btn = news.querySelector("button");
    const msg = news.querySelector(".newsletter__msg");
    btn.addEventListener("click", () => {
      const val = (input.value || "").trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) {
        msg.textContent = "Escribe un correo válido para suscribirte.";
        msg.className = "newsletter__msg is-error";
        return;
      }
      msg.textContent = "¡Listo! Te avisaremos de promos y novedades.";
      msg.className = "newsletter__msg is-ok";
      input.value = "";
    });
  }
})();