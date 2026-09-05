/* Interacciones del sitio: menú móvil, barra al hacer scroll, sonido del video y aparición de tarjetas. */
(function () {
  "use strict";

  /* ── Barra de navegación ── */
  var nav = document.getElementById("nav-principal");
  if (nav) {
    var solidas = "bg-white/80 backdrop-blur-xl shadow-sm py-3".split(" ");
    var onScroll = function () {
      var activo = window.scrollY > 40;
      solidas.forEach(function (c) { nav.classList.toggle(c, activo); });
      nav.classList.toggle("py-6", !activo);
      nav.classList.toggle("bg-transparent", !activo);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── Menú móvil ── */
  var btn = document.getElementById("btn-menu");
  var menu = document.getElementById("menu-movil");
  if (btn && menu) {
    var inner = menu.querySelector("[data-menu-inner]");
    var abierto = false;
    var toggle = function (v) {
      abierto = typeof v === "boolean" ? v : !abierto;
      btn.setAttribute("aria-expanded", String(abierto));
      menu.classList.toggle("opacity-0", !abierto);
      menu.classList.toggle("-translate-y-full", !abierto);
      menu.classList.toggle("pointer-events-none", !abierto);
      if (inner) {
        inner.classList.toggle("translate-y-10", !abierto);
        inner.classList.toggle("opacity-0", !abierto);
      }
      document.body.style.overflow = abierto ? "hidden" : "";
    };
    btn.addEventListener("click", function () { toggle(); });
    menu.querySelectorAll("[data-cerrar-menu]").forEach(function (a) {
      a.addEventListener("click", function () { toggle(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && abierto) toggle(false);
    });
  }

  /* ── Videos: click para activar/desactivar sonido ── */
  Array.prototype.forEach.call(document.querySelectorAll("[data-video-wrap]"), function (wrap) {
    var video = wrap.querySelector("[data-video]");
    var overlay = wrap.querySelector("[data-video-overlay]");
    wrap.addEventListener("click", function () {
      if (!video) return;
      // al activar el sonido de uno, silenciar los demás
      if (video.muted) {
        Array.prototype.forEach.call(document.querySelectorAll("[data-video-wrap]"), function (otro) {
          if (otro === wrap) return;
          var v = otro.querySelector("[data-video]");
          var o = otro.querySelector("[data-video-overlay]");
          if (v && !v.muted) {
            v.muted = true;
            if (o) { o.classList.remove("opacity-0", "pointer-events-none"); }
          }
        });
      }
      video.muted = !video.muted;
      if (!video.muted) { video.play().catch(function () {}); }
      if (overlay) {
        overlay.classList.toggle("opacity-0", !video.muted);
        overlay.classList.toggle("pointer-events-none", !video.muted);
      }
    });
    // Carga diferida real: el video sólo empieza a bajar cuando aparece en pantalla
    if (video && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            video.setAttribute("preload", "auto");
            // load() fuerza la descarga: cambiar el atributo solo no siempre alcanza
            if (video.readyState === 0) { try { video.load(); } catch (err) {} }
            video.play().catch(function () {});
            io.disconnect();
          }
        });
      }, { rootMargin: "200px" });
      io.observe(video);
    }
  });

  /* ── Aparición al hacer scroll ── */
  var items = document.querySelectorAll(".reveal-on-scroll");
  if (items.length) {
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
      items.forEach(function (el) { obs.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ── Eventos de conversión (Analytics / Meta) ── */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.gtag) window.gtag("event", "contacto_whatsapp", { formacion: a.dataset.formacion || "general" });
      if (window.fbq) window.fbq("track", "Contact");
    });
  });
})();
