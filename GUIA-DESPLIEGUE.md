# Guía de despliegue — Shesly Gutierrez

De cero a "web online con dominio propio y panel de edición". Unos 30–40 minutos la primera vez.

---

## Paso 1 — Subir el proyecto a GitHub

1. Creá un repositorio nuevo (privado está bien): `shesly-web`.
2. Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Sitio de Shesly Gutierrez"
git branch -M main
git remote add origin https://github.com/lucsluna22-code/shesly-web.git
git push -u origin main
```

> El video pesa 8,3 MB. Git lo maneja sin problema, no hace falta Git LFS.
>
> **¿Primera vez con Git?** Está todo desarmado paso a paso en `PASO-1-GITHUB.md`, incluida la alternativa con GitHub Desktop si preferís no usar la terminal.

---

## Paso 2 — Desplegar en Netlify

1. Entrá a [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → GitHub → elegí `shesly-web`.
2. Netlify lee `netlify.toml` y completa solo:
   - Build command: `npm run build`
   - Publish directory: `_site`
3. **Deploy**. En 1–2 minutos tenés una URL tipo `random-name.netlify.app`.

> **Alternativa: Cloudflare Pages.** Mismo build command y output `_site`. La diferencia: Cloudflare no tiene Netlify Forms, así que si querés el formulario de contacto habría que usar [Formspree](https://formspree.io) o similar. Para todo lo demás son equivalentes y ambos gratis.

---

## Paso 3 — Conectar el dominio

En Netlify: **Domain management** → **Add a domain** → escribí el dominio.

Después, en el panel de tu registrador (GoDaddy, Namecheap, Hostinger, Google Domains…):

**Opción A — delegar los DNS a Netlify (recomendado, más simple):**
cambiá los *nameservers* del dominio por los cuatro que te muestra Netlify (`dns1.p0X.nsone.net`, etc.).

**Opción B — dejar los DNS donde están:**

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `75.2.60.5` |
| CNAME | `www` | `TU-SITIO.netlify.app` |

> Netlify muestra los valores exactos en pantalla — usá esos, no estos de memoria.

La propagación tarda entre 10 minutos y 24 horas. El certificado HTTPS (Let's Encrypt) se emite solo; si aparece un error de SSL, esperá a que termine la propagación y tocá **Renew certificate**.

**Ya está configurado:** `src/_data/site.yml` apunta a `https://sheslygutierrez.com` (sin `www`), y en Netlify conviene dejar `www.sheslygutierrez.com` redirigiendo al dominio sin `www` — es la opción por defecto de Netlify cuando marcás el apex como *primary domain*. Si preferís al revés, cambiá `url:` en `site.yml` para que coincida: el sitemap, las URLs canónicas y las previsualizaciones en redes salen de ahí.

---

## Paso 4 — Activar el panel de edición (`/admin`)

El panel usa **Sveltia CMS**, que guarda los cambios directamente en GitHub. Necesita un pequeño servicio de autenticación (gratis, se instala una sola vez).

### 4.1 — Crear la OAuth App en GitHub

1. GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**.
2. Completá:
   - Application name: `Panel Shesly`
   - Homepage URL: `https://sheslygutierrez.com`
   - Authorization callback URL: `https://TU-WORKER.workers.dev/callback` *(la completás en el paso siguiente; podés volver a editarla)*
3. Guardá el **Client ID** y generá un **Client Secret**.

### 4.2 — Desplegar el worker de autenticación

