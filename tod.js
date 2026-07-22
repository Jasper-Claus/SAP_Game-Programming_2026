let spieler = {
    left: 100,
    top: 100,
};

function setspielerPosition() {
    $("#spieler").css("left", spieler.left);
    $("#spieler").css("top", spieler.top);
}

let punkte = 0;

function checkKollision() {
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
        let ueberlappOben = spieler.top + spielerGroesse - objTop;
        let ueberlappUnten = objTop + objGroesse - spieler.top;
        let ueberlappLinks = spieler.left + spielerGroesse - objLeft;
        let ueberlappRechts = objLeft + objGroesse - spieler.left;
        let minUeberlapp = Math.min(
            ueberlappOben,
            ueberlappUnten,
            ueberlappLinks,
            ueberlappRechts,
        );
        if (minUeberlapp === ueberlappOben) {
            ziel.remove();
        } else {
            $("#gameOver").show();
        }

    }
}

function checkMuenze() {
    let muenze = $("#muenze");
    let objLeft = parseInt(muenze.css("left"));
    let objTop = parseInt(muenze.css("top"));
    let objGroesse = muenze.width();
    let spielerGroesse = $("#spieler").width();

    let kollision =
        spieler.left < objLeft + objGroesse &&
        spieler.left + spielerGroesse > objLeft &&
        spieler.top < objTop + objGroesse &&
        spieler.top + spielerGroesse > objTop;

    if (kollision) {
        punkte = punkte + 1;
        $("#punkteAnzeige").text("Punkte: " + punkte);
        muenze.remove();
    }
}

$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        spieler.left = spieler.left - 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
    }
    if (e.code === "KeyD") {
        spieler.left = spieler.left + 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
    }
    if (e.code === "KeyW") {
        spieler.top = spieler.top - 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
    }
    if (e.code === "KeyS") {
        spieler.top = spieler.top + 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
    }
});
