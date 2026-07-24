const spieler = document.getElementById("spieler");

spieler.style.backgroundImage = "url('../img/prinzessinLaufen/laufen_1.png')";

const keys = {};

let x = 100;
let y = 20;

let speedY = 0;
let speedX = 0;

const accel = 1.4;
const friction = 0.82;
const gravity = 0.75;
const jumpPower = 15.5;
const maxSpeed = 8;

let springt = false;
let dead = false;
let portalUsed = false;

const playerWidth = 50;
const playerHeight = 80;

const prevBlockRects = new WeakMap();
let groundedBlock = null;

function getColliders() {
    return document.querySelectorAll(".collider");
}

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

// Steht der Spieler auf der Oberseite? (toleranter bei schnellen Fall)
function isOnTopOf(playerRect, blockRect) {
    const sink = playerRect.bottom - blockRect.top;
    return sink >= 0 && sink <= 22 && playerRect.top < blockRect.top;
}

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

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
    spieler.style.backgroundImage = `url(${laufBilder[aktuellesBild]})`;
}

function update() {
    if (dead || portalUsed) return;

    // Mit beweglichen Plattformen mitfahren
    if (groundedBlock) {
        const rect = groundedBlock.getBoundingClientRect();
        const prev = prevBlockRects.get(groundedBlock);
        if (prev) {
            x += rect.left - prev.left;
            y += prev.top - rect.top;
        }
    }

    if (false) {
        if (speedY > 0) {
            spieler.style.backgroundImage =
                "url('../img/prinzessinSpringen/springen_1.png')";
        } else {
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
        spieler.style.backgroundImage = `url(${laufBilder[0]})`;
    }

    if (keys["KeyA"]) {
        spieler.style.transform = "scaleX(-1)";
        speedX -= accel;
    }
    if (keys["KeyD"]) {
        spieler.style.transform = "scaleX(1)";
        speedX += accel;
    }
    if (keys["KeyW"] && springt === false) {
        speedY = jumpPower;
        springt = true;
        groundedBlock = null;
    }

    // Reibung nur ohne Tasteneingabe
    if (!keys["KeyA"] && !keys["KeyD"]) {
        speedX *= friction;
        if (Math.abs(speedX) < 0.15) speedX = 0;
    }

    if (speedX > maxSpeed) speedX = maxSpeed;
    if (speedX < -maxSpeed) speedX = -maxSpeed;

    const collider = getColliders();

    // --- X-Achse ---
    x += speedX;

    if (x + playerWidth > window.innerWidth) {
        x = window.innerWidth - playerWidth;
    }
    if (x < 0) {
        x = 0;
    }

    for (const block of collider) {
        const blockRect = block.getBoundingClientRect();
        const playerRect = getPlayerRect();

        if (!overlaps(playerRect, blockRect)) continue;
        if (isOnTopOf(playerRect, blockRect)) continue;

        if (speedX > 0) {
            x = blockRect.left - playerWidth;
        } else if (speedX < 0) {
            x = blockRect.right;
        } else {
            // Steckt trotzdem in der Wand (z.B. durch Plattform)
            const overlapLeft = playerRect.right - blockRect.left;
            const overlapRight = blockRect.right - playerRect.left;
            if (overlapLeft < overlapRight) {
                x = blockRect.left - playerWidth;
            } else {
                x = blockRect.right;
            }
        }

        speedX = 0;
    }

    // --- Y-Achse ---
    speedY -= gravity;
    y += speedY;

    if (y < 0) {
        y = 0;
        speedY = 0;
        springt = false;
        groundedBlock = null;
    }

    let onGround = false;
    groundedBlock = null;

    for (const block of collider) {
        const blockRect = block.getBoundingClientRect();
        const playerRect = getPlayerRect();

        if (!overlaps(playerRect, blockRect)) continue;

        if (speedY <= 0) {
            y = window.innerHeight - blockRect.top;
            speedY = 0;
            springt = false;
            onGround = true;
            groundedBlock = block;
        } else {
            y = window.innerHeight - blockRect.bottom - playerHeight;
            speedY = 0;
        }
    }

    if (!onGround && y > 0) {
        springt = true;
        groundedBlock = null;
    }

    // Positionen der Collider fürs Mitfahren merken
    for (const block of collider) {
        const r = block.getBoundingClientRect();
        prevBlockRects.set(block, { left: r.left, top: r.top });
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

    const spikes = document.querySelectorAll(".spike");
    const playerRect = getPlayerRect();

    for (const spike of spikes) {
        const spikeRect = spike.getBoundingClientRect();
        // Etwas kleinere Hitbox → fairer an den Kanten
        const hit = {
            left: spikeRect.left + 8,
            right: spikeRect.right - 8,
            top: spikeRect.top + 10,
            bottom: spikeRect.bottom,
        };

        if (overlaps(playerRect, hit)) {
            dead = true;
            spieler.style.backgroundColor = "black";
            setTimeout(() => location.reload(), 1000);
            return;
        }
    }
}

function checkKollisionKobold() {
    const kobold = document.getElementById("kobold");
    if (!kobold || dead) return;

    if (overlaps(getPlayerRect(), kobold.getBoundingClientRect())) {
        dead = true;
        spieler.style.backgroundColor = "black";
        setTimeout(() => location.reload(), 1000);
    }
}

function checkPortal() {
    const portal = document.getElementById("portal");
    if (!portal || dead || portalUsed) return;

    if (overlaps(getPlayerRect(), portal.getBoundingClientRect())) {
        portalUsed = true;
        const ziel = portal.dataset.ziel;
        if (ziel) {
            window.location.href = ziel;
        }
    }
}

update();
