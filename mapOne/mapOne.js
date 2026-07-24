const mapData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,3,0,4,4,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,2,2,5,0,0,3,3,0,0,0,0,0,3,0,5,0,0,0,0,9],
    [1,1,1,2,2,2,1,1,1,2,2,0,0,0,0,1,2,1,1,1,0,1,1,1],
    [2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map = document.getElementById("map");

for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {

        const tile = document.createElement("div");
        tile.className = "tile";

        if (mapData[y][x] === 2) {
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapOne-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (mapData[y][x] === 1){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapOne-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 3){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/mapOne-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 4){
            tile.className = "tile collider";
            tile.style.backgroundImage = "url('./img/map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 5){
            tile.className = "tile spike";
            tile.style.backgroundImage = "url('./img/mapOne-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 9){
            tile.id = "portal";
            tile.dataset.ziel = "../mapTwo/mapTwo.html";
            tile.style.backgroundImage = "url('./img/portal.png')";
            tile.style.backgroundSize = "contain";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
            tile.style.backgroundColor = "transparent";
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map.appendChild(tile);
    }
}