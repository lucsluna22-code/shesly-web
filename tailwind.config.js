/** Tailwind — los colores de marca salen de variables CSS que genera el CMS (src/_data/theme.yml) */
const v = (name) => ({ opacityValue }) =>
  opacityValue === undefined
    ? `rgb(var(${name}))`
    : `rgb(var(${name}) / ${opacityValue})`;

module.exports = {
  content: ["./src/**/*.{njk,md,html,js}"],
  theme: {
    extend: {
      colors: {
        page: v("--c-page"),
        ink: v("--c-ink"),
        accent: v("--c-accent"),
        brand: {
          light: v("--c-brand-light"),
          DEFAULT: v("--c-brand"),
          dark: v("--c-brand-dark"),
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Georgia", "serif"],
      },
    },
  },
  // Única clase que se arma dinámicamente en las plantillas (color de cada insignia).
  // El resto de las combinaciones de color están escritas literalmente en los .njk,
  // así que Tailwind ya las detecta solo.
  safelist: [
    "bg-purple-100", "bg-blue-100", "bg-rose-100", "bg-emerald-100", "bg-amber-100",
  ],
  plugins: [],
};
