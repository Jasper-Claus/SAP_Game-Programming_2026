<div align="center">

# 👑 Prinzessinnen-Jump'n'Run

**Ein Browser-Jump'n'Run in Pixel-Optik – in 3 Tagen im Rahmen von SAP Game Programming 2026 gebaut.**

Lauf mit der Prinzessin durch drei Welten, weich Stacheln und Kobolden aus und finde das Portal zum nächsten Level.

![Level 2 – Schneeberge](docs/screenshots/mapTwo.jpg)

![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Kein Build nötig](https://img.shields.io/badge/Build-keiner%20n%C3%B6tig-success)

</div>

---

## 🎮 Spielen

Es gibt nichts zu installieren – das Spiel ist reines HTML, CSS und JavaScript.

```bash
git clone https://github.com/Jasper-Claus/SAP_Game-Programming_2026.git
cd SAP_Game-Programming_2026
python -m http.server 8000
```

Dann im Browser **http://localhost:8000** öffnen – du landest direkt in Level 1.

> 💡 Ein lokaler Server ist empfohlen. Direkt per Doppelklick auf `mapOne/mapOne.html` geht es meistens auch, manche Browser blockieren dann aber Dateien.

### Steuerung

| Taste | Aktion |
| :---: | --- |
| <kbd>A</kbd> | nach links laufen |
| <kbd>D</kbd> | nach rechts laufen |
| <kbd>W</kbd> | springen |

Stacheln und Kobolde kosten ein Leben – das Level startet dann neu. Das Portal am Ende bringt dich ins nächste Level.

## 🗺️ Die Level

| Level 1 – Grasland | Level 2 – Schneeberge |
| :---: | :---: |
| ![Level 1](docs/screenshots/mapOne.jpg) | ![Level 2](docs/screenshots/mapTwo.jpg) |
| **Level 3 – Eishöhle** | **Geschafft!** |
| ![Level 3](docs/screenshots/mapThree.jpg) | ![Gewinnbildschirm](docs/screenshots/win.jpg) |

## 📁 Projektstruktur

```text
.
├── index.html               # Einstieg, leitet zu Level 1 weiter
├── mapOne/                  # Level 1 – Grasland (HTML, CSS, Map-Logik, Tiles)
├── mapTwo/                  # Level 2 – Schneeberge
├── mapThree/                # Level 3 – Eishöhle
├── bewegung-steuerung/      # Spielerbewegung, Physik, Kollisionen, Animation
├── win/                     # Gewinnbildschirm mit Credits
├── img/                     # Sprites: Prinzessin, Kobold, Pokal, Portal …
└── docs/screenshots/        # Bilder für diese README
```

Jedes Level baut seine Karte in `mapX.js` aus einem Raster von Tile-Codes auf. `bewegung.js` wird danach geladen und kümmert sich um Laufen, Springen, Schwerkraft und alle Kollisionen.

## 👩‍💻 Team

Das Spiel ist in vier Teams entstanden:

| Team | Aufgabe |
| --- | --- |
| **1 – Aussehen der Figur** | Prinzessin, Prinz, Kobold, Münze, Game-Over- und Gewinnbildschirm |
| **2 – Bewegung & Steuerung** | Laufen, Springen, mitlaufende Kamera |
| **3 – Spielfeld** | Erd-, Stein- und Grasblöcke, Kisten, Stacheln, Hintergründe |
| **4 – Spiellogik** | Kollisionen mit Wänden, Kobolden und Items, Gewinn- und Verlierbedingungen |

### 💛 Danke an alle, die mitgebaut haben

<table align="center">
  <tr>
    <td align="center" width="140"><a href="https://github.com/Jasper-Claus"><img src="https://github.com/Jasper-Claus.png?size=120" width="80" alt=""><br><b>Jasper</b></a><br><sub>Projektleitung &amp; Integration</sub></td>
    <td align="center" width="140"><a href="https://github.com/Asha-111"><img src="https://github.com/Asha-111.png?size=120" width="80" alt=""><br><b>Asha</b></a><br><sub>10 Commits</sub></td>
    <td align="center" width="140"><a href="https://github.com/Ildi-S"><img src="https://github.com/Ildi-S.png?size=120" width="80" alt=""><br><b>Ildiko</b></a><br><sub>9 Commits</sub></td>
    <td align="center" width="140"><a href="https://github.com/AnnaGoller"><img src="https://github.com/AnnaGoller.png?size=120" width="80" alt=""><br><b>Anna</b></a><br><sub>3 Commits</sub></td>
  </tr>
  <tr>
    <td align="center" width="140"><a href="https://github.com/WhitecatVivix999"><img src="https://github.com/WhitecatVivix999.png?size=120" width="80" alt=""><br><b>Louisa</b></a><br><sub>3 Commits</sub></td>
    <td align="center" width="140"><a href="https://github.com/Juju0904"><img src="https://github.com/Juju0904.png?size=120" width="80" alt=""><br><b>Julia</b></a><br><sub>2 Commits</sub></td>
    <td align="center" width="140">👑<br><b>Ina</b><br><sub>im Team dabei</sub></td>
    <td align="center" width="140">👑<br><b>Judith</b><br><sub>im Team dabei</sub></td>
  </tr>
</table>

Jede Figur, jeder Block und jeder Sprung in diesem Spiel stammt von diesem Team – danke euch allen! 🎉

---

<div align="center">
<sub>SAP Game Programming 2026 · gebaut mit ❤️ und viel Pixel-Art</sub>
</div>
