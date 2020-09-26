class Circle {
    constructor(pos, end, color, r) {
        this.pos = pos;
        this.init = pos;
        this.end = end;
        this.color = color;
        this.direction = this.getDirection(pos, end);
        this.alpha = 0;
        // Velocitat del cercle
        this.velocity = createVector(0.5, 0.5).mult((Math.random() * 10) + 2.5);
        this.r = r;
        this.endDraw = false;
    }

    // Mostra el cercle per primera vegada
    display() {
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    // Actualitza el cercle en la nova posició
    update() {
        // Mentres no hagi acabat el moviment
        if (!this.endDraw) {
            // IF ELSE per mirar la direcció de la pilota
            // En els dos casos fa el mateix: Mirar si el cercle ha passat de la posició final
            // Si es aixi, es modifica el endDraw a true perque no pinti mes cercles
            if (this.direction.x == 0.35) {
                if (this.pos.x > this.end.x) {
                    this.endDraw = true;
                }
            } else {
                if (this.end.y < this.pos.y) {
                    this.endDraw = true;
                }
            }

            // Pinta el cercle tenint en compte la direcció i la velocitat del cercle
            this.pos.x += this.velocity.x * this.direction.x;
            this.pos.y += this.velocity.y * this.direction.y;
            fill(this.color[0], this.color[1], this.color[2], this.alpha);
            ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
            this.alpha += 0.2 * this.velocity.x;
        }
    }

    // Retorna si s'ha acabat o no de dibuixar tot el moviment del cercle
    checkEnd() {
        return this.endDraw;
    }

    // Retorna la direcció del cercle, si va cap amunt es l'if i si va cap abaix es l'else
    getDirection(pos, end) {
        if (pos.x < end.x) {
            return createVector(0.35, -0.35);
        } else {
            return createVector(-0.35, 0.35);
        }
    }
}