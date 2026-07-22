let spieler = {
    left: 300,
    top: 100,
    ground: 100,
    velocityY: 0,
    isJumping: false,
};

function setspielerPosition() {
    $("#spieler").css("left", spieler.left);
    $("#spieler").css("top", spieler.top);
}
$(function () {
    setspielerPosition();
});
function collision() {
    let ziel = $("#ziel");

    let objLeft = parseInt(ziel.css("left"));
    let objTop = parseInt(ziel.css("top"));
    let objGroesse = ziel.width();

    let spielerGroesse = $("#spieler").width();

    let kollision =
        spieler.left < objLeft + objGroesse &&
        spieler.left + spielerGroesse > objLeft &&
        spieler.top < objTop + objGroesse &&
        spieler.top + spielerGroesse > objTop;

    if (kollision) {

        let ueberlappenOben = spieler.top + spielerGroesse - objTop;
        let ueberlappenUnten = objTop + objGroesse - spieler.top;
        let ueberlappenLinks = spieler.left + spielerGroesse - objLeft;
        let ueberlappenRechts = objLeft + objGroesse - spieler.left;

        let minUeberlappen = Math.min(
            ueberlappenOben,
            ueberlappenUnten,
            ueberlappenLinks,
            ueberlappenRechts
        );

        if (minUeberlappen === ueberlappenOben) {
            window.location.href = "portal.html";
        } else {
            window.location.href = "münzenSammeln.html";
        }
    }
}
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
    }
}
spieler.top += spieler.velocityY;

setInterval(springen, 20);
$(document).on("keydown", function (e) {

    if (e.code === "KeyA") {
        spieler.left -= 10;
    }

    if (e.code === "KeyD") {
        spieler.left += 10;
    }

    if (e.code === "KeyW") {
        spieler.top -= 10;
    }

    if (e.code === "KeyS") {
        spieler.top += 10;
    }

    if (e.code === "Space" && !spieler.isJumping) {
        spieler.ground = spieler.top;
        spieler.velocityY = -15;
        spieler.isJumping = true;
    }

    setspielerPosition();
    collision();
});