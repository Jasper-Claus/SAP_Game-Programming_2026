let klotz=  {
    left: 100,
    top: 100,
};

function setKlotzPosition() {
    $("#klotz").css("left", klotz.left);
    $("#klotz").css("top", klotz.top);
}

$(document).on("keydown", function (e){
    if (e.code === "KeyA"){
        klotz.left = klotz.left - 10;
        setKlotzPosition();
    }
    if (e.code === "KeyD"){
        klotz.left = klotz.left + 10;
        setKlotzPosition();
    }
    if (e.code === "KeyW"){
        klotz.top = klotz.top - 10;
        setKlotzPosition();
    }
    if (e.code === "KeyS"){
        klotz.top = klotz.top + 10;
        setKlotzPosition();
    }
});



const mapData = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,0,0,0,0,0,4,4,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,2,2,0,0,0,3,0,0,0,0,0,0,1,0,3,0,0,0,0,0],
    [1,1,1,2,2,2,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1],
    [2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,2,2,2,2,2,0,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

const map = document.getElementById("map");

for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {

        const tile = document.createElement("div");
        tile.className = "tile";

        if (mapData[y][x] === 2) {
            tile.style.backgroundImage = "url('map1-earth.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        } 
        else if (mapData[y][x] === 1){
            tile.style.backgroundImage = "url('map1-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 3){
            tile.style.backgroundImage = "url('map1-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 4){
            tile.style.backgroundImage = "url('map1-top.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else {
            tile.style.backgroundColor = "transparent";
        }

        map.appendChild(tile);
    }
}