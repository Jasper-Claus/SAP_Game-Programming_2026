let spieler = {
    left: 100,
    top: 100
};

let jasper = {
    left: 400,
    top: 300
};

function setSpielerPosition() {
    $("#spieler").css({
        left: spieler.left + "px",
        top: spieler.top + "px"
    });
}

function setJasperPosition() {
    $("#jasper").css({
        left: jasper.left + "px",
        top: jasper.top + "px"
    });
}

function checkKollision() {

    let ziel = $("#jasper");

    let objLeft = jasper.left;
    let objTop = jasper.top;

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
            ueberlappRechts
        );

        if (minUeberlapp === ueberlappOben) {
            ziel.remove();
            alert("Gegner besiegt! Von oben getroffen.");
        } else {
            window.location.href = "gameover.html";
        }

        $(document).off("keydown");
    }
}

$(document).ready(function () {
    setSpielerPosition();
    setJasperPosition();
});

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

    if (e.code === "Space") {

        spieler.top -= 100;
        setSpielerPosition();
        checkKollision();

        setTimeout(function () {
            spieler.top += 100;
            setSpielerPosition();
            checkKollision();
        }, 200);

        return;
    }

    setSpielerPosition();
    checkKollision();
});
