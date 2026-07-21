const feldBreite = 1240;
const feldHoehe = 600;
const klotzGroesse = 50;


let klotz = {
    left: 100,
    top: 100,
}



function setKlotzPosition(){
    $("#klotz").css("left", klotz.left + "px");
    $("#klotz").css("top", klotz.top + "px");
}

$(document).on("keydown",function (e) {
   if (e.code === "KeyA") {
        klotz.left = Math.max(0, klotz.left - 10);
    }

    if (e.code === "KeyD") {
        klotz.left = Math.min(feldBreite - klotzGroesse, klotz.left + 10);
    }

    if (e.code === "KeyW") {
        klotz.top = Math.max(0, klotz.top - 10);
    }

    if (e.code === "KeyS") {
        klotz.top = Math.min(feldHoehe - klotzGroesse, klotz.top + 10);
    }
    setKlotzPosition();
});

