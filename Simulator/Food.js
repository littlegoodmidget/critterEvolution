class Food {
    constructor(x, y, health = 400) {
        this.x = x;
        this.y = y;
        this.r = 2;


        this.health = health;
        this.diet = 0;

        this.type = -1;
        this.red = (this.type + 1) / 2;
        this.blue = 1 - (this.type + 1) / 2;
    }
    uploadVerticies(vertArr) {
        vertArr.push(
            // this.x, this.y, this.r * 2, this.red, 0.0, this.blue,

            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y + this.r, this.red, 0.0, this.blue,
        );
    }
}