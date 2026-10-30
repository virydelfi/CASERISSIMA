# Ejercicio: espiá tu propia página web (de forma legal) 🕵️

Hoy tenés una página web y **ni idea** de si alguien la visita, quién es o qué hace ahí.
Vamos a arreglar eso con **PostHog**, una herramienta gratuita que te muestra gente real usando tu sitio.

**Al terminar vas a poder:**
- ver a un visitante llegar en tiempo real
- mirar una grabación de lo que hizo en tu página
- saber si usó un celular o una computadora, y qué navegador

Tiempo: unas 2 horas. Pueden trabajar de a dos, pero cada una tiene que hacer los pasos al menos una vez.

---

## Parte 1: Creá tu cuenta de PostHog

- [ ] Entrá a <https://posthog.com> y hacé clic en **Get started free**.
- [ ] Registrate (con Google o con email, las dos sirven).
- [ ] Cuando te pida una región, elegí **US Cloud**. Acordate de lo que elegiste.
- [ ] Creá un proyecto llamado `casserisima`.
- [ ] Buscá el **project token**. Empieza con `phc_`. Lo ves en **Settings > Project > Project token** o en la pantalla de bienvenida.

> 💡 Este token **no es una contraseña**. Está pensado para ser público y va dentro del código de tu sitio. Solo permite *enviar* datos a tu proyecto, no leerlos.

- [ ] En **Settings > Project > Session replay**, activá **Record user sessions**. Si te salteás esto, después no vas a ver ningún video.

---

## Parte 2: Agregá PostHog a tu sitio

Tu sitio no tiene paso de compilación (build), así que usamos el snippet de HTML.

- [ ] En PostHog, abrí el **web snippet** (en la bienvenida elegí **JavaScript Web > HTML snippet**). Copiá el bloque `<script>` completo. No lo escribas a mano, es larguísimo.
- [ ] Abrí `index.html` y pegalo **justo antes de `</head>`**.
- [ ] Mirá las últimas líneas del bloque. Tienen que quedar así, con **tu** token:

```js
posthog.init('phc_TU_TOKEN_ACA', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
})
```

`person_profiles: 'identified_only'` es una línea extra que agregás vos. Significa "solo contá a un visitante como *persona* cuando sepamos quién es", y así cuidás tu cuota gratuita.

- [ ] Guardá, hacé commit y push. Usá un mensaje claro, por ejemplo `feat: agregar posthog`.
- [ ] Esperá un minuto a que GitHub Pages se actualice: <https://virydelfi.github.io/CASERISSIMA/>

---

## Parte 3: Comprobá que funciona

- [ ] Abrí tu sitio publicado en una **pestaña nueva** y hacé clic por todos lados durante 30 segundos. Scrolleá hasta el final también.
- [ ] En PostHog andá a **Activity > Live events** (o **Events**).
- [ ] Tendrías que ver un evento llamado `$pageview` con *tu* visita. 🎉

**¿No aparece nada?** Revisá esto en orden:
1. ¿GitHub Pages terminó de actualizarse? Recargá a fondo el sitio (`Ctrl+Shift+R`).
2. ¿Tenés un **bloqueador de anuncios**? Muchos bloquean las herramientas de analítica. Probá en una ventana privada sin extensiones.
3. ¿Copiaste bien el token? Sin espacios y sin caracteres de menos.
4. Abrí las DevTools (`F12`) > **Network**, recargá y buscá `posthog`. ¿Ves pedidos? ¿Qué código de estado tienen?

---

## Parte 4: Medí tu propio evento

`$pageview` es automático. Pero lo más importante de tu sitio es el **formulario que abre WhatsApp**. Vamos a contarlo.

- [ ] Abrí `script.js`. En el manejador del `submit` del formulario, buscá la línea `window.open(whatsappUrl, ...)`.
- [ ] **Justo antes** de esa línea, agregá:

```js
posthog.capture("whatsapp_form_submitted", {
  event_type: formData.get("eventType"),
});
```

- [ ] Hacé commit, push, esperá a Pages, y después completá el formulario en tu propio sitio y envialo.
- [ ] Buscá `whatsapp_form_submitted` en **Live events**. Hacé clic y mirá la propiedad `event_type`.

> ⚠️ **Nunca** mandes el nombre, el teléfono o el mensaje de una persona como propiedad de un evento. Solo mandamos el tipo de evento (cumpleaños, casamiento...). Preguntate: "¿me parecería bien que un desconocido lea esto?"

---

## Parte 5: Conseguí visitantes reales

- [ ] Mandá el link a **al menos 5 personas**. Mezclalas: algunas en celular, otras en computadora, y si podés con distintos navegadores (Chrome, Safari, Firefox).
- [ ] **Avisales** que estás midiendo el sitio. Por ejemplo: "Estoy probando analítica en mi página, ¿me ayudás abriéndola y tocando cosas?"
- [ ] Extra: armá dos links y mandá cada uno a gente distinta:
  - `https://virydelfi.github.io/CASERISSIMA/?utm_source=whatsapp`
  - `https://virydelfi.github.io/CASERISSIMA/?utm_source=instagram`

Volvé a PostHog cuando tengas algunas visitas (incluso mañana está bien).

---

## Parte 6: Explorá lo que aprendiste

Probá responder cada pregunta. No hay que entregar nada: es para que descubran qué se puede ver y se diviertan.

| # | Pregunta | Dónde mirar |
|---|----------|-------------|
| 1 | Mirá **3 grabaciones de sesión**. ¿Dónde hicieron clic? ¿Dónde dejaron de scrollear? | **Session replay** |
| 2 | ¿Qué **dirección IP** y qué **ciudad/país** tenía cada visitante? | **Events** > hacé clic en un `$pageview` > propiedades `$ip`, `$geoip_city_name`, `$geoip_country_name` |
| 3 | ¿Qué **navegador** y qué **sistema operativo**? | propiedades `$browser`, `$os` |
| 4 | **¿Celular o computadora?** ¿Qué porcentaje de cada uno? | propiedad `$device_type`, o **Web analytics** |
| 5 | ¿Qué página recibe más visitas? | **Web analytics** |
| 6 | ¿`utm_source=whatsapp` o `utm_source=instagram` trajo más gente? | **Web analytics** > Channels / UTM |
| 7 | ¿Cuántas de las personas que abrieron el sitio enviaron el formulario? | **Product analytics** > New insight > **Funnel**: `$pageview` y después `whatsapp_form_submitted` |
| 8 | Poné 3 gráficos en un **dashboard** llamado "Casserisima". | **Dashboards** > New |

Preguntas extra:
- ¿La versión para celular está realmente bien? Buscá la grabación de alguien en celular y fijate si le costó usar el menú.
- ¿A qué hora del día entra la gente?

---

## Privacidad: leé esto antes de compartir nada

Estás mirando datos de personas reales. Tratalos como tales.

- Una **dirección IP** y una ubicación son **datos personales**. Nunca las publiques, ni siquiera tapadas a medias, y nunca compartas públicamente el link de una grabación.
- Tus amigos aceptaron abrir el sitio, así que si te preguntan, mostrales lo que podés ver. Es lo justo.
- Las grabaciones ocultan por defecto lo que la gente escribe en los campos. **No lo desactives**, porque tu formulario de contacto pide nombres y teléfonos.
- Si un amigo te pide que no lo midas, podés borrar sus datos desde **Persons**.
- En **Settings > Project > General** podés activar **Discard client IP data**. Charlenlo: ¿lo activarías en un negocio real? ¿Qué perderías?
