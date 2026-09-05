# Activar el panel de edición

Para que Shesly pueda editar la web sola desde `sheslygutierrez.com/admin`.

Son cuatro pasos tuyos y uno de ella. Calculá 30 o 40 minutos la primera vez.
Todo lo que se puede dejar hecho de este lado, ya está hecho.

---

## Por qué hoy no funciona

El panel guarda los cambios **haciendo un commit en un repositorio de GitHub**, y el
sitio se vuelve a construir solo desde ahí. Hoy faltan las dos cosas: no hay
repositorio, y el sitio se publica arrastrando un ZIP a Netlify. Aunque Shesly pudiera
entrar al panel y escribir, no habría dónde guardar ni nada que se actualizara.

Así que activar el panel y dejar de arrastrar ZIP son **el mismo trabajo**. Cuando esto
esté, cada cambio —tuyo o de ella— queda publicado en un minuto, sin que nadie toque un
archivo.

---

## Paso 1 · Subir el código a GitHub

El ZIP `shesly-web-v13.zip` ya trae el repositorio iniciado y el primer commit hecho.
Solo falta crear el repositorio vacío en GitHub y empujarlo.

1. Entrá a [github.com/new](https://github.com/new).
2. Nombre: **`shesly-web`** (así está escrito en la configuración del panel).
3. Elegí **Private**. La web es pública, el código no tiene por qué serlo.
4. **No** marques "Add a README", "Add .gitignore" ni licencia. Tiene que quedar vacío.
5. Creá el repositorio y, en la carpeta del proyecto, corré:

```bash
git remote add origin https://github.com/lucsluna22-code/shesly-web.git
git push -u origin main
```

Si tu usuario de GitHub no es `lucsluna22-code`, avisame: hay que cambiarlo también en
`src/admin/config.yml`, en la línea `repo:`.

---

## Paso 2 · Conectar Netlify al repositorio

Esto reemplaza el arrastrar-el-ZIP para siempre.

En el sitio que ya tenés en Netlify: **Project configuration → Build & deploy →
Continuous deployment → Link repository**, elegís GitHub y el repositorio `shesly-web`.

Netlify va a leer la configuración del `netlify.toml` que ya está en el proyecto:

| Campo | Valor |
|---|---|
| Branch | `main` |
| Build command | `npm run build` |
| Publish directory | `_site` |
| Node version | 20 |

No hace falta tocar nada de eso. Si Netlify te lo pregunta igual, esos son los valores.

> Si preferís empezar de cero con un sitio nuevo, es *Add new project → Import an
> existing project → GitHub*. Después acordate de mover el dominio
> `sheslygutierrez.com` al sitio nuevo y de activar **Forms → Enable form detection**.

Cuando termine el primer deploy, entrá a la web y confirmá que se ve igual. Recién ahí
seguimos.

---

## Paso 3 · Crear la aplicación OAuth en GitHub

Esto es lo que le permite a Shesly entrar al panel con un botón, sin manejar claves.

1. Andá a [github.com/settings/developers](https://github.com/settings/developers) →
   **OAuth Apps** → **New OAuth App**.
2. Completá:

   - **Application name:** `Panel Shesly Gutiérrez`
   - **Homepage URL:** `https://sheslygutierrez.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`

   Esa última dirección tiene que estar **exacta**. Es de Netlify, no del sitio.

3. Registrá la app. Vas a ver el **Client ID**.
4. Tocá **Generate a new client secret** y copiá el **Client Secret** ahí mismo:
   GitHub no lo vuelve a mostrar nunca más.

---

## Paso 4 · Instalar el proveedor en Netlify

En el sitio: **Project configuration → Access & security → OAuth**, y en
*Authentication providers* tocás **Install provider** → **GitHub**. Pegás el Client ID y
el Client Secret del paso anterior y guardás.

Con esto el panel ya tiene login. **No hace falta ningún servidor propio**: Netlify hace
de intermediario. (Por eso saqué el `base_url` de la configuración: cuando no está,
el panel usa Netlify por defecto.)

---

## Paso 5 · Darle acceso a Shesly

Este es el único paso que la involucra a ella.

1. Que se cree una cuenta gratis en [github.com/signup](https://github.com/signup).
   No tiene que aprender nada de GitHub: es solo la puerta de entrada.
2. Pasame o usá su usuario: en el repositorio, **Settings → Collaborators → Add people**,
   y le das permiso **Write**.
3. Ella acepta la invitación desde el mail.

Después de eso, su recorrido es siempre el mismo:

> `sheslygutierrez.com/admin` → **Sign in with GitHub** → edita → **Publicar**.

Un minuto más tarde el cambio está en la web.

---

## Lo que va a poder editar

El panel ya tiene cargadas cinco secciones, con los campos en castellano y explicados:

| Sección | Qué contiene |
|---|---|
| 🏠 **Página de inicio** | Encabezado, video de clase real, banner del programa, testimonios (videos y capturas), entrevistas, preguntas frecuentes, precios y fechas |
| ✨ **Formaciones** | La página de VEO: temario, precio, enlaces de Stripe, duración |
| ⚙️ **Configuración del sitio** | Contacto, WhatsApp, enlace del grupo, redes, título y descripción para Google |
| 🎨 **Diseño** | Colores y tipografías de todo el sitio |
| 📄 **Páginas legales** | Privacidad y términos |

También puede subir imágenes desde el panel: se guardan solas en el lugar correcto.

---

## Para probarlo antes del paso 3

Si querés ver el panel funcionando apenas termines el paso 2, sin esperar a lo de OAuth:
entrá a `/admin` y elegí **Sign in with Token**. Generás un token en
*GitHub → Settings → Developer settings → Personal access tokens* con permiso sobre el
repositorio y lo pegás. Sirve para vos, para confirmar que todo está bien conectado.
Para Shesly no: pedirle que maneje un token es exactamente lo que estamos evitando.

---

## Dos cosas para tener presentes

**El panel muestra el código, no la web.** Shesly edita campos con nombres claros, pero
no ve el diseño mientras escribe. Si cambia un texto muy largo por uno muy corto, puede
quedar raro. Conviene avisarle que revise la web después de publicar.

**Cada publicación es un commit.** Eso significa que todo queda con historial: si algo
se rompe, se vuelve atrás en un minuto desde GitHub. Es la ventaja escondida de todo
esto.
