let spieler = {
    left: 300,
    top: 100,
    ground: 100,
    velocityY: 0,
    isJumping: false,
};
let münze = {
    left: 200,
    top: 200,
    eingesammelt: false,
};
let punkte = 0;
let muenzeGroesse = 50;

let offsetX = 60;
let offsetY = 120;
let hitboxBreite = 150;
let hitboxHoehe = 270;


function setspielerPosition() {
    $("#spieler").css("left",spieler.left);
    $("#spieler").css("top",spieler.top);
}

function checkKollision() {
    if (münze.eingesammelt) {
        return;
    }
if (
    spieler.left + offsetX < münze.left + muenzeGroesse &&
    spieler.left + offsetX + hitboxBreite > münze.left -30 &&
    spieler.top + offsetY < münze.top + muenzeGroesse &&
    spieler.top + offsetY + hitboxHoehe > münze.top
) {
    // Münze einsammeln {
        punkte++;
        $("#münzenanzahl").text("Münzen: " + punkte);

        münze.eingesammelt = true;
        $("#münze").hide();
    }

}


    function updateJump() {
    if (spieler.isJumping) {
        spieler.velocityY += 1;
        spieler.top += spieler.velocityY;

        if (spieler.top >= spieler.ground) {
            spieler.top = spieler.ground;
            spieler.velocityY = 0;
            spieler.isJumping = false;
        }

        setspielerPosition();
        checkKollision();
    }
    }



$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        spieler.left = spieler.left - 10;
        setspielerPosition();
        checkKollision();
    }
    if (e.code === "KeyD") {
        spieler.left = spieler.left + 10;
        setspielerPosition();
        checkKollision();
    }
    if (e.code === "KeyW") {
        spieler.top = spieler.top - 10;
        setspielerPosition();
        checkKollision();
    }
    if (e.code === "KeyS") {
        spieler.top = spieler.top + 10;
        setspielerPosition();
        checkKollision();
    }

    if (e.code === "Space" && !spieler.isJumping) {
    spieler.ground = spieler.top;
    spieler.velocityY = -15;
    spieler.isJumping = true;
}
});
    setInterval(updateJump, 20);