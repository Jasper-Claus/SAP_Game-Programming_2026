let punkte = 0;

function checkMuenze(){
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
        $("#münzenanzahl").text("Münzen: " + punkte);
        muenzen.remove();
      }

}