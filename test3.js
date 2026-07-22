const map3Data = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,3,0,4,4,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,2,2,5,0,0,3,3,0,0,0,0,0,3,0,5,0,0,0,0,0],
    [1,1,1,2,2,2,1,1,1,2,2,0,0,0,0,1,2,1,1,1,0,1,1,1],
    [2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,2,0,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map3 = document.getElementById("map3");

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
        else {
            tile.style.backgroundColor = "transparent";
        }

        map3.appendChild(tile);
    }
}