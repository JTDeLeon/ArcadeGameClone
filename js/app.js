// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 1;
    // this.y = (Math.floor(Math.random() * 200) + 50);
    this.y = (Math.floor(Math.random() * 3)*100)+50;
    //X Returns 50, 150, 250

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // this.speed = Math.floor(Math.random() * 100) + 50;
    this.speed = (Math.floor(Math.random() * 10)+10)*10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(this.x + " : " + this.y);
    if(this.x > 450){
      this.x = 1;
    }else{
      this.x += this.speed*dt;
    }

    //Handles the collision of enemy & Player
    if(this.x >= player.x-50 && this.x <= player.x+50 && this.y === player.y){
      //A collision has occured
      player.x = 200;
      player.y = 400;

      //Reset score when a collision occured
      document.querySelector('#score').textContent = 0;
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
    this.x = 200;
    this.y = 400;
  }
  // This class requires an update(), render() and
  // a handleInput() method.

  update(direction){
    switch(direction){
      case 'left':
        //console.log(this.x);
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
      //console.log(this.y);

        if(this.y - 50 >= 0){
          this.y -= 50;
          return this.y;
          break;
        }else{
          //Win the game
          //Update Score
          document.querySelector('#score').textContent = Number(document.querySelector('#score').textContent)+1;

          //Updates Best Score
          if(Number(document.querySelector('#score').textContent) > Number(document.querySelector('#best_score').textContent)){
            document.querySelector('#best_score').textContent = document.querySelector('#score').textContent;
          }
          //Update Player Location
          this.y = 400;
          this.x = 200;
          return this.y;
          break;
        }
      case 'right':
        //console.log(this.x);

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
      //console.log(this.y);

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
// Place the player object in a variable called player
let player = new Player();
//console.log(player);


// Place all enemy objects in an array called allEnemies
let numEnemies = 3;
let allEnemies = [];

while(numEnemies){
  allEnemies.push(new Enemy());
  numEnemies-=1;
}


//Adds Difficulty to the game after '5' seconds
setTimeout(function(){
  numEnemies = 3;

  while(numEnemies){
    let newEnemy = new Enemy();
    newEnemy.y = newEnemy.y+50;
    if(newEnemy.y >= 250){
      newEnemy.y = 100;
    }
    allEnemies.push(newEnemy);
    numEnemies-=1;
  }
},5000);






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

/* FUTURE ADDTIION @TODO
const playerOptions = [
    'boy',
    'cat-girl',
    'horn-girl',
    'pink-girl',
    'princess-girl'
];
const playerBar = document.querySelector('#player_bar');


const playersButtons = document.querySelector('#player_button');
playersButtons.addEventListener('click', function(){

  playerBar.classList.toggle('hide');
})

for(const urlSpriteID of playerOptions){
  let playerChar = document.querySelector('#'+urlSpriteID);
  playerChar.addEventListener('click',function(){
    console.log("I Clicked on "+urlSpriteID);
    console.log("MY playerChar is ");
    console.dir(playerChar);
    //playerChar.style.cssText = "border: 1px solid blue";
    let newChar = playerChar.getAttribute('src');
    console.log("new char is going to be set as : ");
    console.dir(newChar);

    // player.sprite = newChar;
  });

}



// playerBar.insertAdjacent
*/
