let game = new Game();
let warpSpeed = 1;
game.loop(0);


window.addEventListener('keydown', function(e) {
    if(!e.repeat) {
        switch(e.code) {
            case 'KeyW':
                game.player.w = true;
                break;
            case 'KeyS':
                game.player.s = true;
                break;
            case 'KeyA':
                game.player.a = true;
                break;
            case 'KeyD':
                game.player.d = true;
                break;
            case 'KeyQ':
                game.player.q = true;
                break;
            case 'KeyE':
                game.player.e = true;
                break;
            case 'KeyZ':
                game.player.z = true;
                break;
            case 'KeyT':
                if(game.player.t) {
                    game.player.t = false;
                }   else {
                    game.player.t = true;
                }
                break;
        }
    }
})
window.addEventListener('keyup', function(e) {
    switch(e.code) {
        case 'KeyW':
            game.player.w = false;
            break;
        case 'KeyS':
            game.player.s = false;
            break;
        case 'KeyA':
            game.player.a = false;
            break;
        case 'KeyD':
            game.player.d = false;
            break;
        case 'KeyQ':
            game.player.q = false;
            break;
        case 'KeyE':
            game.player.e = false;
            break;
        case 'KeyZ':
            game.player.z = false;
            break;
        // case 'KeyT':
        //     game.player.t = false;
        //     break;
    }
})


window.addEventListener('mousedown', function(e) {
    // game.entities[0].x = game.player.x + game.entities[0].r;
    // game.entities[0].y = game.player.y + game.entities[0].r;
    // game.entities[0].dir = 0;
    // game.entities[0].update();
    // console.log(game.entities[0].angle21);
});