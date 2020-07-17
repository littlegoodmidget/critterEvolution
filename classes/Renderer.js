class Renderer {
    constructor(vshaderSource, fshaderSource, canvas = document.createElement('canvas')) {
        this.canvas = canvas;
        document.body.appendChild(this.canvas);
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        // canvas.width = 600;
        // canvas.height = 600;
        this.gl = canvas.getContext('webgl');
        this.gl.clearColor(0.2, 0.6, 0.5, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.attribLocations = {
            
        }
        this.uniformLocations = {
            
        }

        this.verticies = [];

        this.vshader;
        this.fshader;
        this.program;

        this.buffer = this.gl.createBuffer();
        this.setup(vshaderSource, fshaderSource)
        this.drawTriangle();
    }
    setup(vsource, fsource) {
        this.vshader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.fshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(this.vshader, vsource);
        this.gl.shaderSource(this.fshader, fsource);
        this.gl.compileShader(this.vshader);
        this.gl.compileShader(this.fshader);
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, this.vshader);
        this.gl.attachShader(this.program, this.fshader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        console.log('vshader log:', this.gl.getShaderInfoLog(this.vshader) === ''? 'Empty': this.gl.getShaderInfoLog(this.vshader));
        console.log('fshader log:', this.gl.getShaderInfoLog(this.fshader) === ''? 'Empty': this.gl.getShaderInfoLog(this.fshader));
        console.log('program log:', this.gl.getProgramInfoLog(this.program) === ''? 'Empty': this.gl.getProgramInfoLog(this.program))


        this.attribLocations['a_position'] = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(this.attribLocations['a_position']);
        this.attribLocations['a_color'] = this.gl.getAttribLocation(this.program, 'a_color');
        this.gl.enableVertexAttribArray(this.attribLocations['a_color']);


        this.uniformLocations['u_matrix'] = this.gl.getUniformLocation(this.program, 'u_matrix');
    }
    drawTriangle() {
        let verticies = [
            300, 0,
            0, 600,
            600, 600
        ]

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(verticies), this.gl.STATIC_DRAW);

        let matrix = m3.projection(this.canvas.width, this.canvas.height);
        matrix = m3.translate(matrix, this.canvas.width / 2, this.canvas.height / 2);
        matrix = m3.rotate(matrix, 0 / 180 * Math.PI)
        matrix = m3.scale(matrix, 1, 1)
        console.log(matrix)
        matrix = m3.translate(matrix, -300, -300);
        // console.log(matrix)
        this.gl.uniformMatrix3fv(this.uniformLocations['u_matrix'], false, matrix)
        this.gl.vertexAttribPointer(this.attribLocations['a_position'], 2, this.gl.FLOAT, false, 20, 0);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, verticies.length / 5);
    }
    clearVerticies() {
        this.verticies = [];
    }
    draw() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.verticies), this.gl.STATIC_DRAW);

        this.gl.vertexAttribPointer(this.attribLocations['a_position'], 2, this.gl.FLOAT, false, 20, 0);
        this.gl.vertexAttribPointer(this.attribLocations['a_color'], 3, this.gl.FLOAT, false, 20, 8);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.verticies.length / 5);
    }
}