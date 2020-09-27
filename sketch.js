// Font
let smallFont;

// Arrays
let texts = [];
let circleA = [];

// Booleans
let circleAnimationEnd = false;
let textFunction = false;
let randomR;

// Funció preload per carregar la font Kumbh Sans de Google Fonts
function preload() {
    smallFont = loadFont("SmallText.ttf");
}

function setup() {
    createCanvas(400, 565);
    background(colors[1]);
    frameRate(60);

    // Radi random del cercle
    randomR = int(random(5, 23));
    displayCircles();
}

function draw() {
    // Mentres els cercles no acabin l'animació
    if (!circleAnimationEnd) {
        // Actualitzar el cercle de lloc (moviment)
        updateCircles();
        // Mirar si tots els cercles han acabat el moviment
        checkEndCircles();
    } else {
        // Baixem el frameRate perque hi hagi una mica de retard entre textos quant es pinta 
        frameRate(10);
        // Inicialitzem els textos amb la funció createText
        if (!textFunction) {
            createText();
            textFunction = true;
        } else if (textFunction) {
            // Cada vegada es sobre posa el text a sobre d'ell mateix pero amb més alpha
            displayText();
        }
    }
}

// Quan fas click amb el ratolí que es reinicii
function mousePressed() {
    restart();
}

// Quan mous el dispositiu que es reinicii
function deviceShaken() {
    restart();
}

// Funció de reinici
function restart() {
    texts = [];
    circleA = [];

    circleAnimationEnd = false;
    textFunction = false;

    // Radi random del cercle
    randomR = int(random(5, 23));

    background(colors[1]);
    displayCircles();

    // Tornem a pujar el frameRate perque la velocitat dels cercles sigui bonica de veure 
    frameRate(60);

}

// Reordeno l'array de textos de forma Random
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Inicialització classe Circle amb cadascun dels cercles
function displayCircles() {
    circles.forEach((e) => {
        let randomDirection = int(random(0, 2));
        let pos1, pos2;
        // La direcció del cercle pot anar en 2 sentits
        if (randomDirection == 0) {
            pos1 = createVector(e.posX1, e.posY1);
            pos2 = createVector(e.posX2, e.posY2);
        } else {
            pos1 = createVector(e.posX2, e.posY2);
            pos2 = createVector(e.posX1, e.posY1);
        }

        let c = new Circle(pos1, pos2, colors[0], randomR);
        c.display();
        circleA.push(c);
    });
}

// Pintem el cercle en la seguent posició
function updateCircles() {
    circleA.forEach((e) => {
        e.update();
    });
}

// Mirem si tots els cercles han arribat al final
function checkEndCircles() {
    let cLength = circleA.length;
    let counter = 0;
    circleA.forEach((e) => {
        if (e.checkEnd()) {
            counter++;
        }
    });

    //Si tots els cercles han arribat al final, posem la variable a true per passar a pintar les lletres i textos
    if (cLength == counter) {
        circleAnimationEnd = true;
    }
}

// Inicialització de la classe Text amb tots els textos i lletres
function createText() {
    smallText.forEach((e) => {
        const {
            text,
            posX,
            posY
        } = e;
        texts.push(new Text(posX, posY, text, colors[0], smallFont, 9));
    });

    letters.forEach((e) => {
        const {
            letter,
            posX,
            posY
        } = e;
        texts.push(new Text(posX, posY, letter, colors[2], smallFont, 50));
    });
    //Utilitza la funció shuffle per randomitzar l'array amb els textos i lletres 
    texts = shuffle(texts);
}

let posText = 0;
// Pinta 1 lletra o text(d'aquesta forma nomès es pinta 1 lletra per draw i no totes a la vegada)
function displayText() {
    texts[posText].display();
    if (posText < texts.length - 1) {
        posText++;
    } else if (posText == texts.length - 1) {
        posText = 0;
    }
}