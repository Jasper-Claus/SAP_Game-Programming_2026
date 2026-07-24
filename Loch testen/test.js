    let spieler = { left: 100, top: 100, ground: 100, velocityY: 0, isJumping: false, };

function checkKollision() {
    let ziel = $("#ziel");

    let objLeft   = parseInt(ziel.css("left"));
    let objTop    = parseInt(ziel.css("top"));
    let objBreite = ziel.width();
    let objHoehe  = ziel.height();

    let spielerBreite = $("#spieler").width();
    let spielerHoehe  = $("#spieler").height();

    let kollision =
        spieler.left < objLeft + objBreite &&
        spieler.left + spielerBreite > objLeft &&
        spieler.top < objTop + objHoehe &&
        spieler.top + spielerHoehe > objTop;
        if (kollision) {
        let ueberlappOben   = spieler.top + spielerHoehe - objTop;
        let ueberlappUnten  = objTop + objHoehe - spieler.top;
        let ueberlappLinks  = spieler.left + spielerBreite - objLeft;
        let ueberlappRechts = objLeft + objBreite - spieler.left;

        let minUeberlapp = Math.min(
            ueberlappOben, ueberlappUnten,
            ueberlappLinks, ueberlappRechts
        );

        if (kollision) {
            window.location.href = "############# muss noch geändert werden #############.html";
        }
    }
}

function setspielerPosition() {
    $("#spieler").css("left", spieler.left);
    $("#spieler").css("top", spieler.top);
}

$(function () {
    setspielerPosition();
});

function springen() {
    if (spieler.isJumping) {
        spieler.top += spieler.velocityY;
        spieler.velocityY += 1; // Schwerkraft

        if (spieler.top >= spieler.ground) {
            spieler.top = spieler.ground;
            spieler.velocityY = 0;
            spieler.isJumping = false;
        }

        setspielerPosition();
        checkKollision();
    }
}

setInterval(springen, 20);

$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        spieler.left -= 10;
    }
    if (e.code === "KeyD") {
        spieler.left += 10;
    }
    if (e.code === "KeyS") {
        spieler.top += 10;
    }
    if (e.code === "KeyW" && !spieler.isJumping) {
        spieler.ground = spieler.top;
        spieler.velocityY = -15;
        spieler.isJumping = true;
    }

    setspielerPosition();
    checkKollision();
});
const mapData = [
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
    [2,2,2,2,2,2,2,2,2,2,2,5,5,5,5,2,2,2,2,2,5,2,2,2],
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
            tile.style.backgroundImage = "url('map1-stone.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 4){
            tile.style.backgroundImage = "url('map-box.png')";
            tile.style.backgroundSize = "cover";
            tile.style.backgroundRepeat = "no-repeat";
            tile.style.backgroundPosition = "center";
        }
        else if (mapData[y][x] === 5){
            tile.style.backgroundImage = "url('map1-spikeee.png')";
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