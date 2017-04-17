var Square = require('../utilities/Square');
var Random = require('../utilities/Random');

function Boss(dungeon) {
  Square.call(this, 2, null, 'boss');
  this.health = 1e4;
  this.drawRandomly(dungeon);
}

Boss.prototype = Object.create(Square.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.reactToPlayer = function(player, dungeon) {
  player.battle(this);
  this.battle(player);
  if (this.health <= 0) {
    player.experience += 250;
    player.erase(this, dungeon);
  }
};

Boss.prototype.battle = function(player) {
  var random = new Random(0, 2);
  player.health -= random.x;
};

module.exports = Boss;
