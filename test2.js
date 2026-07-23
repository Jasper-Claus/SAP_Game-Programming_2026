const map2Data = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,4,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,3,3,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0],
    [0,0,0,5,4,0,3,3,3,0,0,3,3,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,1,1,1,5,3,3,3,0,0,3,3,3,0,0,0,0,0,0,2,2,2,2],
    [2,2,2,2,2,2,3,3,3,5,5,3,3,3,3,5,4,5,0,0,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map2 = document.getElementById("map2");

for (let y = 0; y < map2Data.length; y++) {
    for (let x = 0; x < map2Data[y].length; x++) {

        const tile = document.createElement("div");
        tile.className = "tile";

        if (map2Data[y][x] === 2) {
            tile.style.backgroundImage = "url('map2-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (map2Data[y][x] === 1){
            tile.style.backgroundImage = "url('map2-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 3){
            tile.style.backgroundImage = "url('map2-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 4){
            tile.style.backgroundImage = "url('map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (map2Data[y][x] === 5){
            tile.style.backgroundImage = "url('map2-spike.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map2.appendChild(tile);
    }
}