var Vector = require('./Vector');

function Rectangle(dimensions, origin) {
  this.dimensions = dimensions;
  this.origin = origin;
}

Rectangle.prototype.traverse = function(action) {
  for (var i = this.origin.y; i < this.origin.y + this.dimensions.y; i++) {
    for (var j = this.origin.x; j < this.origin.x + this.dimensions.x; j++) {
      if (action(i, j)) { // handle predicates
        return true;
      }
    }
  }
};

Rectangle.prototype.canFit = function(dungeon, allowed) {
  return !this.traverse((i, j) => {
    if (!dungeon[i] || !dungeon[i][j] || dungeon[i][j].selector !== allowed) {
      return true;
    }
  });
};

Rectangle.prototype.draw = function(dungeon, Item) {
  this.traverse((i, j) => {
    dungeon[i][j] = Item ? new Item(new Vector(j, i)) : this;
  });
};

module.exports = Rectangle;
