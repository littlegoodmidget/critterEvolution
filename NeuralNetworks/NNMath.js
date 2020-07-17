let nnmath = {
    createMatrix(w, h, r = 1) {
        let matrix = [];
        for(let y = 0; y < h; y++) {
            matrix[y] = [];
            for(let x = 0; x < w; x++) {
                matrix[y][x] = (Math.random() - 0.5) * r * 2;
            }
        }
        return matrix;
    },
    createEmptyMatrix(w, h) {
        let matrix = [];
        for(let y = 0; y < h; y++) {
            matrix[y] = [];
            for(let x = 0; x < w; x++) {
                matrix[y][x] = 0;
            }
        }
        return matrix;
    },
    matrixMultiply(m1, m2) {
        let matrix = this.createEmptyMatrix(m2[0].length, m1.length);
        for(let i = 0; i < m1.length; i++) { //col of m1
            for(let j = 0; j < m2[0].length; j++) { //row of m2
                for(let z = 0; z < m1[i].length; z++) { //row of m1
                    matrix[i][j] += m1[i][z] * m2[z][j];
                }
            }
        }
        return matrix;
    },

    addBias(v, b) {
        let result = [];
        for(let y = 0; y < v.length; y++) {
            result[y] = [];
            for(let x = 0; x < v[y].length; x++) {
                result[y][x] = v[y][x] + b[y][x];
            }
        }
        return result;
    },

    sigmoid(n) {
        return 1 / (1 + Math.exp(-n));
    },
    sigmoidVec(v) {
        let result = [];
        for(let y = 0; y < v.length; y++) {
            result[y] = [];
            for(let x = 0; x < v[y].length; x++) {
                result[y][x] = this.sigmoid(v[y][x]);
            }
        }
        return result;
    },

    relu(n) {
        return (n >= 0)? n: 0;
    },
    reluVec(v) {
        let result = [];
        for(let y = 0; y < v.length; y++) {
            result[y] = [];
            for(let x = 0; x < v[y].length; x++) {
                result[y][x] = this.relu(v[y][x]);
            }
        }
        return result;
    },

    leakyRelu(n) {
        return (n >= 0)? n: n / 16;
    },
    leakyReluVec(v) {
        let result = [];
        for(let y = 0; y < v.length; y++) {
            result[y] = [];
            for(let x = 0; x < v[y].length; x++) {
                result[y][x] = this.leakyRelu(v[y][x]);
            }
        }
        return result;
    },

    elu(n) {
        return (n >= 0)? n: 0.1 * (Math.exp(n) - 1);
    },
    eluVec(v) {
        let result = [];
        for(let y = 0; y < v.length; y++) {
            result[y] = [];
            for(let x = 0; x < v[y].length; x++) {
                result[y][x] = this.elu(v[y][x]);
            }
        }
        return result;
    },
    // addBias(v, b) {
    //     // let result = [];
    //     for(let y = 0; y < v.length; y++) {
    //         // result[y] = [];
    //         for(let x = 0; x < v[y].length; x++) {
    //             v[y][x] += b[y][x];
    //         }
    //     }
    //     return v;
    // },

    // sigmoid(n) {
    //     return 1 / (1 + Math.exp(-n));
    // },
    // sigmoidVec(v) {
    //     // let result = [];
    //     for(let y = 0; y < v.length; y++) {
    //         // result[y] = [];
    //         for(let x = 0; x < v[y].length; x++) {
    //             v[y][x] = this.sigmoid(v[y][x]);
    //         }
    //     }
    //     return v;
    // },

    // relu(n) {
    //     return (n >= 0)? n: 0;
    // },
    // reluVec(v) {
    //     // let result = [];
    //     for(let y = 0; y < v.length; y++) {
    //         // result[y] = [];
    //         for(let x = 0; x < v[y].length; x++) {
    //             v[y][x] = this.relu(v[y][x]);
    //         }
    //     }
    //     return v;
    // },

    // leakyRelu(n) {
    //     return (n >= 0)? n: n / 16;
    // },
    // leakyReluVec(v) {
    //     // let result = [];
    //     for(let y = 0; y < v.length; y++) {
    //         // result[y] = [];
    //         for(let x = 0; x < v[y].length; x++) {
    //             v[y][x] = this.leakyRelu(v[y][x]);
    //         }
    //     }
    //     return v;
    // },

    // elu(n) {
    //     return (n >= 0)? n: 0.1 * (Math.exp(n) - 1);
    // },
    // eluVec(v) {
    //     // let result = [];
    //     for(let y = 0; y < v.length; y++) {
    //         // result[y] = [];
    //         for(let x = 0; x < v[y].length; x++) {
    //             v[y][x] = this.elu(v[y][x]);
    //         }
    //     }
    //     return v;
    // },
}