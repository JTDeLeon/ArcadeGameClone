// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 1;
    this.y = (Math.floor(Math.random() * 200) + 50);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.speed = Math.floor(Math.random() * 100) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // this.x += (Math.floor(Math.random() * 6) + 1)*dt;
    if(this.x > 450){
      this.x = 1;
    }else{
      this.x += this.speed*dt;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
class Player {
  constructor(){
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
  }
  // This class requires an update(), render() and
  // a handleInput() method.

  update(direction){
    switch(direction){
      case 'left':
        if(this.x - 50 > 0){
          this.x -= 50;
          return this.x;
          break;
        }else{
          //this.x = (this.x - 50)+450;
          return this.x;
          break;
        }
      case 'up':
        if(this.y - 50 > -70){
          this.y -= 50;
          return this.y;
          break;
        }else{
          this.y = (this.y - 50)+520;
          return this.y;
          break;
        }
      case 'right':
        if(this.x + 50 < 450){
          this.x += 50;
          return this.x;
          break;
        }else{
          //this.x = (this.x + 50)-450;
          return this.x;
          break;
        }
      case 'down':
        if(this.y + 50 > 450){
          return this.y;
          break;
        }else{
          this.y += 50;
          return this.y;
          break;
        }
    }
  }

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key){
    switch(key){
      case 'left':
        this.update('left');
        break;
      case 'up':
        this.update('up');
        break;
      case 'right':
        this.update('right');
        break;
      case 'down':
        this.update('down');
        break;
    }
  }
}



// Now instantiate your objects.
let player = new Player();
console.log(player);

let numEnemies = 3;
let count = 1;
let allEnemies = [];

while(numEnemies){
  allEnemies.push(new Enemy());
  numEnemies-=1;
  count++;
}
// Place all enemy objects in an array called allEnemies
// let enemy1 = new Enemy();
// let enemy2 = new Enemy();
// let enemy3 = new Enemy();
//
// let allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player



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
