// Create the canvas
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 375;
canvas.height = 667;
document.body.appendChild(canvas);

// The main game loop
let lastTime;
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    window.requestAnimationFrame(main);
};

function init() {
    bgPattern = ctx.createPattern(resources.get('img/bg.png'), 'repeat');

    reset();
    lastTime = Date.now();
    main();
}

resources.load([
    'img/sprites.png',
    'img/bg.png'
]);
resources.onReady(init);


// Game state
let player = {
    pos: [0, 0],
    side: 'left',
    state: 'flight',
    sprite: new Sprite('img/sprites.png', [0, 0], [34, 34], 13, [0, 1])
};

let walls = [];
let debris = [];

let gameTime = 0;
let bgPattern;

// The score
let col = 0;
let colEl = document.getElementById('col');

// Speed in pixels per second
let playerSpeed = 300;
let wallsSpeed = 100;
let debrisSpeed = 100;

// Update game objects
function update(dt) {
    gameTime += dt;

    updateEntities(dt);

    // It gets harder over time by adding enemies using this
    // equation: 1-.993^gameTime
    if (Math.random() < 1 - Math.pow(.993, gameTime)) {
        let pos = []
        if(Math.random() < 0.5) {
            pos = [42, -85]
        } else {
            pos = [canvas.width - 42 - 187, -85]
        }
        if (debris.length > 0) {
            if (debris[debris.length-1].pos[1] > 84) {
                debris.push({
                    pos: pos,
                    sprite: new Sprite('img/sprites.png', [0, 129], [187, 85])
                });
            }
        } else {
            debris.push({
                pos: pos,
                sprite: new Sprite('img/sprites.png', [0, 129], [187, 85])
            });
        }
    }

    checkCollisions();

    colEl.innerHTML = col;
};

document.addEventListener('keypress', function(event) {
    if (event.keyCode = 32) {
        if(player.side === 'right') {
            player.side = 'left';
            player.state = 'shift';
        } else {
            player.side = 'right';
            player.state = 'shift';
        }
    }
});

function updateEntities(dt) {
    // Update the player sprite animation
    if (player.side === 'right' && player.state === 'shift') {
        if (player.pos[0] < canvas.width / 2 + 102 - 17) {
            player.pos[0] += playerSpeed * dt;
        } else {
            player.state = 'flight';
        }
    } else if (player.side === 'left' && player.state === 'shift'){
        if (player.pos[0] > canvas.width / 2 - 102 - 17) {
            player.pos[0] -= playerSpeed * dt;
        } else {
            player.state = 'flight';
        }
    }
    player.sprite.update(dt);

    // Update all walls
    for (let i = 0; i < walls.length; i++) {
        walls[i].pos[1] += wallsSpeed * dt;
        walls[i].sprite.update(dt);

        // Remove if offscreen
        if (walls[i].pos[1] > canvas.height) {

            walls[i].pos[1] = 0 - 96;
        }
    }

    // Update all debris
    for (let i = 0; i < debris.length; i++) {
        debris[i].pos[1] += debrisSpeed * dt;
        debris[i].sprite.update(dt);

        // Remove if offscreen
        if (debris[i].pos[1] > canvas.height) {
            debris.splice(i, 1);
            i--;
        }
    }
}

// Collisions

function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
        b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1],
        pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
        pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();

    for (let i = 0; i < debris.length; i++) {
        let pos = debris[i].pos;
        let size = debris[i].sprite.size;

        if (boxCollides(pos, size, player.pos, player.sprite.size)) {
            col++;
        }
    }
}

function checkPlayerBounds() {
    // Check bounds
    if (player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
        player.pos[0] = canvas.width - player.sprite.size[0];
    }

    if (player.pos[1] < 0) {
        player.pos[1] = 0;
    }
    else if (player.pos[1] > canvas.height - player.sprite.size[1]) {
        player.pos[1] = canvas.height - player.sprite.size[1];
    }
}

// Draw everything
function render() {
    ctx.fillStyle = bgPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render the player if the game isn't over
    if (!isGameOver) {
        renderEntity(player);
    }

    renderEntities(walls);
    renderEntities(debris);
};

function renderEntities(list) {
    for (let i = 0; i < list.length; i++) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

// Reset game to original state
function reset() {
    isGameOver = false;
    gameTime = 0;
    score = 0;

    enemies = [];
    bullets = [];

    player.pos = [canvas.width / 2 - 102 - 17, canvas.height - 120];

    const numberOfWalls = Math.ceil(canvas.height / 96) + 1;
    for (let i = 1; i <= numberOfWalls; i++) {
        walls.push({
            pos: [0 - 42, canvas.height - i * 96],
            sprite: new Sprite('img/sprites.png', [0, 34], [85, 96])
        });
        walls.push({
            pos: [canvas.width - 85 + 42, canvas.height - i * 96],
            sprite: new Sprite('img/sprites.png', [0, 34], [85, 96])
        });
    }

};
