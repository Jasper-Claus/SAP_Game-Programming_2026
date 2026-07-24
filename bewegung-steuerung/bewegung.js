// let klotz = {
//     left: 100,
//     top: 100,

// } ;

// function setKlotzPosition() {
//     $("#klotz").css("left", klotz.left);
//     $("#klotz").css("top", klotz.top);

// }

// $(document).on("keydown", function (e) {
//     if (e.code == "KeyA") {
//         klotz.left = klotz.left -10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyD") {
//         klotz.left = klotz.left +10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyW") {
//         klotz.top = klotz.top -10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyS") {
//         klotz.top = klotz.top +10;
//         setKlotzPosition(); 
//     }
// });





// const spieler = document.getElementById("klotz");
// let y = 0;
// let speedY = 0;
// const gravity = 0.7;
const collider = document.querySelectorAll(".collider");

//let muenzen = document.getElementsByClassName("muenze"); // Live

const spieler = document.getElementById("spieler");

spieler.style.backgroundImage = "url('../img/prinzessinLaufen/laufen_1.png')";

const keys = {};

//let anzMuenzen = 0;
//let punkte = 0;

let x = 100;
let y = 20; // Start auf dem Boden (#ground1 ist 20px hoch)

let speedY = 0;
let speedX = 0;

const friction = 0.9;
const gravity = 0.7;
const jumpPower = 15;

let springt = false;
let dead = false;

const playerWidth = 50;
const playerHeight = 80;

// Spieler-Hitbox aus x/y berechnen (zuverlässiger als getBoundingClientRect)
function getPlayerRect() {
    return {
        left: x,
        right: x + playerWidth,
        top: window.innerHeight - y - playerHeight,
        bottom: window.innerHeight - y,
    };
}

function overlaps(a, b) {
    return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );
}

// Steht der Spieler nur leicht auf der Oberseite? Dann keine Seiten-Kollision.
function isOnTopOf(playerRect, blockRect) {
    const sink = playerRect.bottom - blockRect.top;
    return sink >= 0 && sink <= 10 && playerRect.top < blockRect.top;
}

// Beim Drücken zur Liste hinzufügen um gedrückt zu halten zu erlauben
document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

// Beim loslassen den keycode wieder auf false setzen sodass er sich nicht weiterbewegt
document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

let klotz = {
    left: 100,
    top:100,
};

let laufBilder = [
    "../img/prinzessinLaufen/laufen_1.png",
    "../img/prinzessinLaufen/laufen_2.png",
    "../img/prinzessinLaufen/laufen_3.png",
    "../img/prinzessinLaufen/laufen_4.png",
    "../img/prinzessinLaufen/laufen_5.png",
    "../img/prinzessinLaufen/laufen_6.png",
];

let aktuellesBild = 0;
let animationCounter = 0;

function animierenLaufen() {

    aktuellesBild = (aktuellesBild + 1) % laufBilder.length;

    spieler.style.backgroundImage =
        `url(${laufBilder[aktuellesBild]})`;
}

