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

//let muenzen = document.getElementsByClassName("muenze"); // Live

const spieler = document.getElementById("spieler");

const keys = {};

//let anzMuenzen = 0;
//let punkte = 0;

let x = 100;
let y = 20; // Start auf dem Boden (ground1 ist 20px hoch)

let speedY = 0;
let speedX = 0;

const friction = 0.9;
const gravity = 0.7;
const jumpPower = 15;

let springt = false;

const playerWidth = 50;
const playerHeight = 80;

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

    // 1) Zuerst nur LINKS / RECHTS bewegen

    // Aktuelle Position auf den Bildschirm schreiben
    spieler.style.left = x + "px";
    spieler.style.bottom = y + "px";

    // War der Spieler SCHON vor dem Seitwärts-Schritt in einem Block?
    // (z.B. leicht im Boden wegen Schwerkraft)
    // Wenn ja -> das ist KEINE Wand von der Seite
    const schonDrin = checkCollision();

    // Jetzt erst seitlich bewegen
    x += speedX;

    // Verhindern des verlassen des browser fensters
    //Rechts
    if ((x + playerWidth) > window.innerWidth) {
        x = window.innerWidth - playerWidth;
    }
    //Links
    if (x < 0) {
        x = 0;
    }

    // Neue X-Position anzeigen
    spieler.style.left = x + "px";

    // Checken wir nach kollisionen
    let hit = checkCollision();

    // Debug wird nicht logisch gebraucht, nur fürs menschliche auge
    if (hit) {
        console.log("Kollision mit:", hit);
    }

    // Seiten-Kollision:
    // Nur wenn wir VORHER noch nicht im Block waren (!schonDrin)
    // und uns jetzt durch Laufen reingeschoben haben
    if (hit && !schonDrin && speedX !== 0) {
        const blockRect = hit.getBoundingClientRect();

        if (speedX > 0) {
            // Von links gegen den Block gelaufen -> links vom Block hinstellen
            x = blockRect.left - playerWidth;
        } else {
            // Von rechts gegen den Block gelaufen -> rechts vom Block hinstellen
            x = blockRect.right;
        }

        speedX = 0;
        spieler.style.left = x + "px";
    }

    // 2) Danach nur HOCH / RUNTER bewegen
    // Schwerkraft wirkt immer (ziehen nach unten)
    speedY -= gravity;
    y += speedY;

    // Nicht unter den Bildschirm fallen
    if (y < 0) {
        y = 0;
        speedY = 0;
        springt = false;
    }

    // Neue Y-Position anzeigen
    spieler.style.bottom = y + "px";

    // Nochmal Kollision prüfen (jetzt für Boden / Decke)
    hit = checkCollision();

    if (hit) {
        const blockRect = hit.getBoundingClientRect();

        if (speedY <= 0) {
            // Fallen / stehen -> auf dem Block landen
            y = window.innerHeight - blockRect.top;
            speedY = 0;
            springt = false;
        } else {
            // Springen nach oben -> mit dem Kopf gegen den Block stoßen
            y = window.innerHeight - blockRect.bottom - playerHeight;
            speedY = 0;
        }

        spieler.style.bottom = y + "px";
    }

    // Von einer Kante gelaufen -> Schwerkraft / Fallen wieder an
    if (!hit && y > 0 && !springt) {
        springt = true; // Aktiviert die Schwerkraft wieder fürs Herunterfallen
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
