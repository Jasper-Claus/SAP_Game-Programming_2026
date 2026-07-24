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
