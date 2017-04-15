var Square = require('../utility/Square');

function Wall() {
  Square.call(this, 1, null, 'wall');
}

Wall.prototype = Object.create(Square.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.reactToPlayer = function() {};

module.exports = Wall;
