const map2Data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 5, 4, 0, 3, 3, 3, 0, 0, 3, 3, 6, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 5, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 3, 3, 3, 5, 5, 3, 3, 3, 3, 5, 4, 5, 6, 5, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const map2 = document.getElementById("map2");
const tileH = 100 / 12; // vh

// alle beweglichen Plattformen
const movers = [];

for (let y = 0; y < map2Data.length; y++) {
    for (let x = 0; x < map2Data[y].length; x++) {
        const tile = document.createElement("div");
        tile.className = "tile";

        if (map2Data[y][x] === 2) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/mapTwo-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map2Data[y][x] === 1) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/mapTwo-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map2Data[y][x] === 3) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/mapTwo-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map2Data[y][x] === 4) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map2Data[y][x] === 5) {
            tile.classList.add("spike");
            tile.style.backgroundImage = "url('./img/mapTwo-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map2Data[y][x] === 6) {
            // Kobold = Spike mit anderem Bild, steht still
            tile.classList.add("spike");
            tile.style.backgroundImage =
                "url('../img/trollLaufen/laufen_1.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "bottom center";
        } else if (map2Data[y][x] === 8) {
            // Bewegliche Kiste
            tile.style.backgroundColor = "transparent";

            const move = document.createElement("div");
            move.className = "tile collider mover";
            move.style.position = "absolute";
            move.style.width = `calc(100vw / 24)`;
            move.style.height = `calc(100vh / 12)`;
            move.style.left = `${(x * 100) / 24}vw`;

            const startTop = (y * 100) / 12;
            move.style.top = `${startTop}vh`;

            move.style.backgroundImage = "url('./img/map-box.png')";
            move.style.backgroundSize = "cover";
            move.style.backgroundRepeat = "no-repeat";
            move.style.backgroundPosition = "center";
            move.style.zIndex = "100";

            map2.appendChild(move);

            movers.push({
                el: move,
                top: startTop,
                min: startTop,
                max: startTop + tileH * 2,
                richtung: 1,
                speed: 0.08,
            });
        } else if (map2Data[y][x] === 9) {
            tile.id = "portal";
            tile.dataset.ziel = "../mapThree/mapThree.html";
            tile.style.backgroundImage = "url('../img/zubehör/portal-OH.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else {
            tile.style.backgroundColor = "transparent";
        }

        map2.appendChild(tile);
    }
}

// bewegt jeden Mover unabhängig zwischen min und max
function updateBox() {
    for (const m of movers) {
        m.top += m.richtung * m.speed;

        if (m.top >= m.max) {
            m.top = m.max;
            m.richtung = -1;
        }
        if (m.top <= m.min) {
            m.top = m.min;
            m.richtung = 1;
        }

        m.el.style.top = m.top + "vh";
    }
    requestAnimationFrame(updateBox);
}

updateBox();
