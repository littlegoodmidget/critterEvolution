class NN {
    static mutateOnly(parent) {
        let childNN = new NN(parent.structure);
        for(let i = 0; i < parent.weights.length; i++) {
            for(let j = 0; j < parent.weights[i].length; j++) {
                for(let z = 0; z < parent.weights[i][j].length; z++) {
                    if(Math.random() < 0.1) {
                        if(Math.random() < 0.5) {
                            childNN.weights[i][j][z] = parent.weights[i][j][z] + (Math.random() - 0.5) * 0.2;
                        }   else {
                            childNN.weights[i][j][z] = (Math.random() - 0.5) * 2;
                        }
                    }   else {
                        childNN.weights[i][j][z] = parent.weights[i][j][z];
                    }
                }
            }
        }
        for(let i = 0; i < parent.biases.length; i++) {
            for(let j = 0; j < parent.biases[i].length; j++) {
                for(let z = 0; z < parent.biases[i][j].length; z++) {
                    if(Math.random() < 0.1) {
                        if(Math.random() < 0.5) {
                            childNN.biases[i][j][z] = parent.biases[i][j][z] + (Math.random() - 0.5) * 0.2;
                        }   else {
                            childNN.biases[i][j][z] = (Math.random() - 0.5) * 2;
                        }
                    }   else {
                        childNN.biases[i][j][z] = parent.biases[i][j][z];
                    }
                }
            }
        }
        return childNN
    }
    static crossover(parent1, parent2) {
        let childNN = new NN(parent1.structure);
        for(let i = 0; i < parent1.weights.length; i++) {
            for(let j = 0; j < parent1.weights[i].length; j++) {
                for(let z = 0; z < parent1.weights[i][j].length; z++) {
                    if(Math.random() < 0.5) {
                        childNN.weights[i][j][z] = parent1.weights[i][j][z];
                    }   else {
                        childNN.weights[i][j][z] = parent2.weights[i][j][z];
                    }
                    if(Math.random() < 0.05) {
                        if(Math.random() < 0.5) {
                            childNN.weights[i][j][z] += (Math.random() - 0.5) * 0.2;
                        }   else {
                            childNN.weights[i][j][z] = (Math.random() - 0.5) * 2;
                        }
                    }
                }
            }
        }
        for(let i = 0; i < parent1.biases.length; i++) {
            for(let j = 0; j < parent1.biases[i].length; j++) {
                for(let z = 0; z < parent1.biases[i][j].length; z++) {
                    if(Math.random() < 0.5) {
                        childNN.biases[i][j][z] = parent1.biases[i][j][z];
                    }   else {
                        childNN.biases[i][j][z] = parent2.biases[i][j][z];
                    }
                    if(Math.random() < 0.05) {
                        if(Math.random() < 0.5) {
                            childNN.biases[i][j][z] += (Math.random() - 0.5) * 0.2;
                        }   else {
                            childNN.biases[i][j][z] = (Math.random() - 0.5) * 2;
                        }
                    }
                }
            }
        }
        return childNN;
    }
    constructor(structure, activationStructure) {
        this.structure = structure;
        this.activationStructure = activationStructure;
        this.weights = [];
        this.biases = [];

        let w, h;
        for(let i = 0; i < this.structure.length - 1; i++) {
            w = this.structure[i];
            h = this.structure[i + 1];

            this.weights.push(
                nnmath.createMatrix(w, h, 1)
            );
            this.biases.push(
                nnmath.createMatrix(1, h, 1)
            );
        }

        this.output;

        this.score = 0;
    }
    feedFowards(input) {
        this.output = input;
        for(let i = 0; i < this.structure.length - 1; i++) {
            this.output = nnmath.matrixMultiply(this.weights[i], this.output);
            this.output = nnmath.addBias(this.output, this.biases[i]);

            if(i == this.structure.length - 2) {
                this.output = nnmath.sigmoidVec(this.output);
            } else if(i == 0) {
                // this.output = nnmath.sigmoidVec(this.output);
                this.output = nnmath.eluVec(this.output);
            }   else {
                // this.output = nnmath.eluVec(this.output);
                this.output = nnmath.reluVec(this.output);
            }
        }

        return this.output;
    }
}