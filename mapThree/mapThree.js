const map3Data = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,0,0,4,0,1,1,1,1,0,3,0,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,4,4,0,0,0,0,0,0,3,4,0,0,0,0],
    [0,0,0,3,3,3,0,0,6,0,0,0,0,0,0,0,0,0,3,3,4,0,0,0],
    [0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
    [2,2,2,2,2,2,5,5,0,0,0,0,0,1,0,4,0,0,3,3,3,4,0,9],
    [2,2,2,2,2,2,1,1,1,1,0,1,1,2,0,0,0,7,2,2,2,1,1,1],
    [2,2,2,2,2,2,2,2,2,2,5,2,2,2,5,5,5,1,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map3 = document.getElementById("map3");

const tileWidth = window.innerWidth / 24;
const tileHeight = window.innerHeight / 12;

for (let y = 0; y < map3Data.length; y++) {
    for (let x = 0; x < map3Data[y].length; x++) {

        const tile = document.createElement("div");
        tile.className = "tile";

        if (map3Data[y][x] === 2) {
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapThree-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (map3Data[y][x] === 1){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapThree-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 3){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapThree-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 4){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 5){
            tile.className = "tile spike";
            tile.style.backgroundImage = "url('./img/mapThree-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 6) {

            tile.style.backgroundColor = "transparent";

            const moving = document.createElement("div");
            moving.id = "moving";
            moving.className = "tile collider";

            moving.style.position = "absolute";
            moving.style.width = tileWidth + "px";
            moving.style.height = tileHeight + "px";
            moving.style.left = `${x * tileWidth}px`;
            moving.style.top = `${y * tileHeight}px`;

            moving.style.backgroundImage = "url('./img/map-box.png')";
            moving.style.backgroundSize = "cover";
            moving.style.backgroundRepeat = "no-repeat";
            moving.style.backgroundPosition = "center";

            document.body.appendChild(moving);
        }
        else if (map3Data[y][x] === 7) {

            tile.style.backgroundColor = "transparent";

            const moving2 = document.createElement("div");
            moving2.id = "moving2";
            moving2.className = "tile collider";

            moving2.style.position = "absolute";
            moving2.style.width = tileWidth + "px";
            moving2.style.height = tileHeight + "px";
            moving2.style.left = `${x * tileWidth}px`;
            moving2.style.top = `${y * tileHeight}px`;

            moving2.style.backgroundImage = "url('./img/map-box.png')";
            moving2.style.backgroundSize = "cover";
            moving2.style.backgroundRepeat = "no-repeat";
            moving2.style.backgroundPosition = "center";

            document.body.appendChild(moving2);
        }
        else if (map3Data[y][x] === 9){
            tile.id = "portal";
            tile.dataset.ziel = "../mapOne/mapOne.html";
            tile.style.backgroundImage = "url('./img/pokal.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
            tile.style.backgroundColor = "transparent";
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map3.appendChild(tile);
    }
}



let richtung = 1; // 1 = rechts, -1 = links

function updateBox() {

    const blocks = document.getElementById("moving");
    if (!blocks) return;

    let x = parseInt(blocks.style.left);

    x += richtung;

    if (x >= 480) {      
        richtung = -1;
    }

    if (x <= 315) {     
        richtung = 1;
    }

    blocks.style.left = x + "px";

    requestAnimationFrame(updateBox);
}

updateBox();

let richtung2 = 1; // 1 = rechts, -1 = links

function updateBox2() {

    const blocks = document.getElementById("moving2");
    if (!blocks) return;

    let y = parseInt(blocks.style.top);

    y += richtung2;

    if (y >= 400) {      
        richtung2 = -1;
    }

    if (y <= 195) {   
          richtung2 = 1;
    }

    blocks.style.top = y + "px";

    requestAnimationFrame(updateBox2);
}

updateBox2();