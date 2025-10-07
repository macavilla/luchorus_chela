# luchorus_chela

Astro + react + hydra-synth + sonido

[wORK IN PROGRESSSSS](https://macavilla.github.io/luchorus_chela/)

## Correr localmente

Clonar [el repo de github](https://github.com/macavilla/luchorus_chela) y dentro del mismo correr los siguientes comandos:

instalar las dependencias:

```
npm install
```

levantar el servidor local:

```
npm run dev
```

podrá verse corriendo en http://localhost:4321/

## 🌀 HydraCanvas.jsx

Este componente encapsula la inicialización y renderizado de Hydra-synth. crea una instancia de Hydra vinculada a un `<canvas>` y ejecuta un patch visual definido en `lib/hydra-patches.js`.

El flow es:

- Se referencia el canvas con useRef.
- En useEffect, se importa Hydra de forma dinámica (solo en el cliente, para evitar errores SSR).
- Se crea una nueva instancia new Hydra({ canvas, detectAudio: false }).
- Se aplica un patch de prueba (por ejemplo, osc().kaleid(4).out()).
- Al desmontarse el componente, se limpian los recursos.

---

## Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
