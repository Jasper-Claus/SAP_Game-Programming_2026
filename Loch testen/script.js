const collider = document.querySelectorAll(".collider");
const solidColliders = Array.from(collider).filter((el) => el.id !== "spike");

const spieler = document.getElementById("spieler");
const keys = {};

let x = 100;
let y = 20;
let speedY = 0;
let speedX = 0;

const friction = 0.9;
const gravity = 0.7;
const jumpPower = 15;

let springt = false;
let dead = false;

const playerWidth = 50;
const playerHeight = 80;

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

function isOnTopOf(playerRect, blockRect) {
    const sink = playerRect.bottom - blockRect.top;
    return sink >= 0 && sink <= 10 && playerRect.top < blockRect.top;
}

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

function update() {
    if (dead) return;

    if (keys["KeyA"]) {
        speedX -= 2;
    }

    if (keys["KeyD"]) {
        speedX += 2;
    }

    if (keys["KeyW"] && springt === false) {
        speedY = jumpPower;
        springt = true;
    }

    if (speedX > 0) {
        speedX -= friction;
        if (speedX < 0) speedX = 0;
    }

    if (speedX < 0) {
        speedX += friction;
        if (speedX > 0) speedX = 0;
    }

    if (speedX > 10) speedX = 10;
    if (speedX < -10) speedX = -10;

    x += speedX;

    if (x + playerWidth > window.innerWidth) {
        x = window.innerWidth - playerWidth;
    }
    if (x < 0) {
        x = 0;
    }

    for (const block of solidColliders) {
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

    speedY -= gravity;
    y += speedY;

    if (y < 0) {
        y = 0;
        speedY = 0;
        springt = false;
    }

    let onGround = false;

    for (const block of solidColliders) {
        const blockRect = block.getBoundingClientRect();
        const playerRect = getPlayerRect();

        if (!overlaps(playerRect, blockRect)) continue;

        if (speedY <= 0) {
            y = window.innerHeight - blockRect.top;
            speedY = 0;
            springt = false;
            onGround = true;
        } else {
            y = window.innerHeight - blockRect.bottom - playerHeight;
            speedY = 0;
        }
    }

    if (!onGround && y > 0) {
        springt = true;
    }

    spieler.style.left = x + "px";
    spieler.style.bottom = y + "px";

    checkKollision();
    requestAnimationFrame(update);
}

function checkKollision() {
    const spike = document.getElementById("spike");
    if (!spike || dead) return;

    const playerRect = getPlayerRect();
    const spikeRect = spike.getBoundingClientRect();

    const kollidiert =
        playerRect.left < spikeRect.right &&
        playerRect.right > spikeRect.left &&
        playerRect.top < spikeRect.bottom &&
        playerRect.bottom > spikeRect.top;

    if (kollidiert) {
        dead = true; q
        spieler.style.backgroundColor = "black";
    }
}

update();