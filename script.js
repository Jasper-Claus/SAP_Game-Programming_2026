// let klotz = {
//     left: 100,
//     top: 100,

// } ;

// function setKlotzPosition() {
//     $("#klotz").css("left", klotz.left);
//     $("#klotz").css("top", klotz.top);

// }

// $(document).on("keydown", function (e) {
//     if (e.code == "KeyA") {
//         klotz.left = klotz.left -10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyD") {
//         klotz.left = klotz.left +10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyW") {
//         klotz.top = klotz.top -10;
//         setKlotzPosition();
//     }
//     if (e.code == "KeyS") {
//         klotz.top = klotz.top +10;
//         setKlotzPosition(); 
//     }
// });





// const spieler = document.getElementById("klotz");
// let y = 0;
// let speedY = 0;
// const gravity = 0.7;
const collider = document.querySelectorAll(".collider");

const spieler = document.getElementById("spieler");

const keys = {};

let x = 100;
let y = 0;

let speedY = 0;
let speedX = 0;

const friction = 0.9;
const gravity = 0.7;
const jumpPower = 15;

let springt = false;

// Beim Drücken zur Liste hinzufügen um gedrückt zu halten zu erlauben
document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
});

// Beim loslassen den keycode wieder auf false setzen sodass er sich nicht weiterbewegt
document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

/*
// Tastendruck
document.addEventListener("keydown", function(event){
    
    if(event.code === "KeyA"){
        speedX -= 10;
    }

    if(event.code === "KeyD"){
        speedX += 10;
    }

    if(event.code === "KeyW" && springt === false){
        speedY = jumpPower;
        springt = true;
    }
    
});
*/
// Spielschleife
function update(){
    
    //Kontrolle welche gedrückt werden und darauf basierend dann bewegung oder aktionen ausführen
    //Links
    if (keys["KeyA"]) {
        speedX -= 2;
    }
    //Rechts
    if (keys["KeyD"]) {
        speedX += 2;
    }
    //Springen
    if(keys["KeyW"] && springt === false){
        speedY = jumpPower;
        springt = true;
    }

    if(springt){

        speedY -= gravity;

        y += speedY;

        if(y <= 0){
            y = 0;
            speedY = 0;
            springt = false;
        }

    }

    x += speedX;

    // Reibung
    if (speedX > 0) {
        speedX -= friction;

        if (speedX < 0) {
            speedX = 0;
        }
    }

    if (speedX < 0) {
        speedX += friction;

        if (speedX > 0) {
            speedX = 0;
        }
    }

    if (speedX > 10) {
        speedX = 10;
    }

    if (speedX < -10) {
        speedX = -10;
    }

    // Verhindern des verlassen des browser fensters
    //Rechts
    if ((x + 50) > window.innerWidth) {
        x = window.innerWidth - 50;
    }
    //Links
    if (x < 0) {
        x = 0;  
    }


    spieler.style.left = x + "px";
    spieler.style.bottom = y + "px";

    // Checken wir nach kollisionen und drucken dass aus zum debuggen

    const hit = checkCollision();

    // Debug wird nicht logisch gebraucht, nur fürs menschliche auge
    if (hit) {
        console.log("Kollision mit:", hit);
    }


    const playerHeight = 80;

    if (hit && speedY <= 0) {
        const blockRect = hit.getBoundingClientRect();

        y = window.innerHeight - blockRect.top;

        speedY = 0;
        springt = false;
    } else if (hit && speedY > 0) {
        const blockRect = hit.getBoundingClientRect();
        speedY = 0;

        y = window.innerHeight - blockRect.bottom - playerHeight;
    }

    requestAnimationFrame(update);

}

function checkCollision() {
    // Holt die Position und größe vom Spieler
    const spielerRect = spieler.getBoundingClientRect();
    
    // Liest alle Collider Klassen aus und gibt sie anstelle von einer Liste in einzelnden Objekten wieder
    for (const block of collider) {
        // Holt die Postition von einem Collider aus der Liste
        const blockRect = block.getBoundingClientRect();

        // Checkt ob die sich berühren und wenn dass passiert dann gibt es den collider als objekt zurück,
        // um in später zu nutzen
        if (
            spielerRect.left < blockRect.right &&
            spielerRect.right > blockRect.left &&
            spielerRect.top < blockRect.bottom &&
            spielerRect.bottom > blockRect.top
        ) {
            return block; // Gibt den Collider zurück
        }
    }

    // Wenn keine Berührung stattfindet, gibt die Funktion auch nichts zurück

    return null; // Keine Kollision
}

update();