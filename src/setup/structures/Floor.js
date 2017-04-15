var Square = require('../utility/Square');

function Floor(origin) {
  Square.call(this, 1, origin, 'floor');
}

Floor.prototype = Object.create(Square.prototype);
Floor.prototype.constructor = Floor;

Floor.prototype.reactToPlayer = function(player, dungeon) {
  var temp = this.origin;
  this.origin = player.origin;
  player.origin = temp;
  dungeon[this.origin.y][this.origin.x] = this;
  dungeon[player.origin.y][player.origin.x] = player;
};

module.exports = Floor;
