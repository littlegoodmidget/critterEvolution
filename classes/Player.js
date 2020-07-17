class Player {
    constructor(x, y, chunkX, chunkY) {
        this.x = x;
        this.y = y;
        this.r = 20;

        this.chunkX = ~~chunkX;
        this.chunkY = ~~chunkY;

        this.w = false;
        this.s = false;
        this.a = false;
        this.d = false;
        this.q = false;
        this.e = false;
        this.z = false;
        this.t = false;
        
        this.hor = 0;
        this.vert = 0;
        this.rot = 0;

        this.vx = 0;
        this.vy = 0;

        this.width = 40;
        this.height = 40;
        this.matrix = m3.projection(innerWidth, innerHeight);//might break

        this.rotation = 0;

        this.health = 9e99;
        this.invisible = true;

        this.type = 1;
        this.diet = 0;
    }
    update(t) {
        if(this.z) this.rotation = 0;
        this.rot = this.q - this.e;
        this.rotation += this.rot * 0.05;

        this.hor = (this.d - this.a) / 2;
        this.vert = (this.s - this.w) / 2;

        this.vx += this.hor * Math.cos(-this.rotation) - this.vert * Math.sin(-this.rotation);
        this.vy += this.hor * Math.sin(-this.rotation) + this.vert * Math.cos(-this.rotation);

        {
            this.matrix = m3.projection(innerWidth, innerHeight);
            this.matrix = m3.translate(this.matrix, innerWidth/2 + Math.cos(this.rotation), innerHeight/2 + Math.sin(this.rotation));
            this.matrix = m3.rotate(this.matrix, this.rotation);
            this.matrix = m3.translate(this.matrix, -this.x, -this.y);
            // this.matrix = m3.translate(this.matrix, - this.width / 2 - this.x, - this.height / 2 - this.y);
            if(this.t) this.matrix = m3.translate(this.matrix, Math.sin(this.rotation) * 100, Math.cos(this.rotation) * 100);
            // this.matrix = m3.translate(this.matrix, -20, -20);
        }

        this.x += this.vx;
        this.y += this.vy;

        {
            this.chunkX = ~~((this.x + 3000 + this.width / 2) / 750);
            this.chunkY = ~~((this.y + 3000 + this.height / 2) / 750);
            // this.chunkX = ~~((this.x + 3000 + this.width / 2) / 600);
            // this.chunkY = ~~((this.y + 3000 + this.height / 2) / 600);
        }

        this.vx *= 0.8;
        this.vy *= 0.8;
    }
    uploadVerticies(verticies) {
        verticies.push(
            this.x - this.r, this.y - this.r, 0.5, 0.2, 0.5,
            this.x + this.r, this.y + this.r, 0.5, 0.2, 0.5,
            this.x + this.r, this.y - this.r, 0.5, 0.2, 0.5,
            this.x - this.r, this.y - this.r, 0.5, 0.2, 0.5,
            this.x + this.r, this.y + this.r, 0.5, 0.2, 0.5,
            this.x - this.r, this.y + this.r, 0.5, 0.2, 0.5,
        );
        // verticies.push(
        //     this.x, this.y, 0.5, 0.2, 0.5,
        //     this.x + this.width, this.y, 0.5, 0.2, 0.5,
        //     this.x + this.width, this.y + this.height, 0.5, 0.2, 0.5,
        //     this.x + this.width, this.y + this.height, 0.5, 0.2, 0.5,
        //     this.x, this.y + this.height, 0.5, 0.2, 0.5,
        //     this.x, this.y, 0.5, 0.2, 0.5,
        // );
    }
}