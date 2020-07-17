class Egg {
    constructor(x, y, diet, neuralNetwork) {
        this.x = x;
        this.y = y;
        this.r = 7;
        this.neuralNetwork = neuralNetwork;
        this.diet = diet;
        this.red = (this.diet + 1) / 2;
        this.blue = 1 - (this.diet + 1) / 2;

        this.framesToHatch = 600;
    }
    draw(vertArr) {
        vertArr.push(
            // this.x, this.y, this.r, this.red, 0.0, this.blue //0.6, 0.6, 0.6

            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y + this.r, this.red, 0.0, this.blue,
        );
    }
    update() {
        this.framesToHatch = this.framesToHatch - 1;
    }
}