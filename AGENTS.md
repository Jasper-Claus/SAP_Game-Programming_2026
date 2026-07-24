# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **static, client-only browser game** (SAP Game Programming 2026) — plain HTML/CSS/JS with jQuery loaded from a CDN. There is **no package manager, build step, tests, or lint** configured anywhere (no `package.json`, `Makefile`, CI, etc.). Nothing needs to be installed; `python3` and `node` are already available.

### Running the app (dev)

The only required service is a static HTTP file server. From the repo root:

```
python3 -m http.server 8000
```

Then open a module in a browser:

- `http://localhost:8000/mapOne/mapOne.html`
- `http://localhost:8000/mapTwo/mapTwo.html`
- `http://localhost:8000/mapThree/mapThree.html`

The map demos render a tile grid and a green player block moved with the WASD keys. `bewegung-steuerung/` has only `bewegung.js` + `bewegung.css` (no HTML entry point).

Internet access is needed for the map pages: jQuery is loaded from `https://code.jquery.com/jquery-3.5.1.js`.

### Non-obvious gotchas (pre-existing app bugs, NOT environment issues)

- The three `map*/*.html` files reference non-existent `test*.css` / `test*.js` (the real files are `mapOne.css`/`mapOne.js`, `mapTwo.css`/`mapTwo.js`, `mapThree.css`/`mapThree.js`). As committed, the map pages load neither their CSS nor JS, so nothing renders/moves until those references are corrected.
- Tile background images are referenced with `map1-*.png` / `map2-*.png` / `map3-*.png` names, but the committed assets are under `map<One|Two|Three>/img/` as `mapOne-*.png`, etc. Some referenced tiles (e.g. `map-box.png`, spikes, backgrounds) are also missing. So tiles show as blank divs even when JS loads.
- Because of the above, verifying the block-movement logic requires wiring an HTML page to the correct `mapX.css` / `mapX.js`. The block movement itself (WASD via jQuery) works once the JS/CSS are loaded.

### Lint / test / build

None configured. There is nothing to lint, test, or build.
