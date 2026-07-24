const map3Data = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 0, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 0, 0, 0],
    [0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
    [2, 2, 2, 2, 2, 2, 5, 5, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 3, 3, 3, 4, 0, 9],
    [2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 1, 1, 2, 0, 0, 0, 7, 2, 2, 2, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 5, 5, 5, 1, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const map3 = document.getElementById("map3");
const tileW = 100 / 24; // vw
const tileH = 100 / 12; // vh

let move1StartLeft = 0;
let move1MinLeft = 0;
let move1MaxLeft = 0;
let move2StartTop = 0;
let move2MinTop = 0;
let move2MaxTop = 0;

for (let y = 0; y < map3Data.length; y++) {
    for (let x = 0; x < map3Data[y].length; x++) {
        const tile = document.createElement("div");
        tile.className = "tile";

        if (map3Data[y][x] === 2) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/mapThree-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map3Data[y][x] === 1) {
            tile.classList.add("collider");
            // mapThree.png ist das Top-Tile (kein separates *-top.png vorhanden)
            tile.style.backgroundImage = "url('./img/mapThree.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map3Data[y][x] === 3) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/mapThree-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map3Data[y][x] === 4) {
            tile.classList.add("collider");
            tile.style.backgroundImage = "url('./img/map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map3Data[y][x] === 5) {
            tile.classList.add("spike");
            tile.style.backgroundImage = "url('./img/mapThree-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else if (map3Data[y][x] === 6) {
            tile.style.backgroundColor = "transparent";

            const moving = document.createElement("div");
            moving.id = "moving";
            moving.className = "tile";
            moving.classList.add("collider");

            moving.style.position = "absolute";
            moving.style.width = `calc(100vw / 24)`;
            moving.style.height = `calc(100vh / 12)`;
            move1StartLeft = x * tileW;
            move1MinLeft = move1StartLeft;
            move1MaxLeft = move1StartLeft + tileW * 4;
            moving.style.left = `${move1StartLeft}vw`;
            moving.style.top = `${y * tileH}vh`;
            moving.style.zIndex = "100";

            moving.style.backgroundImage = "url('./img/map-box.png')";
            moving.style.backgroundSize = "cover";
            moving.style.backgroundRepeat = "no-repeat";
            moving.style.backgroundPosition = "center";

            map3.appendChild(moving);
        } else if (map3Data[y][x] === 7) {
            tile.style.backgroundColor = "transparent";

            const moving2 = document.createElement("div");
            moving2.id = "moving2";
            moving2.className = "tile";
            moving2.classList.add("collider");

            moving2.style.position = "absolute";
            moving2.style.width = `calc(100vw / 24)`;
            moving2.style.height = `calc(100vh / 12)`;
            moving2.style.left = `${x * tileW}vw`;
            move2StartTop = y * tileH;
            move2MinTop = move2StartTop - tileH * 2.5;
            move2MaxTop = move2StartTop;
            moving2.style.top = `${move2StartTop}vh`;
            moving2.style.zIndex = "100";

            moving2.style.backgroundImage = "url('./img/map-box.png')";
            moving2.style.backgroundSize = "cover";
            moving2.style.backgroundRepeat = "no-repeat";
            moving2.style.backgroundPosition = "center";

            map3.appendChild(moving2);
        } else if (map3Data[y][x] === 9) {
            tile.id = "portal";
            tile.dataset.ziel = "../win/win.html";
            tile.style.backgroundImage = "url('../img/zubehör/portal-OH.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } else {
            tile.style.backgroundColor = "transparent";
        }

        map3.appendChild(tile);
    }
}

let richtung = 1;
const moveSpeedX = 0.1; // vw pro Frame

function updateBox() {
    const blocks = document.getElementById("moving");
    if (!blocks) return;

    let left = parseFloat(blocks.style.left) || move1StartLeft;
    left += richtung * moveSpeedX;

    if (left >= move1MaxLeft) {
        left = move1MaxLeft;
        richtung = -1;
    }
    if (left <= move1MinLeft) {
        left = move1MinLeft;
        richtung = 1;
    }

    blocks.style.left = left + "vw";
    requestAnimationFrame(updateBox);
}

updateBox();

let richtung2 = -1;
const moveSpeedY = 0.08; // vh pro Frame

function update2() {
    const blocks = document.getElementById("moving2");
    if (!blocks) return;

    let top = parseFloat(blocks.style.top) || move2StartTop;
    top += richtung2 * moveSpeedY;

    if (top >= move2MaxTop) {
        top = move2MaxTop;
        richtung2 = -1;
    }
    if (top <= move2MinTop) {
        top = move2MinTop;
        richtung2 = 1;
    }

    blocks.style.top = top + "vh";
    requestAnimationFrame(update2);
}

update2();