Seguí el README de [`sveltia/sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth): es un botón de "Deploy to Cloudflare Workers", te pide `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET`, y te devuelve una URL `https://algo.workers.dev`. Volvé a GitHub y ajustá el callback URL con esa dirección + `/callback`.

### 4.3 — Apuntar el panel al repo

`repo` ya viene puesto. Solo falta el worker: editá `src/admin/config.yml` y cambiá `base_url`.

```yaml
backend:
  name: github
  repo: lucsluna22-code/shesly-web   # ← ya configurado
  branch: main
  base_url: https://TU-WORKER.workers.dev   # ← lo único que falta
```

Hacé commit, push, y en un minuto `https://sheslygutierrez.com/admin` pide login con GitHub.

### 4.4 — Dar acceso a la clienta

Shesly necesita una cuenta de GitHub (gratis) y que la invites al repositorio con permiso **Write**:
repo → **Settings** → **Collaborators** → **Add people**.

Con eso entra a `/admin`, edita, y cada cambio dispara un despliegue automático.

> **¿Preferís evitarle GitHub?** La alternativa es Netlify Identity + Git Gateway (login con email y contraseña). Está comentada en `src/admin/config.yml`. Es más cómodo para ella, pero Netlify lo tiene marcado como legado, así que a largo plazo conviene GitHub.

---

## Paso 5 — El brief de Shesly (`/brief`)

Se publica solo junto con el sitio. La URL es `https://sheslygutierrez.com/brief` — no está enlazada desde ningún lado y está bloqueada para Google, así que solo entra quien tenga el link.

Lo único que hay que hacer, **una vez**, es decirle a Netlify a qué correo mandarte las respuestas:

1. Netlify → **Forms** → vas a ver el formulario `brief-shesly` después del primer despliegue.
2. **Form notifications** → **Add notification** → *Email notification*.
3. Poné tu correo y elegí `brief-shesly` en el desplegable de formularios.

Las respuestas quedan además guardadas en el panel de Netlify y se pueden exportar a CSV.

> El formulario guarda lo que ella escribe en su propio navegador mientras completa. Si cierra la pestaña y vuelve más tarde desde el mismo dispositivo, retoma donde quedó. Al enviar, se borra ese borrador.

---

## Paso 6 — Formulario de contacto

La sección de contacto viene **apagada** (para que el sitio quede idéntico al original). Para encenderla: `/admin` → **Página de inicio** → sección `contacto` → *Visible*.

Usa **Netlify Forms**: los mensajes llegan a **Forms** en el panel de Netlify. Para recibirlos por email: Netlify → **Forms** → **Form notifications** → **Add notification** → *Email notification* → poné `hola@sheslygutierrez.com`.

Plan gratuito: 100 envíos por mes.

---

## Paso 7 — Analítica y píxeles

`/admin` → **Configuración del sitio** → **Analítica**:

- **Google Analytics**: pegá el ID `G-XXXXXXXXXX`.
- **Meta Pixel**: pegá el ID numérico.
- **Google Search Console**: pegá el código del método "etiqueta HTML" y después verificá.

El sitio ya dispara un evento `contacto_whatsapp` (GA) y `Contact` (Meta) en cada click a WhatsApp, con el nombre de la formación.

---

## Paso 8 — Redirigir el sitio viejo

El sitio en Firebase sigue vivo en `shesly-972c4.web.app`. Para no dividir el tráfico ni el SEO, redirigilo al dominio nuevo:

```json
// firebase.json
{
  "hosting": {
    "public": "public",
    "redirects": [
      { "source": "/**", "destination": "https://sheslygutierrez.com", "type": 301 }
    ]
  }
}
```

Y `firebase deploy --only hosting`. Si no tenés acceso al proyecto de Firebase, pedíselo a quien lo desplegó.

---

## Checklist antes de dar por cerrado

- [ ] HTTPS activo y `www.sheslygutierrez.com` redirige al apex
- [ ] `/admin` abre y guarda cambios
- [ ] Notificación por mail del formulario `brief-shesly` configurada
- [ ] Link de `/brief` enviado a Shesly
- [ ] Shesly entró al panel al menos una vez y editó algo
- [ ] Formulario probado de punta a punta (si lo activaste)
- [ ] Sitio verificado en Google Search Console y sitemap enviado
- [ ] Redirección desde el `.web.app` viejo
- [ ] Enlace de Facebook en el pie: ponerlo o dejarlo vacío (en el original apuntaba a `#`)
