# Estado del sitio

Actualizado el 5 de septiembre. La web quedó enfocada solo en **Visión Extraocular (VEO)**
y ya cobra sola. Se puede publicar tal como está.

---

## 1. El circuito de compra: cerrado

Los dos ajustes de Stripe ya están hechos y el enlace del grupo de WhatsApp está cargado en
la web. El recorrido completo funciona sin que nadie tenga que hacer nada a mano:

1. La persona paga con tarjeta en Stripe.
2. Stripe la manda a `sheslygutierrez.com/pago-exitoso/`.
3. Ahí, lo primero que ve es un bloque negro con un botón verde: **Unirme al grupo**.
4. Un toque y queda en el grupo de VEO. Debajo siguen los tres pasos que le explican qué
   más va a recibir y cuándo es la sesión.

Esto ya se puede probar de verdad: una compra de $49 con tarjeta real y después el
reembolso desde Stripe. Es lo último que queda antes de publicar.

**Cuando cierre esta generación.** El enlace del grupo caduca a mano: Shesly entra al
grupo → toca el nombre → *Enlace de invitación* → **Restablecer enlace**, y me pasa el
nuevo. El viejo deja de servir al instante, así nadie de septiembre entra al grupo de
octubre. Se cambia en `src/_data/site.yml` → `extras: whatsapp_grupo`, o desde el panel
cuando esté conectado.

Y conviene confirmar que en el grupo está activado **"Aprobar nuevos participantes"**: con
eso, tener el enlace no alcanza para entrar, Shesly ve la solicitud y decide. Es lo que
evita que alguien que llegue por casualidad a esa página se cuele sin haber pagado.

## 2. Los testimonios

Arriba va el video completo de Zoom, con las cuatro personas hablando una detrás de la
otra, tal como estaba grabado. Probé cortarlo en clips por persona, pero los cortes
quedaban duros, así que volvimos al video entero.

Abajo, los **13 mensajes** que había en la carpeta, en tres columnas tipo mosaico. Todos sin
nombre ni foto.

Si más adelante aparecen testimonios grabados por separado, la sección los acomoda sola: si
hay uno, lo muestra grande y centrado como ahora; si hay varios, arma una fila que se
desliza de costado con tarjetas verticales. Se cargan desde el panel, en *Página de inicio
→ Testimonios → Videos*.

---

## 3. Los títulos de las entrevistas

La sección nueva de YouTube está armada con los dos enlaces que pasaste, pero **los títulos
los puse yo a ojo**: desde acá no puedo entrar a YouTube para leer los reales. Hoy dicen
"Entrevista sobre Visión Extraocular" y "Conversación en vivo sobre percepción e
intuición". Pasame los títulos verdaderos —o los del canal que la entrevistó— y los cambio;
también se editan desde el panel, en *Página de inicio → Entrevistas de YouTube*.

Las miniaturas las trae YouTube solo, así que se van a ver recién cuando el sitio esté
publicado. Si alguna no cargara, la tarjeta queda en negro con el botón de play, que sigue
funcionando.

---

## 4. Lo demás que cambió en esta ronda

- **La vista previa del enlace** (lo que se ve al pegar sheslygutierrez.com en WhatsApp,
  Instagram o Facebook) ahora es una tarjeta de 1200×630 con la portada de VEO a la
  izquierda y "Entrena tu intuición y percepción" a la derecha. Está en
  `src/assets/img/og-veo.jpg`. **Ojo:** WhatsApp y Facebook guardan la vista previa vieja
  por un tiempo. Después de publicar, pegá la dirección en
  `developers.facebook.com/tools/debug/` y tocá "Scrape Again" para que la actualicen; en
  WhatsApp a veces alcanza con agregarle `?v=2` al final del enlace una vez.
- **Encabezado nuevo:** "Entrena tu intuición y percepción", con "Aprende a ver sin los
  ojos" como subtítulo y, debajo, qué es VEO y para quién. El mismo título va en el título
  de Google, en la descripción y en la vista previa del enlace.
- **La técnica es propia.** Saqué de todos lados la idea de que enseñás el método del Dr.
  Grinberg. Ahora dice "método propio, con más de 600 sesiones online, en el camino que
  abrió el neurofisiólogo mexicano Jacobo Grinberg" — lo reconoce como pionero sin
  atribuirle la técnica. Lo cambié también en el título de Google y en el temario de la
  formación.
- **El banner del programa** subió: ahora va justo después del video de la clase real.
- **Los testimonios escritos** son las capturas de pantalla reales. El texto de cada una
  quedó como descripción de la imagen, así Google lo sigue leyendo y una persona ciega
  también.
- **Nombre unificado:** "Visión Extraocular (VEO)" en toda la web, el título de Google, el
  formulario del brief y el panel. La URL de la formación pasó a
  `/formaciones/vision-extraocular/`, y la vieja redirige a la nueva.
- **Horario del viernes:** 18:00, en todos lados.
- **Testimonios:** quedan sin nombre ni foto, como pediste.
- **El banner de la formación** usa la portada nueva que dejaste en la carpeta. La imagen
  entera es un enlace: al hacer clic lleva a la página con el programa completo y el botón
  de compra. El primer botón del encabezado, "Ver el entrenamiento", baja hasta ese banner:
  primero ven la portada y desde ahí entran al programa.
- **La página del programa quedó en una sola columna.** Se fue la tarjeta del costado; la
  página ahora se lee de arriba abajo: qué es → cuándo, modalidad y duración → temario →
  fotos → qué incluye → las dos opciones de compra. El precio aparece una sola vez, al
  final, en el momento de elegir.
- **Las dos opciones de compra** son las mismas tarjetas del inicio: "Una probadita" a $49 y
  "La experiencia completa" a $199, marcada como *Más elegido*. Los precios se editan en un
  solo lugar —*Página de inicio → Cierre → Opciones*— y cambian en las dos páginas a la vez.
- **La página de gracias** abre con el botón del grupo de WhatsApp, y los pasos que siguen
  se renumeran solos según haya enlace de grupo cargado o no.

---

## 5. Lo que queda para más adelante

- **Agenda de reservas.** No hace falta hoy: son dos fechas fijas, se paga por Stripe y el
  horario se coordina por el grupo de WhatsApp. Cuando haya sesiones individuales sí va a
  hacer falta un calendario.
- **Fotos de clases.** La página interna de la formación todavía usa las dos imágenes
  viejas. Con seis u ocho fotos reales queda bastante mejor.
- **El panel `/admin`.** Sigue sin funcionar: falta el worker de autenticación
  (`sveltia-cms-auth` en Cloudflare Workers) y su URL en `base_url` de
  `src/admin/config.yml`. Todos los campos nuevos ya están cargados —incluido el banner—,
  así que el día que se conecte, Shesly puede editar textos, precios, fechas, testimonios y
  videos sola.
- **GitHub.** Sin conectar. Hoy se publica arrastrando el ZIP a `app.netlify.com/drop`.

---

## Recordatorio de publicación

1. Arrastrar `shesly-web-netlify.zip` a `app.netlify.com/drop` (el `index.html` ya está en
   la raíz del ZIP, verificado).
2. Si es un sitio nuevo: *Site configuration → Forms → Enable form detection*, y volver a
   desplegar. Viene apagado y sin eso el formulario del brief no guarda nada.
