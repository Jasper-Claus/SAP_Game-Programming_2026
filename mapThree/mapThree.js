const map3Data = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0,0,0,4,0,1,1,1,1,0,3,0,0,0,0,0],
    [0,0,0,0,3,3,0,0,0,0,4,4,0,0,0,0,0,0,3,4,0,0,0,0],
    [0,0,0,3,3,3,0,0,6,0,0,0,0,0,0,0,0,0,3,3,4,0,0,0],
    [0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
    [2,2,2,2,2,2,5,5,0,0,0,0,0,1,0,4,0,0,3,3,3,4,0,0],
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
            tile.style.backgroundImage = "url('map3-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (map3Data[y][x] === 1){
            tile.style.backgroundImage = "url('map3-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 3){
            tile.style.backgroundImage = "url('map3-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 4){
            tile.style.backgroundImage = "url('map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 5){
            tile.style.backgroundImage = "url('map3-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map3Data[y][x] === 6) {

            tile.style.backgroundColor = "transparent";

            const moving = document.createElement("div");
            moving.id = "moving";
            moving.className = "tile";

            moving.style.position = "absolute";
            moving.style.left = `${x * tileWidth}px`;
            moving.style.top = `${y * tileHeight}px`;

            moving.style.backgroundImage = "url('map-box.png')";
            moving.style.backgroundSize = "cover";
            moving.style.backgroundRepeat = "no-repeat";
            moving.style.backgroundPosition = "center";

            document.body.appendChild(moving);
        }
        else if (map3Data[y][x] === 7) {

            tile.style.backgroundColor = "transparent";

            const moving2 = document.createElement("div");
            moving2.id = "moving";
            moving2.className = "tile";

            moving2.style.position = "absolute";
            moving2.style.left = `${x * tileWidth}px`;
            moving2.style.top = `${y * tileHeight}px`;

            moving2.style.backgroundImage = "url('map-box.png')";
            moving2.style.backgroundSize = "cover";
            moving2.style.backgroundRepeat = "no-repeat";
            moving2.style.backgroundPosition = "center";

            document.body.appendChild(moving2);
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map3.appendChild(tile);
    }
}



let richtung = 1; // 1 = rechts, -1 = links

function update() {

    const blocks = document.getElementById("moving2");

    let x = parseInt(blocks.style.top);

    x += richtung;

    if (x >= 480) {      // rechte Grenze
        richtung = -1;
    }

    if (x <= 150) {      // linke Grenze
        richtung = 1;
    }

    blocks.style.top = x + "px";

    requestAnimationFrame(update);
}

update();