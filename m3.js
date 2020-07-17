let m3 = {
    identity() {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ]
    },
    multiply(a, b) {
        let a00 = a[0];
        let a01 = a[3];
        let a02 = a[6];
        let a10 = a[1];
        let a11 = a[4];
        let a12 = a[7];
        let a20 = a[2];
        let a21 = a[5];
        let a22 = a[8];
        
        
        let b00 = b[0];
        let b01 = b[3];
        let b02 = b[6];
        let b10 = b[1];
        let b11 = b[4];
        let b12 = b[7];
        let b20 = b[2];
        let b21 = b[5];
        let b22 = b[8];

        return [
            a00 * b00 + a01 * b10 + a02 * b20,
            a10 * b00 + a11 * b10 + a12 * b20,
            a20 * b00 + a21 * b10 + a22 * b20,

            a00 * b01 + a01 * b11 + a02 * b21,
            a10 * b01 + a11 * b11 + a12 * b21,
            a20 * b01 + a21 * b11 + a22 * b21,

            a00 * b02 + a01 * b12 + a02 * b22,
            a10 * b02 + a11 * b12 + a12 * b22,
            a20 * b02 + a21 * b12 + a22 * b22,
        ]
    },
    translation(tx, ty) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ]
    },
    scaling(sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ]
    },
    rotation(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return [
            c, s, 0,
            -s, c, 0,
            0, 0, 1
        ]
    },
    projection(width, height) {
        return [
            2/width, 0, 0,
            0, -2/height, 0,
            -1, 1, 1
        ]
    },

    translate(m, tx, ty) {
        return this.multiply(m, this.translation(tx, ty));
    },
    scale(m, sx, sy) {
        return this.multiply(m, this.scaling(sx, sy));
    },
    rotate(m, rad) {
        return this.multiply(m, this.rotation(rad));
    }
}