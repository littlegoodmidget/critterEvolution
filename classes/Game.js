class Game {
    constructor() {
        this.chunks = new ChunkHolder(
            {
                mapWidth: 6000,
                mapHeight: 6000,
                chunkSize: 750,
                // chunkSize: 600,
                // chunkSize: 600 * 2,
                startX: -3000,
                startY: -3000,
            }
            // {
            //     mapWidth: 12000,
            //     mapHeight: 12000,
            //     chunkSize: 600,
            //     // chunkSize: 600 * 2,
            //     startX: -6000,
            //     startY: -6000,
            // }
        );
        window.chunks = this.chunks;
        this.renderer = new Renderer(document.getElementById('vshader').innerHTML, document.getElementById('fshader').innerHTML);
        this.player = new Player(0, 0, (-20 + 6000 + 20) / 600, (-20 + 6000 + 20) / 600); //(x + offsetX) / width



        this.maxCritters = 200;
        this.maxFood = 2000;
        // this.maxFood = 8000;
        this.entityQuad = new Quadtree(-3000, -3000, 6000, 6000, 0, 5, 20);
        // this.entityQuad = new Quadtree(-3000 * 2, -3000 * 2, 6000 * 2, 6000 * 2, 0, 5, 10);
        this.entities = [
            
        ];
        for(let i = 0; i < this.maxCritters; i++) {
            this.entities.push(
                // new Critter(-1000 + 2000 * Math.random(), -1000 + 2000 * Math.random())
                new Critter(-3000 + Math.random() * 6000, -3000 + Math.random() * 6000)
            );
        }

        this.critterFoods = [

        ];
        for(let i = 0; i < this.maxFood + 1000; i++) {
            this.critterFoods.push(
                new Food(-3000 + Math.random() * 6000, -3000 + Math.random() * 6000)
                // new Food(-6000 * 0.5/2 + Math.random() * 12000 * 0.5/2, -6000 * 0.5/2 + Math.random() * 12000 * 0.5/2)
            );
        }

        this.critterEggs = [];

        this.prevtime = 0;
        this.dt = 0;

    }
    loop(time = 0) {
        this.dt = (time - this.prevtime) / 1000;

        for(let i = 0; i < warpSpeed; i++) {
            this.update(this.dt);
        }
        this.draw();

        this.prevtime = time;
        window.requestAnimationFrame(this.loop.bind(this));
    }
    update(dt) {
        this.renderer.clearVerticies();

        while(this.critterFoods.length < this.maxFood) {
            this.critterFoods.push(
                new Food(-3000 + Math.random() * 6000, -3000 + Math.random() * 6000)
                // new Food(-6000 * 0.5/2 + Math.random() * 12000 * 0.5/2, -6000 * 0.5/2 + Math.random() * 12000 * 0.5/2)
            );
        }

        this.entityQuad = new Quadtree(this.entityQuad.x, this.entityQuad.y, this.entityQuad.width, this.entityQuad.height, 0, this.entityQuad.maxDepth, this.entityQuad.maxObjects)
        for(let i = 0; i < this.entities.length; i++) {
            this.entityQuad.insert(this.entities[i]);
        }
        for(let i = 0; i < this.critterFoods.length; i++) {
            this.entityQuad.insert(this.critterFoods[i]);
        }
        if(!this.player.invisible) {
            this.entityQuad.insert(this.player)
        }

        // {
        //     for(let i = 0; i < this.tempObjects.length; i+=4) {
        //         this.renderer.verticies.push(
        //             this.tempObjects[i], this.tempObjects[i+1],
        //             this.tempObjects[i] + this.tempObjects[i+2], this.tempObjects[i+1],
        //             this.tempObjects[i] + this.tempObjects[i+2], this.tempObjects[i+1] + this.tempObjects[i+3],
        //             this.tempObjects[i] + this.tempObjects[i+2], this.tempObjects[i+1] + this.tempObjects[i+3],
        //             this.tempObjects[i], this.tempObjects[i+1] + this.tempObjects[i+3],
        //             this.tempObjects[i], this.tempObjects[i+1]
        //         );
        //     }
        // }

        this.player.uploadVerticies(this.renderer.verticies);
        this.player.update(dt);
        this.renderer.gl.uniformMatrix3fv(this.renderer.uniformLocations['u_matrix'], false, this.player.matrix);

        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].uploadVerticies(this.renderer.verticies);
            this.entities[i].update();
            if(this.entities[i].health <= 0) {
                this.entities.splice(i, 1)
                i--;
            }
        }

        for(let i = 0; i < this.critterFoods.length; i++) {
            this.critterFoods[i].uploadVerticies(this.renderer.verticies);
            // this.critterFoods[i].update();
            if(this.critterFoods[i].health <= 0) {
                this.critterFoods.splice(i, 1)
                i--;
            }
        }

        for(let i = 0; i < this.critterEggs.length; i++) {
            this.critterEggs[i].update();
            if(this.critterEggs[i].framesToHatch<=0) {
                let critter = new Critter(this.critterEggs[i].x, this.critterEggs[i].y, this.critterEggs[i].diet)
                critter.nn = this.critterEggs[i].neuralNetwork;
                this.entities.push(critter);
                this.critterEggs.splice(i, 1);
                i--;
                continue;
            }
            this.critterEggs[i].draw(this.renderer.verticies);
        }
        {
            for(let y = this.player.chunkY - 1; y <= this.player.chunkY + 1; y++) {
                for(let x = this.player.chunkX - 1; x <= this.player.chunkX + 1; x++) {
                    if(y < 0 || x < 0 || x >= this.chunks.chunks.length || y >= this.chunks.chunks.length) continue;
                    if(!this.chunks.chunks[y][x].active) {
                        this.chunks.chunks[y][x].active = true;
                        this.chunks.activeChunks.push(this.chunks.chunks[y][x]);
                    }
                    this.chunks.chunks[y][x].activeTime = 0;
                }
            }

            for(let j = 0; j < this.chunks.activeChunks.length; j++) {
                // console.log(this.chunks.activeChunks[j].staticObjects)
                for(let i = 0; i < this.chunks.activeChunks[j].staticObjects.length; i+=4) {
                    this.renderer.verticies.push(
                        this.chunks.activeChunks[j].staticObjects[i], this.chunks.activeChunks[j].staticObjects[i+1], 0.5, 0.2, 0.1,
                        this.chunks.activeChunks[j].staticObjects[i] + this.chunks.activeChunks[j].staticObjects[i+2], this.chunks.activeChunks[j].staticObjects[i+1], 0.5, 0.2, 0.1,
                        this.chunks.activeChunks[j].staticObjects[i] + this.chunks.activeChunks[j].staticObjects[i+2], this.chunks.activeChunks[j].staticObjects[i+1] + this.chunks.activeChunks[j].staticObjects[i+3], 0.5, 0.2, 0.1,
                        this.chunks.activeChunks[j].staticObjects[i] + this.chunks.activeChunks[j].staticObjects[i+2], this.chunks.activeChunks[j].staticObjects[i+1] + this.chunks.activeChunks[j].staticObjects[i+3], 0.5, 0.2, 0.1,
                        this.chunks.activeChunks[j].staticObjects[i], this.chunks.activeChunks[j].staticObjects[i+1] + this.chunks.activeChunks[j].staticObjects[i+3], 0.5, 0.2, 0.1,
                        this.chunks.activeChunks[j].staticObjects[i], this.chunks.activeChunks[j].staticObjects[i+1], 0.5, 0.2, 0.1,
                    );
                }
            }
        }



        this.chunks.update(dt);

    }
    draw() {
        this.renderer.draw();


        let vertices = [];
        this.entityQuad.draw(vertices);
        // console.log(vertices)
        // this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER)
        this.renderer.gl.bufferData(this.renderer.gl.ARRAY_BUFFER, new Float32Array(vertices), this.renderer.gl.STATIC_DRAW);
        this.renderer.gl.drawArrays(this.renderer.gl.LINES, 0, vertices.length / 5);
    }
}