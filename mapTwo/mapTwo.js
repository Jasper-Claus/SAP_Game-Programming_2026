const map2Data = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,3,3,0,0,0,0,0,6,0,0,0,0,0,0,0,0,9],
    [0,0,0,5,4,0,3,3,3,0,0,3,3,0,0,0,0,0,0,4,1,1,1,1],
    [1,1,1,1,1,5,3,3,3,0,0,3,3,3,0,0,0,0,0,0,2,2,2,2],
    [2,2,2,2,2,2,3,3,3,5,5,3,3,3,3,5,4,5,5,5,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map2 = document.getElementById("map2");

for (let y = 0; y < map2Data.length; y++) {
    for (let x = 0; x < map2Data[y].length; x++) {

        const tile = document.createElement("div");
        tile.className = "tile";

        if (map2Data[y][x] === 2) {
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapTwo-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (map2Data[y][x] === 1){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapTwo-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 3){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapTwo-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 4){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 5){
            tile.className = "tile spike";
            tile.style.backgroundImage = "url('./img/mapTwo-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 6){
           tile.style.backgroundColor = "transparent";           
            const move = document.createElement('div');
            move.className = 'tile collider';

            move.id = "move";
            move.style.position = "absolute";
            move.style.width = `calc(100vw / 24)`;
            move.style.height = `calc(100vh / 12)`;
            move.style.left = `${(x * 100) / 24}vw`;
            move.style.top = `${(y * 100) / 12}vh`;


            move.style.backgroundImage = "url('./img/map-box.png')";
            move.style.backgroundSize = "cover";
            move.style.backgroundRepeat = "no-repeat";
            move.style.backgroundPosition = "center";
            move.style.zIndex = "100";

            map2.appendChild(move);
        }
        else if (map2Data[y][x] === 9){
            tile.id = "portal";
            tile.dataset.ziel = "../mapThree/mapThree.html";
            tile.style.backgroundImage = "url('./img/portal.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
            tile.style.backgroundColor = "transparent";
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map2.appendChild(tile);
    }
}

let richtung = 1;

function updateBox() {

    const blocks = document.getElementById("move");
    if (!blocks) return;

    let currentTop = parseInt(window.getComputedStyle(blocks).top) || 0;

    currentTop += richtung;

    if (currentTop >= 425) {
        richtung = -1;
    }

    if (currentTop <= 300) {
        richtung = 1;
    }

    blocks.style.top = currentTop + "px";

    requestAnimationFrame(updateBox);
    
}

updateBox();