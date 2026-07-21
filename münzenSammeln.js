let jonas = {
    left: 100,
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

function setJonasPosition() {
    $("#jonas").css("left",jonas.left);
    $("#jonas").css("top",jonas.top);
}

function checkKollision() {
    if (münze.eingesammelt) {
        return;
    }
    
    if (

        jonas.left < münze.left + 50 &&
        jonas.left + 100 > münze.left &&
        jonas.top < münze.top + 50 &&
        jonas.top + 100 > münze.top
    ) {
        punkte++;
        $("#münzenanzahl").text("Münzen: " + punkte);

        münze.eingesammelt = true;
        $("#münze").hide();
    }
}

    function updateJump() {
    if (jonas.isJumping) {
        jonas.velocityY += 1;
        jonas.top += jonas.velocityY;

        if (jonas.top >= jonas.ground) {
            jonas.top = jonas.ground;
            jonas.velocityY = 0;
            jonas.isJumping = false;
        }

        setJonasPosition();
        checkKollision();
    }
    }



$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        jonas.left = jonas.left - 10;
        setJonasPosition();
        checkKollision();
    }
    if (e.code === "KeyD") {
        jonas.left = jonas.left + 10;
        setJonasPosition();
        checkKollision();
    }
    if (e.code === "KeyW") {
        jonas.top = jonas.top - 10;
        setJonasPosition();
        checkKollision();
    }
    if (e.code === "KeyS") {
        jonas.top = jonas.top + 10;
        setJonasPosition();
        checkKollision();
    }

    if (e.code === "Space" && !jonas.isJumping) {
    jonas.ground = jonas.top;
    jonas.velocityY = -15;
    jonas.isJumping = true;
}
});
    setInterval(updateJump, 20);
