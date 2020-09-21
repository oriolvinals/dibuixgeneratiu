let smallFont;

let texts = [];
let circleA = [];

let circleAnimationEnd = false;
let textFunction = false;

function preload() {
    smallFont = loadFont("SmallText.ttf");
}

function setup() {
    createCanvas(400, 565);
    background(colors[1]);
    frameRate(60);
    displayCircles();
}

function draw() {
    /* ONE TIME FUNCTION */
    if (!circleAnimationEnd) {
        updateCircles();
        checkEndCircles();
    } else {
        /* Baixem el frameRate perque hi hagi una mica de retard
        entre textos quant es pinta */
        frameRate(5);
        if (!textFunction) {
            createText();
            textFunction = true;
        } else if (textFunction) {
            displayText();
        }
    }
}

/* MODE RESTART */
function mousePressed() {
    restart();
}

function deviceShaken() {
    restart();
}

function restart() {
    texts = [];
    circleA = [];

    circleAnimationEnd = false;
    textFunction = false;

    background(colors[1]);
    displayCircles();

    /* Tornem a pujar el frameRate perque la velocitat
      dels cercles sigui bonica de veure */
    frameRate(60);
}

/* Random sort de la array de textos d'aquesta 
forma no es pinten en un ordre igual sempre */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* Creació del cercle en una classe */
function displayCircles() {
    circles.forEach((e) => {
        let randomDirection = int(random(0, 2));
        let pos1, pos2;
        if (randomDirection == 0) {
            pos1 = createVector(e.posX1, e.posY1);
            pos2 = createVector(e.posX2, e.posY2);
        } else {
            pos1 = createVector(e.posX2, e.posY2);
            pos2 = createVector(e.posX1, e.posY1);
        }
        let c = new Circle(pos1, pos2, colors[0]);
        c.display();

        circleA.push(c);
    });
}

/* Pintem el cercle en la posició seguent
aquesta acció es fa fins que el cercle
arriba al final del seu camí*/
function updateCircles() {
    circleA.forEach((e) => {
        e.update();
    });
}

/* Check de que tots els cercles hagin acabat el moviment,
si es el cas fem que surtin les lletres */
function checkEndCircles() {
    let cLength = circleA.length;
    let counter = 0;
    circleA.forEach((e) => {
        if (e.checkEnd()) {
            counter++;
        }
    });

    if (cLength == counter) {
        circleAnimationEnd = true;
    }
}

/* Creació dels textos petits i les lletres en classes*/
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
    texts = shuffle(texts);
}

let posText = 0;
/* Mostra el text o la lletra en un ordre random */
function displayText() {
    texts[posText].display();

    if (posText < texts.length - 1) {
        posText++;
    } else if (posText == texts.length - 1) {
        posText = 0;
    }
}