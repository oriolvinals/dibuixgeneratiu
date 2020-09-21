class Circle {
    constructor(pos, end, color) {
        this.pos = pos;
        this.init = pos;
        this.end = end;
        this.color = color;
        this.direction = this.getDirection(pos, end);
        this.alpha = this.getAlpha(pos, end);
        this.alpha = 0;
        this.velocity = createVector(0.5, 0.5).mult((Math.random() * 10) + 2.5);
        this.r = 18;
        this.endDraw = false;
    }

    display() {
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    update() {
        if (!this.endDraw) {
            if (this.direction.x == 0.35) {
                if (this.pos.x > this.end.x) {
                    this.endDraw = true;
                }
            } else {
                if (this.end.y < this.pos.y) {
                    this.endDraw = true;
                }
            }
            this.pos.x += this.velocity.x * this.direction.x;
            this.pos.y += this.velocity.y * this.direction.y;
            fill(this.color[0], this.color[1], this.color[2], this.alpha);
            ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
            this.alpha += 0.35 * this.velocity.x;
        } else {
            this.endDraw = true;
        }
    }

    checkEnd() {
        return this.endDraw;
    }

    getDirection(pos, end) {
        if (pos.x < end.x) {
            return createVector(0.35, -0.35);
        } else {
            return createVector(-0.35, 0.35);
        }
    }

    getAlpha(pos, end) {
        if (pos.x < end.x) {
            return (this.end.x - this.pos.x) / 2550;
        } else {
            return (this.pos.y - this.end.x) / 2550;
        }
    }
}