class Text {
    constructor(posX, posY, letter, color, font, size) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.letter = letter;
        this.font = font;
        this.size = size;
        this.alpha = 25;
        this.alphaRandom = 20 //Math.floor((Math.random() * 5) + 18);
    }

    display() {
        if ((this.alpha <= 100 && this.letter.length > 1) || (this.alpha < 150 && this.letter.length == 1)) {
            fill(this.color[0], this.color[1], this.color[2], this.alpha);
            textFont(this.font);
            textSize(this.size);
            text(this.letter, this.posX, this.posY);
            this.alpha += this.alphaRandom;
        }
    }
}