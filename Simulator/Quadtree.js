class Quadtree {
    constructor(x, y, w, h, depth, maxDepth, maxObjects) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.maxDepth = maxDepth;
        this.depth = depth
        this.maxObjects = maxObjects;

        this.objects = [];

        this.children = [];
        this.isSplit = false;
    }
    queryRange(x, y, w, h, arr) {
        if(x + w > this.x && x < this.x + this.width && y + h > this.y && y < this.y + this.height) {
            if(this.isSplit) {
                this.children[0].queryRange(x, y, w, h, arr);
                this.children[1].queryRange(x, y, w, h, arr);
                this.children[2].queryRange(x, y, w, h, arr);
                this.children[3].queryRange(x, y, w, h, arr);
            }   else {
                for(let i = 0; i < this.objects.length; i++) {
                    arr[arr.length] = this.objects[i]
                    // arr.push(this.objects[i])
                }
            }
        }
    }
    draw(vertices) {
        if(this.isSplit) {
            this.children[0].draw(vertices);
            this.children[1].draw(vertices);
            this.children[2].draw(vertices);
            this.children[3].draw(vertices);
        }   else {
            vertices.push(
                this.x, this.y, 0.6, 0.3, 0.7,
                this.x + this.width, this.y, 0.6, 0.3, 0.7,
                this.x + this.width, this.y, 0.6, 0.3, 0.7,
                this.x + this.width, this.y + this.height, 0.6, 0.3, 0.7,
                this.x + this.width, this.y + this.height, 0.6, 0.3, 0.7,
                this.x, this.y + this.height, 0.6, 0.3, 0.7,
                this.x, this.y + this.height, 0.6, 0.3, 0.7,
                this.x, this.y, 0.6, 0.3, 0.7,
            );
        }
    }
    insert(object) {
        if(object.x + object.r > this.x && object.x - object.r < this.x + this.width && object.y + object.r > this.y && object.y - object.r < this.y + this.height) {
            if(!this.isSplit) {
                if(this.objects.length<this.maxObjects || this.depth >= this.maxDepth) {
                    this.objects.push(object)
                }   else {
                    this.objects.push(object)
                    this.isSplit = true;
                    this.children[0] = new Quadtree(this.x, this.y, this.width/2, this.height/2, this.depth+1, this.maxDepth, this.maxObjects);
                    this.children[1] = new Quadtree(this.x + this.width/2, this.y, this.width/2, this.height/2, this.depth+1, this.maxDepth, this.maxObjects);
                    this.children[2] = new Quadtree(this.x, this.y+ this.height/2, this.width/2, this.height/2, this.depth+1, this.maxDepth, this.maxObjects);
                    this.children[3] = new Quadtree(this.x + this.width/2, this.y + this.height/2, this.width/2, this.height/2, this.depth+1, this.maxDepth, this.maxObjects);
                    
                    let point;
                    for(let i = this.objects.length - 1; i >= 0; i--) {
                        point = this.objects[i]
                        // point = this.objects.splice(i, 1)[0]
                        this.children[0].insert(point);
                        this.children[1].insert(point);
                        this.children[2].insert(point);
                        this.children[3].insert(point);
                    }
                }
            }else {
            this.children[0].insert(object);
            this.children[1].insert(object);
            this.children[2].insert(object);
            this.children[3].insert(object);
        }
        }   
    }
}



// quadtree.insert({x: 0,y: 0,r:  10}, quadtree)