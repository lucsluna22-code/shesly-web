# Subir el proyecto a GitHub — paso a paso

Guía detallada del Paso 1 de `GUIA-DESPLIEGUE.md`, pensada para Windows.

---

## 0. Preparar la carpeta

Descomprimí `shesly-web.zip`. Te queda una carpeta `shesly-web` con `package.json`, `netlify.toml`, `src/` y las guías adentro.

Dejala en una ruta cómoda, por ejemplo:

```
C:\Users\lucsl\Desktop\Projects Lucas Luna\SHESLY GUTIERREZ V.E.O\shesly-web
```

> Verificá que `package.json` esté en la raíz de esa carpeta, no dentro de otra subcarpeta `shesly-web\shesly-web`. Si quedó anidado, subí el contenido un nivel.

---

## 1. Instalar Git (si no lo tenés)

Descargalo de [git-scm.com/download/win](https://git-scm.com/download/win) e instalalo con las opciones por defecto.

Para comprobar que quedó: abrí PowerShell y escribí

```bash
git --version
```

Si responde algo como `git version 2.47.0`, listo. Si dice "no se reconoce", cerrá y volvé a abrir la terminal.

---

## 2. Decirle a Git quién sos (solo una vez en la vida)

```bash
git config --global user.name "Lucas Luna"
git config --global user.email "tu-email@ejemplo.com"
```

Ese email queda escrito en cada commit. Si no querés exponer el tuyo, GitHub te da uno privado en **Settings → Emails → Keep my email addresses private** (tipo `12345+usuario@users.noreply.github.com`).

---

## 3. Crear el repositorio vacío en GitHub

1. Entrá a [github.com/new](https://github.com/new).
2. **Repository name**: `shesly-web`
3. **Description** (opcional): `Sitio web de Shesly Gutierrez`
4. Elegí **Private**.
5. ⚠️ **No marques nada** en "Initialize this repository with": ni README, ni .gitignore, ni license.
6. **Create repository**.

> El punto 5 es el que más problemas causa. Si el repo se crea con archivos adentro, el primer `push` va a ser rechazado porque tu carpeta local y el repo remoto tienen historias distintas. La solución está más abajo, en "Errores comunes".

El nombre tiene que ser exactamente `shesly-web`: el panel de edición ya viene apuntando a `lucsluna22-code/shesly-web`. Si le ponés otro nombre, actualizá `repo:` en `src/admin/config.yml`.

---

## 4. Abrir la terminal dentro de la carpeta

Entrá a la carpeta `shesly-web` en el Explorador de Windows, hacé click derecho en un espacio vacío y elegí **"Open Git Bash here"** (o **"Abrir en Terminal"**).

Si preferís abrir PowerShell aparte, primero movete a la carpeta — las comillas son necesarias porque la ruta tiene espacios:

```bash
cd "C:\Users\lucsl\Desktop\Projects Lucas Luna\SHESLY GUTIERREZ V.E.O\shesly-web"
```

Confirmá que estás en el lugar correcto:

```bash
ls
```

Tenés que ver `package.json`, `netlify.toml`, `src`, `README.md`.

---

## 5. Los cinco comandos

Copialos y pegalos **de a uno**, esperando que cada uno termine.

```bash
git init -b main
```
Crea el repositorio local. Aparece una carpeta oculta `.git` — no la toques.

```bash
git add .
```
Marca todos los archivos para el primer commit. El punto significa "todo lo que hay acá". El archivo `.gitignore` del proyecto se encarga de excluir `node_modules/` y `_site/`.

```bash
git commit -m "Sitio de Shesly Gutierrez"
```
Guarda la foto del proyecto en tu historial local. El texto entre comillas es la descripción del cambio.

```bash
git remote add origin https://github.com/lucsluna22-code/shesly-web.git
```
Conecta tu carpeta con el repositorio de GitHub. `origin` es simplemente el apodo del remoto.

```bash
git push -u origin main
```
Sube todo. El `-u` deja recordada la conexión, así de acá en adelante te alcanza con `git push` a secas.

---

## 6. Autenticarte

En el `push` se abre una ventana pidiendo tu identidad. Elegí **"Sign in with your browser"** → **Authorize**. Windows guarda las credenciales y no vuelve a preguntar.

> Si en cambio la terminal te pide usuario y contraseña: **la contraseña de GitHub ya no sirve** para esto desde 2021. Necesitás un token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token**, marcá el permiso `repo`, copialo y pegalo donde pide la contraseña. Guardalo en algún lado: no lo vas a poder ver de nuevo.

---

## 7. Verificar que salió bien

Recargá la página del repositorio en GitHub. Tenés que ver:

- **72 archivos**, con `src/`, `package.json`, `netlify.toml`, `README.md`
- **NO** debe aparecer `node_modules/` ni `_site/`

Si aparece `node_modules` (miles de archivos), algo falló con el `.gitignore`. Frená y arreglalo antes de seguir:

```bash
git rm -r --cached node_modules
git commit -m "Ignorar node_modules"
git push
```

Con eso hecho, seguí en el **Paso 2** de `GUIA-DESPLIEGUE.md`: conectar Netlify.

---

## El día a día, de acá en adelante

Cada vez que cambies algo en el código:

```bash
git add .
git commit -m "Descripción corta de qué cambiaste"
git push
```

Tres comandos, siempre los mismos. Netlify detecta el push y redespliega solo en 1–2 minutos.

Cuando Shesly edite desde `/admin`, los cambios se guardan directo en GitHub. Antes de tocar código, traelos a tu máquina:

```bash
git pull
```

Si te salteás ese `pull` y editás igual, el `push` va a ser rechazado por conflicto. Se resuelve, pero es tiempo perdido — hacelo por costumbre.

---

## Errores comunes

**`src refspec main does not match any`**
Te faltó el `git commit`. Corré `git add .` y `git commit -m "..."` antes del push.

**`Updates were rejected because the remote contains work that you do not have locally`**
Creaste el repo con README o .gitignore. Solución:

```bash
git pull --rebase origin main
git push -u origin main
```

**`remote origin already exists`**
Ya habías corrido el `git remote add`. Corregí la dirección en vez de agregarla:

```bash
git remote set-url origin https://github.com/lucsluna22-code/shesly-web.git
```

**`git` no se reconoce como comando**
Git quedó instalado pero la terminal estaba abierta de antes. Cerrala y abrí una nueva.

**`fatal: not a git repository`**
Estás parado en otra carpeta. Corré `pwd` para ver dónde estás y volvé a `shesly-web`.

---

## Alternativa sin terminal: GitHub Desktop

Si preferís evitar los comandos, [desktop.github.com](https://desktop.github.com) hace lo mismo con botones:

1. Instalalo e iniciá sesión con tu cuenta.
2. **File → Add local repository** → elegí la carpeta `shesly-web`.
3. Te avisa que no es un repositorio todavía → **create a repository** → **Create repository**.
4. Escribí un mensaje en el campo de abajo a la izquierda → **Commit to main**.
5. **Publish repository** arriba a la derecha → destildá "Keep this code private" solo si lo querés público → **Publish**.

Para los cambios siguientes: escribís el mensaje, **Commit to main**, y **Push origin**.

Funciona igual de bien. La terminal es más rápida una vez que le agarrás la mano, pero no hay ninguna diferencia en el resultado.
