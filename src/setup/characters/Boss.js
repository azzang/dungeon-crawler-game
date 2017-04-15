var Square = require('../utility/Square');
var Random = require('../utility/Random');

/*
READ THIS:
changed player and app.js to mock level 4!
commented out square draw method and updated room and Rectangle
rectangle now has the draw method: which can now take a constructor
which will be called

it seems like i don't need to create several boss objects
i can just 

*/

function Boss(dungeon) {
  Square.call(this, 2, null, 'boss');

  this.health = 1e4;
  this.drawRandomly(dungeon);
  console.log('bossssssss', this.origin);
}

Boss.prototype = Object.create(Square.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.reactToPlayer = function(player, dungeon) {
  console.log('boss battle is on');
  /*player.battle(this);
  this.battle(player);
  if (this.health <= 0) {
    player.experience += 250;
    player.erase(this, dungeon);
  }*/
};

Boss.prototype.battle = function(player) {
  /*var power = Math.pow(2, this.level + 1);
  var healthItemValue = 20;
  var percentHealthItem = 1 / Math.ceil(healthItemValue / power); // ranges from 10% to 100%
  var maxDamage = Math.floor(healthItemValue * percentHealthItem);
  var minDamage = Math.floor(maxDamage * 0.75); // adjust damage range here*/
  var maxDamage = 2;
  var minDamage = 0;
  var random = new Random(minDamage, maxDamage);
  var damage = random.x;
  player.health -= damage;
  console.log('max, min, damage, percenthealth = ', maxDamage, minDamage, damage);
};

module.exports = Boss;
