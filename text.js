class Text {
    constructor(posX, posY, letter, color, font, size) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.letter = letter;
        this.font = font;
        this.size = size;
        this.alpha = 25;
        this.alphaRandom = Math.floor((Math.random() * 5) + 20);
    }

    display() {
        //Mentres tingui menys de 150 de alpha, que segueixi pintant la lletra o el text
        if (this.alpha < 160) {
            fill(this.color[0], this.color[1], this.color[2], this.alpha);
            textFont(this.font);
            textSize(this.size);
            text(this.letter, this.posX, this.posY);
            this.alpha += this.alphaRandom;
        }
    }
}