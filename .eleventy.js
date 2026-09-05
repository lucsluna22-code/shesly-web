const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // Permite usar archivos .yml en src/_data (más fáciles de editar que JSON)
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  // Copia tal cual imágenes, video, fuentes, JS y el panel de administración
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy({ "src/assets/video": "assets/video" });
  eleventyConfig.addPassthroughCopy({ "src/assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  eleventyConfig.addWatchTarget("./src/assets/");

  // #rrggbb -> "r g b"  (para poder usar opacidades de Tailwind sobre variables CSS)
  eleventyConfig.addFilter("rgbChannels", (hex) => {
    if (!hex) return "0 0 0";
    let h = String(hex).trim().replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
  });

  // Convierte saltos de línea en <br> (para textos largos del CMS)
  eleventyConfig.addFilter("nl2br", (str) =>
    String(str || "").replace(/\r?\n/g, "<br>")
  );

  eleventyConfig.addFilter("dateISO", () => new Date().toISOString().slice(0, 10));

  // Ordena una colección por el campo "orden"
  eleventyConfig.addFilter("porOrden", (arr) =>
    [...(arr || [])].sort((a, b) => (a.data.orden || 99) - (b.data.orden || 99))
  );

  eleventyConfig.addCollection("formaciones", (api) =>
    api
      .getFilteredByGlob("src/formaciones/*.md")
      .filter((f) => f.data.visible !== false)
      .sort((a, b) => (a.data.orden || 99) - (b.data.orden || 99))
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
