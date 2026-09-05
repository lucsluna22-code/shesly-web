# Cómo editar tu web

Hola Shesly 👋 Esta guía es para que puedas cambiar tu web sola, sin tocar código y sin miedo a romper nada.

---

## Entrar al panel

Andá a **sheslygutierrez.com/admin** e iniciá sesión con tu cuenta de GitHub.

Cada vez que guardás un cambio, la web se actualiza sola en 1 o 2 minutos. Refrescá la página para verlo.

---

## Qué podés cambiar

### 🎨 Diseño
Colores, tipografías y efectos de toda la web.

- **Fondo general**: el celeste claro de fondo.
- **Color de marca**: el celeste de los detalles, links y botones. Si lo cambiás, cambian todos juntos.
- **Marca clara / oscura**: variantes del anterior. Para que se vea bien, elegí una versión más clara y una más oscura del mismo tono.
- **Acento rosado**: los subrayados y detalles rosas.
- **Degradado**: los dos colores de las palabras en cursiva de los títulos ("*tu propio*", "*traducir*", "*disponibles*").
- **Tipografías**: la de títulos y la de textos.
- **Efectos**: el grano sutil de fondo y las ondas animadas del encabezado (podés apagarlas o bajarles la intensidad).

> El campo **CSS personalizado** es para tu desarrollador. Dejalo vacío.

### 🏠 Página de inicio

**Secciones**: arrastrá para cambiar el orden, o apagá el interruptor *Visible* para esconder una sección. Podés activar la sección de **formulario de contacto**, que viene apagada.

**Encabezado**: el título grande está partido en tres campos porque cada línea se ve distinta. `Título línea 1` = "Habita", `palabras destacadas` = "tu propio" (sale en cursiva y con degradado), `línea 2` = "ser."

**Sobre mí**: el video, tu foto, los textos y las tres insignias flotantes (el emoji, el título y el color de cada una).

**Sección Formaciones**: los títulos de esa parte. Las formaciones en sí se editan aparte.

### ✨ Formaciones
Cada formación es una ficha. Podés editarlas, crear nuevas o esconderlas con el interruptor *Visible*.

Lo que conviene tener a mano:

- **Slug**: la parte final de la dirección. Sin espacios, sin acentos, con guiones. Ej: `barras-access` → `sheslygutierrez.com/formaciones/barras-access/`
- **Orden**: 1, 2, 3… define en qué posición aparece la tarjeta.
- **Color de la tarjeta**: pinta la tarjeta al pasar el mouse y el recuadro de precio.
- **Temario**: cada punto es un ítem de la lista numerada.
- **Inscripción**: nombre, precio, descripción, si es online o presencial. Si activás **"Próximamente"**, se reemplaza el botón de reserva por un aviso de que todavía no hay fechas.
- **Mensaje de WhatsApp**: el texto que se le escribe solo a la persona cuando toca "Reservar mi lugar". Los `*asteriscos*` ponen palabras en negrita dentro de WhatsApp.

### ⚙️ Configuración del sitio
Tu email, teléfono, WhatsApp, redes sociales, el menú, los textos del pie y los datos que ve Google.

> **WhatsApp**: va solo con números y código de país, sin `+` ni espacios. Ej: `525531799632`.

### 📄 Páginas legales
Privacidad y Términos. Están redactadas de base; revisalas y ajustá lo que corresponda a tu caso.

---

## Cambiar fotos y video

En cualquier campo de imagen, tocá y subí un archivo nuevo.

- **Fotos**: JPG, idealmente de menos de 500 KB. Guardalas ya recortadas al tamaño que van a mostrarse; no las subas directo de la cámara.
- **Video**: si vas a cambiarlo, pedile a tu desarrollador que lo comprima primero. El original pesaba 307 MB y hacía que la web tardara muchísimo; ahora pesa 8 MB. Un video pesado la vuelve lenta de nuevo.

---

## Tres cosas para no romper nada

1. **No borres campos que no entiendas.** Si algo no lo vas a usar, dejalo como está.
2. **Guardá seguido.** Cada guardado queda registrado, así que siempre se puede volver atrás.
3. **Si algo se ve raro después de un cambio**, avisá a tu desarrollador: todo queda versionado y se revierte en un minuto.

---

## Preguntas frecuentes

**¿Puedo agregar una sección nueva que no está en la lista?**
Esas cuatro son las que existen hoy. Sumar una nueva es trabajo de desarrollo — pedilo y se agrega al panel.

**¿Cuánto tarda en verse un cambio?**
Uno o dos minutos. Si pasaron cinco y no lo ves, refrescá con `Ctrl + Shift + R` (o `Cmd + Shift + R` en Mac).

**¿Puedo probar sin publicar?**
Con la configuración actual, guardar publica. Si querés un modo borrador con aprobación previa, se puede activar — pedilo.
