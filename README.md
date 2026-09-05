# Shesly Gutierrez — Sitio web

Clon estático del sitio original (`shesly-972c4.web.app`), reconstruido sobre **Eleventy + Tailwind**, con panel de edición (**Sveltia CMS**) y listo para desplegar en **Netlify** o **Cloudflare Pages** con dominio propio.

---

## Qué cambió respecto del original

| | Original (Firebase) | Este clon |
|---|---|---|
| Tecnología | React + Vite (SPA) | HTML estático generado con Eleventy |
| JS enviado al navegador | ~1.2 MB (React + three.js + Tailwind CDN + Firebase) | ~6 KB |
| CSS | 407 KB (Tailwind por CDN, compilado en el navegador) | 48 KB compilado |
| Video del hero | **307 MB** `.mov` en HEVC (no reproduce en varios navegadores) | 8,3 MB `.mp4` H.264 con imagen de portada y carga diferida |
| Tipografías | Google Fonts (externo) | Self-hosted (6 archivos woff2, subset latino) |
| SEO | Solo etiquetas meta; contenido renderizado por JS | HTML real, `sitemap.xml`, `robots.txt`, Schema.org, Open Graph |
| Páginas internas | Estado de React (una sola URL) | URLs reales: `/formaciones/intuicion/`, etc. |
| Edición de contenido | Tocar código y redesplegar | Panel en `/admin` |
| Formulario de contacto | No había | Netlify Forms (sección opcional) |

Se conservaron **el diseño, los textos, las animaciones y las ondas del encabezado**. La escena de three.js del hero se reescribió en Canvas 2D (~3 KB) con la misma geometría, colores y cámara.

---

## Estructura

```
src/
  _data/
    site.yml         → datos generales, contacto, redes, SEO, analytics
    theme.yml        → colores, tipografías, efectos, CSS personalizado
    home.yml         → contenido y orden de las secciones de la portada
  formaciones/       → una formación por archivo .md (se crean desde el panel)
  paginas/           → páginas legales
  _includes/
    layouts/         → plantilla base y plantilla de página simple
    partials/        → nav, footer, iconos, botón de WhatsApp
    secciones/       → hero, sobre-mi, formaciones, contacto
  assets/            → css, js, imágenes, video, fuentes
  admin/             → panel de edición (Sveltia CMS)
```

## Comandos

```bash
npm install
npm start        # desarrollo en http://localhost:8080
npm run build    # genera _site/
```

Node 20 o superior.

## Cómo se agrega una formación nueva

Desde `/admin` → **Formaciones** → *New Formación*. O a mano: copiar un archivo de `src/formaciones/`, cambiar `slug`, `orden` y el contenido. La tarjeta en la portada, la página interna, el sitemap y el enlace de WhatsApp se generan solos.

## Notas técnicas

- Los colores del CMS se inyectan como variables CSS (`--c-brand`, etc.) en canales RGB, así Tailwind puede usar opacidades (`bg-brand/20`).
- El único nombre de clase que se arma dinámicamente es `bg-{color}-100` (insignias); está en el `safelist` de `tailwind.config.js`. Si agregás colores nuevos al CMS, sumalos ahí también.
- `src/admin` está en `.eleventyignore` y se copia tal cual.
- El video se descarga recién cuando entra en pantalla (`IntersectionObserver`), y arranca en silencio con un click para activar el sonido, igual que el original.