/*
// Tastendruck
document.addEventListener("keydown", function(event){
    
    if(event.code === "KeyA"){
        speedX -= 10;
    }

    if(event.code === "KeyD"){
        speedX += 10;
    }

    if(event.code === "KeyW" && springt === false){
        speedY = jumpPower;
        springt = true;
    }
    
});
*/
// Spielschleife
function update(){

    if (dead) return;

    if (false) {

    if (speedY > 0) {
        // Nach oben
        spieler.style.backgroundImage =
            "url('../img/prinzessinSpringen/springen_1.png')";
    } else {
        // Nach unten
        spieler.style.backgroundImage =
            "url('../img/prinzessinSpringen/springen_4.png')";
    }

    } else if (Math.abs(speedX) > 0.5) {

        animationCounter++;

        if (animationCounter >= 8) {
            animierenLaufen();
            animationCounter = 0;
        }

    } else {

        spieler.style.backgroundImage =
            `url(${laufBilder[0]})`;
    }

    if (keys["KeyA"]) {
        spieler.style.transform = "scaleX(-1)";
    }

    if (keys["KeyD"]) {
        spieler.style.transform = "scaleX(1)";
    }
    //Kontrolle welche gedrückt werden und darauf basierend dann bewegung oder aktionen ausführen
    //Links
    if (keys["KeyA"]) {
        speedX -= 2;
    }
    //Rechts
    if (keys["KeyD"]) {
        speedX += 2;
    }
    //Springen
    if(keys["KeyW"] && springt === false){
        speedY = jumpPower;
        springt = true;
    }

    // Reibung
    if (speedX > 0) {
        speedX -= friction;

        if (speedX < 0) {
            speedX = 0;
        }
    }

    if (speedX < 0) {
        speedX += friction;

        if (speedX > 0) {
            speedX = 0;
        }
    }

    if (speedX > 10) {
        speedX = 10;
    }

    if (speedX < -10) {
        speedX = -10;
    }

    // --- X-Achse: erst bewegen, dann Kollision auflösen ---
    x += speedX;

    // Verhindern des verlassen des browser fensters
    if ((x + playerWidth) > window.innerWidth) {
        x = window.innerWidth - playerWidth;
    }
    if (x < 0) {
        x = 0;
    }

    // Seiten-Kollisionen (Boden-Kontakt zählt nicht als Wand)
    for (const block of collider) {
        const blockRect = block.getBoundingClientRect();
        const playerRect = getPlayerRect();

        if (!overlaps(playerRect, blockRect)) continue;
        if (isOnTopOf(playerRect, blockRect)) continue;

        if (speedX > 0) {
            x = blockRect.left - playerWidth;
        } else if (speedX < 0) {
            x = blockRect.right;
        }

        speedX = 0;
    }

    // --- Y-Achse: Schwerkraft, dann Boden/Decke auflösen ---
    speedY -= gravity;
    y += speedY;

    if (y < 0) {
        y = 0;
        speedY = 0;
        springt = false;
    }

    let onGround = false;

    for (const block of collider) {
        const blockRect = block.getBoundingClientRect();
        const playerRect = getPlayerRect();

        if (!overlaps(playerRect, blockRect)) continue;

        if (speedY <= 0) {
            // Landen
            y = window.innerHeight - blockRect.top;
            speedY = 0;
            springt = false;
            onGround = true;
        } else {
            // Kopf stoßen
            y = window.innerHeight - blockRect.bottom - playerHeight;
            speedY = 0;
        }
    }

    // Von einer Kante gelaufen -> fällt
    if (!onGround && y > 0) {
        springt = true;
    }

    spieler.style.left = x + "px";
    spieler.style.bottom = y + "px";

    checkKollision();
    checkKollisionKobold();
    checkPortal();

    requestAnimationFrame(update);
}

function checkKollision() {
    if (dead) return;

    const playerRect = getPlayerRect();
    const spikes = document.querySelectorAll(".spike");

    for (const spike of spikes) {
        const spikeRect = spike.getBoundingClientRect();

        const kollidiert =
            playerRect.left < spikeRect.right &&
            playerRect.right > spikeRect.left &&
            playerRect.top < spikeRect.bottom &&
            playerRect.bottom > spikeRect.top;

        if (kollidiert) {
            dead = true;
            spieler.style.backgroundColor = "black";
            setTimeout(function () {
                location.reload();
            }, 1000);
            return;
        }
    }
}

function checkKollisionKobold() {
    const kobold = document.getElementById("kobold");
    if (!kobold || dead) return;

    const playerRect = getPlayerRect();
    const koboldRect = kobold.getBoundingClientRect();

    const kollidiert =
        playerRect.left < koboldRect.right &&
        playerRect.right > koboldRect.left &&
        playerRect.top < koboldRect.bottom &&
        playerRect.bottom > koboldRect.top;

    if (kollidiert) {
        dead = true;
        spieler.style.backgroundColor = "black";
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}

function checkPortal() {
    if (dead) return;

    const portal = document.getElementById("portal");
    if (!portal) return;

    const playerRect = getPlayerRect();
    const portalRect = portal.getBoundingClientRect();

    const kollidiert =
        playerRect.left < portalRect.right &&
        playerRect.right > portalRect.left &&
        playerRect.top < portalRect.bottom &&
        playerRect.bottom > portalRect.top;

    if (kollidiert) {
        location.href = portal.dataset.ziel;
    }
}

update();