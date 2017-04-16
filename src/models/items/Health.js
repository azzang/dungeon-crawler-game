var Square = require('../utilities/Square');

function Health(dungeon) {
  Square.call(this, 1, null, 'health');
  this.drawRandomly(dungeon);
}

Health.prototype = Object.create(Square.prototype);
Health.prototype.constructor = Health;

Health.prototype.reactToPlayer = function(player, dungeon) {
  player.health += 20;
  player.erase(this, dungeon);
};

module.exports = Health;
