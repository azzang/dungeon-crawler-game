var Random = require('../utilities/Random');
var Square = require('../utilities/Square');

function Enemy(dungeon, level) {
  Square.call(this, 1, null, 'enemy');
  this.health = 100;
  this.level = level;
  this.drawRandomly(dungeon);
}

Enemy.prototype = Object.create(Square.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reactToPlayer = function(player, dungeon) {
  player.battle(this);
  this.battle(player);
  if (this.health <= 0) {
    player.experience += 10;
    player.erase(this, dungeon);
  }
};

Enemy.prototype.battle = function(player) {
  var power = Math.pow(2, this.level + 1);
  var percentHealthItem = 1 / Math.ceil(20 / power); // [0.1, 1]
  var maxDamage = Math.floor(20 * percentHealthItem);
  var minDamage = Math.floor(maxDamage * 0.75);
  var random = new Random(minDamage, maxDamage + 1); // + 1 => inclusive
  player.health -= random.x;
};

module.exports = Enemy;
