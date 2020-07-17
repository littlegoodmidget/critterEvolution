class Critter {
    constructor(x, y, diet) {
        this.x = x;
        this.y = y;

        this.r = 10;
        this.dir = (Math.random() - 0.5) * 2 * Math.PI;

        this.maxStamina = 1000;
        // this.stamina = this.maxStamina;
        this.stamina = this.maxStamina / 1.5;
        this.maxHealth = 1000;
        this.health = this.maxHealth;
        // this.health = this.maxHealth / 2;

        if(true) {
            let structure = [11, 5];
            structure.splice(1, 0, (~~(Math.random() * 5 + 6)));
            if(Math.random() < 0.2) {
                structure.splice(1, 0, (~~(Math.random() * 4 + 5)));
                
            }
            this.nn = new NN(structure);
        }   else {
            // this.nn = new NN([11, 10, 7, 5]);
        }

        this.output = [
            [0],
            [0],
            [0]
        ]

        this.generation = 0;

        this.sensed = [];

        this.type = 1;

        this.diet = diet || (Math.random() - 0.5) *2;
        this.red = (this.diet + 1) / 2;
        this.blue = 1 - (this.diet + 1) / 2;


        
        //diet => 1 red => 1
        //diet => -1 blue => 1
        //red = diet / 2 + 0.5
        //blue = 0.5 - diet / 2
    }
    createChild() {
        let childDiet = this.diet + (Math.random() - 0.5) * 0.4;
        // let childDiet = this.diet + (Math.random() - 0.5) * 0.2;
        childDiet = Math.min(1, Math.max(-1, childDiet));
        // let child = new Critter(0, 0, childDiet);
        // this.setChildToParent(child);
        // child.nn = NN.mutateOnly(this.nn);
        // child.x += (Math.random() - 0.5) * 40
        // child.y += (Math.random() - 0.5) * 40
        // return child;
        let egg = new Egg(this.x, this.y, childDiet, NN.mutateOnly(this.nn));
        game.critterEggs.push(egg);
            
        
    }
    setChildToParent(child) {
        child.x = this.x;
        child.y = this.y;
        child.dir = this.dir;
    }
    uploadVerticies(vertArr) {
        let c = Math.cos(this.dir);
        let s = Math.sin(this.dir);
        vertArr.push(
            // this.x, this.y, this.r * 2, this.red, 0.0, this.blue,
            // this.x + c * this.r * 2, this.y + s * this.r * 2, this.r / 2, this.red, 0.0, this.blue,
            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y - this.r, this.red, 0.0, this.blue,
            this.x + this.r, this.y + this.r, this.red, 0.0, this.blue,
            this.x - this.r, this.y + this.r, this.red, 0.0, this.blue,

            this.x + (c * this.r * 1.5) - this.r/5, this.y + (s * this.r * 1.5) - this.r/5, this.red, 0.0, this.blue,
            this.x + (c * this.r * 1.5) + this.r/5, this.y + (s * this.r * 1.5) + this.r/5, this.red, 0.0, this.blue,
            this.x + (c * this.r * 1.5) + this.r/5, this.y + (s * this.r * 1.5) - this.r/5, this.red, 0.0, this.blue,
            this.x + (c * this.r * 1.5) - this.r/5, this.y + (s * this.r * 1.5) - this.r/5, this.red, 0.0, this.blue,
            this.x + (c * this.r * 1.5) + this.r/5, this.y + (s * this.r * 1.5) + this.r/5, this.red, 0.0, this.blue,
            this.x + (c * this.r * 1.5) - this.r/5, this.y + (s * this.r * 1.5) + this.r/5, this.red, 0.0, this.blue,

            this.x - this.r, this.y + this.r + this.r / 2, 0.3, 0.8, 0.2,
            this.x + this.r - (1 - this.health / this.maxHealth) * this.r * 2, this.y + this.r + this.r, 0.3, 0.8, 0.2,
            this.x + this.r - (1 - this.health / this.maxHealth) * this.r * 2, this.y + this.r + this.r / 2, 0.3, 0.8, 0.2,
            this.x - this.r, this.y + this.r + this.r / 2, 0.3, 0.8, 0.2,
            this.x + this.r - (1 - this.health / this.maxHealth) * this.r * 2, this.y + this.r + this.r, 0.3, 0.8, 0.2,
            this.x - this.r, this.y + this.r + this.r, 0.3, 0.8, 0.2,
        );
    }
    drawClosest(vertArr) {
        for(let i = 0; i < this.sensed.length; i++) {
            if(this.sensed[i]) {
                vertArr.push(
                    this.x, this.y, 0, this.red, 0.0, this.blue,
                    this.sensed[i].x, this.sensed[i].y, 0, this.red, 0.0, this.blue
                );
            }
        }
    }
    bite(target) {
        // // if(target.type == this.type) {
        //     target.health -= 40
        //     this.health += 1
        //     this.stamina += 39
        //     // target.health -= 20 * (1 - Math.abs(this.diet - target.type));
        //     // this.health += 1 * (1 - Math.abs(this.diet - target.type));
        //     // this.stamina += 19 * (1 - Math.abs(this.diet - target.type));

        //     this.stamina = Math.min(this.maxStamina, this.stamina);
        //     this.health = Math.min(this.maxHealth, this.health);
        //     if(target.health <= 0) {
        //         if(Math.random() < 0.3) {
        //             if(target.health<=0) {
        //                 for(let i = 0; i < Math.random() * 2; i++) {
        //                     if(simulator.critters.length < simulator.maxCritters) {
        //                         this.stamina -= 500
        //                         this.health -= 400;
        //                         simulator.critters.push(
        //                             this.createChild()
        //                         );
        //                     }   else continue;
        //                 }
        //             }
        //         }
        //     }
        // // }
        // console.log(target.type - this.diet)
        // let efficiency = (-(target.type - this.diet)*(target.type - this.diet)) / 2 + 1;
        // let efficiency = -1 * ((target.type - this.diet) / 2)**2 + 1 + Math.abs(this.diet-target.type)/2 - 0.5 - 0.5;
        let efficiency = -(Math.sin(0.8*(target.type - this.diet)) * Math.abs(target.type - this.diet))/((target.type - this.diet) / 1.2) + 1 || 0;
        // let efficiency = -(Math.sin((target.type - this.diet) * 0.7) * Math.abs(target.type - this.diet))/((target.type - this.diet) / 1.2) + 1 || 0;
        // efficiency*=3
        if(target.diet > 0) {

            // console.log(target.type - this.diet)
        }
        if(efficiency>1) {

            console.log(efficiency)
        }
        if(efficiency>=1) {
            console.log(efficiency)
            throw new Error('fwafajo');
        }


        let eatenFood = (efficiency * (this.diet + 2)) * 40;
        // let eatenFood = (efficiency + (this.type + 1)) * 40;


        // let eatenFood = (efficiency + (this.type + 1)) * 20;
        // let eatenFood = (efficiency + (this.type + 1)/2) * 300;
        // let eatenFood = efficiency * 400;
        if(target.health-eatenFood<=0) eatenFood = target.health
        if(eatenFood>0) {
            target.health -= eatenFood
        }   
        this.stamina += eatenFood * 0.8;
        this.health += eatenFood * 0.1;
        // if(this.diet > 0 && target.type<0) {
        //     if(efficiency * 400 > 200) console.log(eatenFood, this.diet)
        // }

        if(this.stamina > this.maxStamina) this.stamina = this.maxStamina;
        if(this.health > this.maxHealth) this.health = this.maxHealth;

        // if(target.health<=0 && game.entities.length + game.critterEggs.length <= game.maxCritters && this.stamina > this.maxStamina * 0.2 && this.health > this.maxHealth * 0.2) {
        
        if(target.health<=0 && Math.random() < 0.3 && target.type == Math.abs(this.diet) / this.diet && game.entities.length + game.critterEggs.length <= game.maxCritters && this.stamina > this.maxStamina * 0.4 && this.health > this.maxHealth * 0.4) {
            for(let i = 0; i < 1; i++) {
            // for(let i = 0; i < 1 + Math.random() * 5; i++) {
                this.stamina-=100;
                this.health-=100;
                this.createChild();
                // simulator.critters.push(
                    // this.createChild()
                // );

            }
        }
        
    }
    update() {
        //closest thing => relative r, g, b, diff in angle, 1 / (dist + 1) * 4    -- 20 inputs
        //self          => energy percentage                                      -- 1 input
        //TInputs = 21
        //maybe make default color if nothing is seen the clear color of canavas
        
        

        // let foods = simulator.foodQuad.queryRange(this.x - 300, this.y - 300, 600, 600);
        // let foods = [];
        // simulator.foodQuad.queryRange(this.x - 200, this.y - 200, 400, 400, foods);
        let entities = [];
        game.entityQuad.queryRange(this.x - 200, this.y - 200, 400, 400, entities);
        // game.entityQuad.queryRange(this.x - 200*3, this.y - 200*3, 400*3, 400*3, entities);
        let inRange = entities;
        // let inRange = Array.from([...foods, ...critters]);
        let distances = [Infinity, Infinity, Infinity];
        this.sensed = [];
        for(let i = 0; i < inRange.length; i++) {
            // if(this.x == inRange[i].x && this.y == inRange[i].y) continue;
            let tempd = dist(this.x, this.y, inRange[i].x, inRange[i].y);
            if(tempd==0) continue;
            if(tempd < distances[0]) {
                distances[2] = distances[1];
                this.sensed[2] = this.sensed[1];
                distances[1] = distances[0];
                this.sensed[1] = this.sensed[0];


                distances[0] = tempd;
                this.sensed[0] = inRange[i];
            }   else if(tempd < distances[1]) {
                distances[2] = distances[1];
                this.sensed[2] = this.sensed[1];

                distances[1] = tempd;
                this.sensed[1] = inRange[i];
            }   else if(tempd < distances[2]) {
                distances[2] = tempd;
                this.sensed[2] = inRange[i];
            }
        }

        let input = [];
        let angle;
        let angles = [];
        if(this.sensed[0]) {
            let dir = Math.atan2(this.y - this.sensed[0].y, this.x - this.sensed[0].x);
            angles[0] = normalizeAngle(Math.atan2(this.sensed[0].y-this.y, this.sensed[0].x-this.x)-this.dir);
            // angles[0] = normalizeAngle(dir-this.dir);
            input.push(
                [1 / (0.1 + distances[0] / 20)],
                [normalizeAngle(dir-this.dir)],
                [this.sensed[0].diet]
            );
        }   else {
            input.push(
                [1 / Infinity],
                [normalizeAngle(this.dir)],
                [0]
            );
        }
        if(this.sensed[1]) {
            let dir = Math.atan2(this.y - this.sensed[1].y, this.x - this.sensed[1].x);
            angles[1]= normalizeAngle(Math.atan2(this.sensed[1].y-this.y, this.sensed[1].x-this.x)-this.dir);
            // angles[1]= normalizeAngle(dir-this.dir);
            
            input.push(
                [1 / (0.1 + distances[1] / 20)],
                [normalizeAngle(dir-this.dir)],
                [this.sensed[1].diet]
            );
        }   else {
            input.push(
                [1 / Infinity],
                [normalizeAngle(this.dir)],
                [0]
            );
        }
        if(this.sensed[2]) {
            let dir = Math.atan2(this.y - this.sensed[2].y, this.x - this.sensed[2].x);
            angles[2] = normalizeAngle(Math.atan2(this.sensed[2].y-this.y, this.sensed[2].x-this.x)-this.dir);
            // angles[2] = normalizeAngle(dir-this.dir);

            input.push(
                [1 / (0.1 + distances[2] / 20)],
                [normalizeAngle(dir-this.dir)],
                [this.sensed[2].diet]
            );
        }   else {
            input.push(
                [1 / Infinity],
                [normalizeAngle(this.dir)],
                [0]
            );
        }

        input.push(
            [this.stamina / this.maxStamina],
            [this.health / this.maxHealth]
        );

        // console.log(input)
        this.nn.feedFowards(input);
        
        this.dir += (this.nn.output[0][0] - 0.5) * 0.4;
        // this.dir += (this.nn.output[0][0] - 0.5) * 0.6;
        
        this.x += Math.cos(this.dir) * 4 * this.nn.output[1][0];
        this.y += Math.sin(this.dir) * 4 * this.nn.output[1][0];

        // if(this.x < 0) {
        //     this.x = 0;
        // }   else if(this.x > canvas.width) {
        //     this.x = canvas.width
        // }

        // if(this.y < 0) {
        //     this.y = 0;
        // }   else if(this.y > canvas.height) {
        //     this.y = canvas.height
        // }
        
        if(this.nn.output[2][0]>0.9 && this.sensed[0]) {
            this.stamina-=1;
            if(angles[0] > -0.6 && angles[0] < 0.6 && distances[0]<this.r + this.sensed[0].r) {
            // if(/*angles[0] > -0.75 && angles[0] < 0.75 && */distances[0]<this.r + this.sensed[0].r) {
                this.bite(this.sensed[0]);
            }
        }
        if(this.nn.output[3][0]>0.9 && this.sensed[1]) {
            this.stamina-=1;
            if(angles[1] > -0.6 && angles[1] < 0.6 && distances[1]<this.r + this.sensed[1].r) {
            // if(/*angles[1] > -0.75 && angles[1] < 0.75 && */distances[1]<this.r + this.sensed[1].r) {
                this.bite(this.sensed[1]);
            }
        }
        if(this.nn.output[4][0]>0.9 && this.sensed[2]) {
            this.stamina-=1;
            if(angles[2] > -0.6 && angles[2] < 0.6 && distances[2]<this.r + this.sensed[2].r) {
            // if(/*angles[2] > -0.75 && angles[2] < 0.75 && */distances[2]<this.r + this.sensed[2].r) {
                this.bite(this.sensed[2]);
            }
        }


        // this.stamina-=1;
        this.stamina-=1 / 2 * 1 / 10 * Math.abs((this.nn.output[0][0] - 0.5)) * dist(0, 0, Math.cos(this.dir) * 2 * this.nn.output[1][0], Math.sin(this.dir) * 2 * this.nn.output[1][0]) ** 2 + 0.3;
        // this.stamina-=1 / 2 * 1 / 1000 * Math.abs((this.nn.output[0][0] - 0.5)) * dist(0, 0, Math.cos(this.dir) * 2 * this.nn.output[1][0], Math.sin(this.dir) * 2 * this.nn.output[1][0]) ** 2 + 0.3;
        // this.stamina-=1 / 2 * Math.abs((this.nn.output[0][0] - 0.5)) * dist(0, 0, Math.cos(this.dir) * 2 * this.nn.output[1][0], Math.sin(this.dir) * 2 * this.nn.output[1][0]) ** 2 + 1;
        if(this.stamina<=0) this.health -= 10;
    }
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
function normalizeAngle(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle)) / Math.PI;
}
function dist2D(x1, x2) {
    return Math.abs(x1 - x2);
}
function dist2(x1, y1, x2, y2) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}