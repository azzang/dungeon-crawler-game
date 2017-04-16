var Vector = require('./Vector');
var Random = require('./Random');
var Rectangle = require('./Rectangle');

function Square(sideLength, origin, selector) {
  this.dimensions = new Vector(sideLength, sideLength);
  this.origin = origin;
  this.selector = selector;
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Rectangle;

Square.prototype.drawRandomly = function(dungeon) {
  this.origin = new Random(0, 100, 0, 100);
  if (!this.canFit(dungeon, 'floor')) {
    return this.drawRandomly(dungeon);
  }
  this.draw(dungeon);
};

module.exports = Square;
