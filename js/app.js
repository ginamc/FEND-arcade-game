// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y + 55; //centering the enemy along the y axis
    this.speed = speed // control how fast enemies move
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // if enemy doesn't pass boundary line
    if (this.x < this.boundary) {
        //move forward and increment x by spped * dt
        this.x += this.speed * dt;
    } else { // else reset to start position
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101; //distance block to block on x axis
        this.jump = 83; // distance block block on y axis
        this.startX = this.step * 2; // 2 blocks to right on x axis
        this.startY = (this.jump * 4) + 55; // 5 blocks down from top row with padding to centralize player, padding is same as enemy axis
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                    break;
                }
        }

    }

    update() {
        //check collision - did player collid with enemy?
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.step / 2 > this.x && enemy.x < this.x + this.step / 2)) { // reducing the collision distance by half
                this.reset();
            }
        }
        // check win - did player make it to the water tile?
        if (this.y === 55) {
            this.victory = true;
        }
    }

    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}

const player = new Player();
const bug1 = new Enemy(-101, 0, 175);
const bug2 = new Enemy(-101, 83, 115);
const bug3 = new Enemy((-101 * 2.5), 83, 200);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
console.log(allEnemies);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});