let spieler = {
    left: 100,
    top: 100,
};

function setspielerPosition() {
    $("#spieler").css("left", spieler.left);
    $("#spieler").css("top", spieler.top);
}

let punkte = 0;
let abstand = 20;


function checkKollision() {
    let kobold = $("#kobold");
    if (kobold.length === 0) {
        return;
    }
    let objLeft = parseInt(kobold.css("left"));
    let objTop = parseInt(kobold.css("top"));
    let objGroesse = kobold.width();
    let spielerGroesse = $("#spieler").width();

    let hitbox = 60;

    let kollision =
    spieler.left < objLeft + objGroesse + hitbox &&
    spieler.left + spielerGroesse > objLeft - hitbox &&
    spieler.top < objTop + objGroesse + hitbox &&
    spieler.top + spielerGroesse > objTop - hitbox;


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
             punkte = punkte + 2;
        $("#punkteAnzeige").text("Punkte: " + punkte);
            kobold.remove();
        } else {
            window.location.href = "gameover.html";
        }
        }

    }

function checkMuenze() {
    let muenze = $("#muenze");
    let objLeft = parseInt(muenze.css("left"));
    let objTop = parseInt(muenze.css("top"));
    let objGroesse = muenze.width();
    let spielerGroesse = $("#spieler").width();

    let hitbox = 60;

    let kollision =
    spieler.left < objLeft + objGroesse + hitbox &&
    spieler.left + spielerGroesse > objLeft - hitbox &&
    spieler.top < objTop + objGroesse + hitbox &&
    spieler.top + spielerGroesse > objTop - hitbox;

    if (kollision) {
        punkte = punkte + 1;
        $("#punkteAnzeige").text("Punkte: " + punkte);
        muenze.remove();
    }
}
function checkPokal() {
    let pokal = $("#pokal");
    let objLeft = parseInt(pokal.css("left"));
    let objTop = parseInt(pokal.css("top"));
    let objGroesse = pokal.width();
    let spielerGroesse = $("#spieler").width();

    let hitbox = 60;

    let kollision =
    spieler.left < objLeft + objGroesse + hitbox &&
    spieler.left + spielerGroesse > objLeft - hitbox &&
    spieler.top < objTop + objGroesse + hitbox &&
    spieler.top + spielerGroesse > objTop - hitbox;

  
     if (kollision) {
        pokal.remove();
        window.location.href ="win.html";
     }
}
$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        spieler.left = spieler.left - 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
        checkPokal();
    }
    if (e.code === "KeyD") {
        spieler.left = spieler.left + 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
         checkPokal();
    }
    if (e.code === "KeyW") {
        spieler.top = spieler.top - 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
         checkPokal();
    }
    if (e.code === "KeyS") {
        spieler.top = spieler.top + 10;
        setspielerPosition();
        checkKollision();
        checkMuenze();
         checkPokal();
    }
});