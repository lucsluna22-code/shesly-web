/*
 * Ondas animadas del encabezado.
 * Reproduce la escena original de three.js con Canvas 2D (≈3 KB en vez de ~600 KB).
 * Misma geometría, mismos colores, misma cámara.
 */
(function () {
  "use strict";

  var host = document.querySelector("[data-hero-canvas]");
  if (!host) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  host.appendChild(canvas);

  var POINTS = 180;
  var SPAN = 160;

  // grupo: [cantidad de líneas, color, opacidad, altura, velocidad, amplitud, inclinada]
  var GROUPS = [
    [8, 16747179, 0.05, -12, 0.3, 0.8, false],
    [5, 11591910, 0.03, -15, 0.2, 0.5, false],
    [6, 14202110, 0.45, 18, 0.4, 6, true],
    [5, 16755389, 0.35, 16, 0.5, 5, true]
  ];

  var lines = [];
  GROUPS.forEach(function (g) {
    var count = g[0], color = g[1], opacity = g[2], baseY = g[3];
    var speed = g[4], amp = g[5], tilt = g[6];
    var rgb = ((color >> 16) & 255) + "," + ((color >> 8) & 255) + "," + (color & 255);
    for (var i = 0; i < count; i++) {
      lines.push({
        stroke: "rgba(" + rgb + "," + opacity + ")",
        baseY: baseY,
        speed: speed,
        amp: amp,
        offset: i * 0.4,
        rot: tilt ? Math.PI * 0.05 : 0,
        z: (i - count / 2) * 6
      });
    }
  });

  var xs = new Float32Array(POINTS);
  for (var j = 0; j < POINTS; j++) xs[j] = (j / POINTS - 0.5) * SPAN;

  var W = 0, H = 0, dpr = 1;
  function resize() {
    var r = host.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
  }
  resize();

  // Cámara (idéntica al original: fov 75, posición 0/12/45, mira a 0/8/0)
  var FOV = 75 * Math.PI / 180;
  var camX = 0, camY = 12, camZ = 45;
  var targetX = 0, targetY = 0;

  window.addEventListener("mousemove", function (e) {
    targetX = e.clientX / window.innerWidth - 0.5;
    targetY = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  var ax = [0, 0, 0], ay = [0, 0, 0], az = [0, 0, 0];
  function buildBasis() {
    var dx = camX - 0, dy = camY - 8, dz = camZ - 0;
    var l = Math.hypot(dx, dy, dz) || 1;
    az = [dx / l, dy / l, dz / l];
    // xAxis = normalize(cross(up, zAxis)), up = (0,1,0)
    var cx = 1 * az[2] - 0 * az[1];
    var cy = 0 * az[0] - 0 * az[2];
    var cz = 0 * az[1] - 1 * az[0];
    var cl = Math.hypot(cx, cy, cz) || 1;
    ax = [cx / cl, cy / cl, cz / cl];
    ay = [
      az[1] * ax[2] - az[2] * ax[1],
      az[2] * ax[0] - az[0] * ax[2],
      az[0] * ax[1] - az[1] * ax[0]
    ];
  }

  var running = true;
  var visible = true;

  function frame() {
    if (!running) return;
    if (visible) draw();
    requestAnimationFrame(frame);
  }

  function draw() {
    var t = Date.now() * 0.0007;

    camX += (targetX * 12 - camX) * 0.02;
    camY += (-targetY * 6 + 12 - camY) * 0.02;
    buildBasis();

    var aspect = W / H;
    var f = 1 / Math.tan(FOV / 2);
    var sx = f / aspect, sy = f;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineWidth = 1;

    for (var li = 0; li < lines.length; li++) {
      var L = lines[li];
      var cosR = Math.cos(L.rot), sinR = Math.sin(L.rot);
      ctx.strokeStyle = L.stroke;
      ctx.beginPath();
      var pen = false;

      for (var p = 0; p < POINTS; p++) {
        var x = xs[p], z = L.z;
        var y = Math.sin(x * 0.06 + t * L.speed + L.offset) * L.amp
              + Math.cos(z * 0.08 + t * 0.5) * (L.amp * 0.4)
              + Math.sin((x + z) * 0.01 + t * 0.8) * (L.amp * 0.3);

        // rotación sobre el eje Z + posición del grupo
        var wx = x * cosR - y * sinR;
        var wy = x * sinR + y * cosR + L.baseY;
        var wz = z;

        var ex = wx - camX, ey = wy - camY, ez = wz - camZ;
        var vx = ex * ax[0] + ey * ax[1] + ez * ax[2];
        var vy = ex * ay[0] + ey * ay[1] + ez * ay[2];
        var vz = ex * az[0] + ey * az[1] + ez * az[2];
        var depth = -vz;

        if (depth <= 0.1) { pen = false; continue; }

        var px = (vx * sx / depth * 0.5 + 0.5) * W;
        var py = (0.5 - vy * sy / depth * 0.5) * H;

        if (!pen) { ctx.moveTo(px, py); pen = true; }
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }

  window.addEventListener("resize", function () { resize(); if (reduce) draw(); }, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(host);
  }
  document.addEventListener("visibilitychange", function () {
    running = !document.hidden;
    if (running) frame();
  });

  if (reduce) { buildBasis(); draw(); } else { frame(); }
})();
