class ChunkHolder {
    constructor(options) {
        if(options.mapWidth%options.chunkSize!=0 || options.mapHeight%options.chunkSize!=0) throw new Error('invalid chunk and map dimension(s)');
        this.chunkSize = options.chunkSize;
        this.mapWidth = options.mapWidth;
        this.mapHeight = options.mapHeight;
        this.options = options;

        this.chunks = [

        ]

        this.activeChunks = [

        ]

        for(let y = 0; y < options.mapHeight/options.chunkSize; y++) {
            this.chunks[y] = [];
            for(let x = 0; x < options.mapWidth/options.chunkSize; x++) {
                this.chunks[y][x] = new Chunk(x * options.chunkSize + options.startX, y * options.chunkSize + options.startY, options.chunkSize);
            }
        }
    }
    get getChunkSize() {
        return this.chunkSize;
    }
    update(dt) {
        for(let y = 0; y < this.chunks.length; y++) {
            for(let x = 0; x < this.chunks[y].length; x++) {
                this.chunks[y][x].update(dt); //either one idk
            }
        }
        for(let i = 0; i < this.activeChunks.length; i++) { //either one idk
            if(!this.activeChunks[i].active) {
                this.activeChunks.splice(i, 1);
                i--;
            }
        }//maybe have active and out of range tag. out of range still simultes animals every second updates neural network but at a lower frequency and out of sync from other chunks
    }
    insertObject(obj, type) { //object has x y w h
        let cx = ~~((obj.x - this.options.startX) / this.chunkSize);
        let cy = ~~((obj.y - this.options.startY) / this.chunkSize);

        if(type=='static') {
            this.chunks[cy][cx].staticObjects.push(obj);
        }   else if(type=='dynamic') {
            this.chunks[cy][cx].dynamicObjects.push(obj);
        }
    }
}


class Chunk {
    constructor(x, y, dimension) {
        this.x = x;
        this.y = y;
        this.dimension = dimension;
        this.active = false;
        this.activeTime = 0;


        this.unloading = false; //unloading is when updates become LESS frequent
        this.unloadingTime = 0;


        this.staticObjects = []; //trees, stones idk
        this.dynamicObjects = []; //players, animals

        {
            for(let i = 0; i < 6; i++) {
                let width = Math.random() < 0.5? 100: 200;
                // let height = Math.random() < 0.5? 100: 200;
                let height = width;
                // let width = Math.random() * 100 + 100;
                // let height = Math.random() * 100 + 100;
                this.staticObjects.push(
                    this.x + Math.random() * (this.dimension - width),
                    this.y + Math.random() * (this.dimension - height),
                    width, height
                );
            }
        }
    }
    update(dt) {
        if(!this.active) return;
        else {
            this.activeTime+=dt;

            if(this.activeTime > 10) {
                this.activeTime = 0;
                this.active = false;
            }
        }
    }
}