
let klotz = {
    left: 100,
    top:100,
};

let laufBilder = [
    "./prinzessinLaufen/laufen_1.png",
    "./prinzessinLaufen/laufen_2.png",
    "./prinzessinLaufen/laufen_3.png",
    "./prinzessinLaufen/laufen_4.png",
    "./prinzessinLaufen/laufen_5.png",
    "./prinzessinLaufen/laufen_6.png",
];

let aktuellesBild = 0;
function animierenLaufen(){
    aktuellesBild = (aktuellesBild + 1) % laufBilder.length;
    $("#klotz").css(
        "background-image",
        "url('" + laufBilder[aktuellesBild]+"')"
    )
}
let laeuftGerade = false;

function setKlotzPosition() {
    $("#klotz").css("left", klotz.left);
    $("#klotz").css("top", klotz.top);
}

$(document).on("keydown", function (e) {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
        laeuftGerade = true;
    }

    if (e.code === "KeyA") {
        klotz.left = klotz.left - 10;
        setKlotzPosition();
    }
    if (e.code === "KeyD") {
        klotz.left = klotz.left + 10;
        setKlotzPosition();
    }
    if (e.code === "KeyW") {
        klotz.top = klotz.top - 10;
        setKlotzPosition();
    }
    if (e.code === "KeyS") {
        klotz.top = klotz.top + 10;
        setKlotzPosition();
    }



});


$(document).on("keyup", function(){
    laeuftGerade = false;
});

setInterval(function(){
    if (laeuftGerade) {
        animierenLaufen();
    }
}, 200);