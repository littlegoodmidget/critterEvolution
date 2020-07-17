class Simulator {
    constructor(maxCritters = 400, maxFood = 400) {
        this.critterQuad = new Quadtree(0, 0, canvas.width, canvas.height, 0, 4, 10);
        this.foodQuad = new Quadtree(0, 0, canvas.width, canvas.height, 0, 4, 4);


        // this.foodQuad = new Quadtree(0, 0, canvas.width, canvas.height, 0, 4, 4); //100 food

        this.critters = [];
        for(let i = 0; i < 200; i++) {
            this.critters.push(
                new Critter(Math.random() * canvas.width, Math.random() * canvas.height)
            );
        }

        this.foods = [];
        for(let i = 0; i < maxFood; i++) {
            this.foods.push(new Food(canvas.width * Math.random(), canvas.height * Math.random()));
        }

        this.eggs = [];


        this.bullets = [];

        this.maxCritters = maxCritters;
        this.maxFood = maxFood;

        this.bestNNScore;
        this.bestNN;
        this.generation = 0;
    }
    draw(vertArr) {
        for(let i = 0; i < this.critters.length; i++) {
            if(this.critters[i].health <= 0) continue;
            this.critters[i].draw(vertArr);
        }
        for(let i = 0; i < this.foods.length; i++) {
            this.foods[i].draw(vertArr);
        }
        for(let i = 0; i < this.eggs.length; i++) {
            this.eggs[i].draw(vertArr);
        }
    }
    update() {
        // while(this.foods.length < 1 + this.maxFood * this.maxCritters / (1 + this.critters.length) / 20) {
        while(this.foods.length < this.maxFood) {
            this.foods.push(
                new Food(
                    canvas.width * Math.random(),
                    canvas.height * Math.random()
                )
            );
        }
        this.critterQuad = new Quadtree(0, 0, canvas.width, canvas.height, 0, this.critterQuad.maxDepth, this.critterQuad.maxObjects);
        for(let i = 0; i < this.critters.length; i++) {
            this.critterQuad.insert(this.critters[i])
        }
        this.foodQuad = new Quadtree(0, 0, canvas.width, canvas.height, 0, this.foodQuad.maxDepth, this.foodQuad.maxObjects);
        for(let i = 0; i < this.foods.length; i++) {
            this.foodQuad.insert(this.foods[i])
        }
        for(let i = 0; i < this.critters.length; i++) {
            this.critters[i].update();
            if(this.critters[i].health <= 0) {
                this.critters.splice(i, 1);
                i--;
                continue;
            }
        }
        for(let i = 0; i < this.eggs.length; i++) {
            this.eggs[i].update();
            if(this.eggs[i].framesToHatch <=0) {
                let critter = new Critter(this.eggs[i].x, this.eggs[i].y, this.eggs[i].diet);
                critter.nn = this.eggs[i].neuralNetwork;
                this.critters.push(
                    critter
                );
                this.eggs.splice(i, 1);
                i--;
            }
        }
        for(let i = 0; i < this.foods.length; i++) {
            if(this.foods[i].health>0) continue;
            else {
                this.foods.splice(i, 1);
                i--;
            }
        }
        // if(this.critters.length<=this.maxCritters * 0.01) {
        if(this.critters.length==0 && this.eggs.length==0) {
            console.log('new generation');
            for(let i = 0; i < this.maxCritters / 4; i++) {
            // for(let i = 0; i < this.maxCritters; i++) {
                this.critters.push(
                    new Critter(canvas.width * Math.random(), canvas.height * Math.random())
                );
            }
        }
    }
}