let jonas = {
    left: 100,
};
function setJonasPosition() {
    $("jonas").css("left",jonas.left);
}

let punkte = 0;
    function checkKollision() {
        if (jonas.left === 300) {
            punkte = punkte + 1;
            $("münzenanzahl").text("Münzen: " + punkte);
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
});

