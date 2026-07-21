$(document).ready(function () {
    // Change heading color when clicked
    $("#kopf").on("click", function () {
        $("#kopf").css("color", "darkblue");
    });

    // Dark mode toggle
    let dunkel = false;

    $("#modusButton").on("click", function () {
        dunkel = !dunkel;

        if (dunkel) {
            $("body, #kopf, #inhalt").css({
                "background-color": "black",
                "color": "white"
            });
        } else {
            $("body, #kopf, #inhalt").css({
                "background-color": "",
                "color": ""
            });
        }
    });
});

// Block position
let klotz = {
    left: 100,
    top: 100
};

function setKlotzPosition() {
    $("#klotz").css({
        left: klotz.left + "px",
        top: klotz.top + "px"
    });
}

// Move block with WASD
$(document).on("keydown", function (e) {
    if (e.code === "KeyA") {
        klotz.left -= 10;
    }

    if (e.code === "KeyD") {
        klotz.left += 10;
    }

    if (e.code === "KeyW") {
        klotz.top -= 10;
    }

    if (e.code === "KeyS") {
        klotz.top += 10;
    }

    setKlotzPosition();
});