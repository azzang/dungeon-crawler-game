var Vector = require('../utilities/Vector');
var Random = require('../utilities/Random');
var Rectangle = require('../utilities/Rectangle');
var Floor = require('../structures/Floor');

function Room(parentsOutgoingSide, exitOrigin) {
  this.dimensions = new Random(5, 20, 5, 20);
  this.origin = this.getOrigin(parentsOutgoingSide, exitOrigin);
}

Room.prototype = Object.create(Rectangle.prototype);
Room.prototype.constructor = Rectangle;

Room.prototype.getVectorToExit = function(side) {
  var random = new Random(0, this.dimensions.x, 0, this.dimensions.y);
  switch(side) {
    case 'top':
      return new Vector(random.x, -1);
    case 'right':
      return new Vector(this.dimensions.x, random.y);
    case 'bottom':
      return new Vector(random.x, this.dimensions.y);
    case 'left':
      return new Vector(-1, random.y);
    default: return;
  }
}

Room.prototype.getExit = function(outgoingSide) {
  var origin = this.origin.plus(this.getVectorToExit(outgoingSide));
  return new Floor(origin);
};

Room.prototype.getOrigin = function(parentsOutgoingSide, exitOrigin) {
  if (parentsOutgoingSide) { // if not root
    var incomingSide = this.invertSide(parentsOutgoingSide);
    var vectorToOrigin = this.getVectorToExit(incomingSide).times(-1);
    return exitOrigin.plus(vectorToOrigin);
  }
  var MaxX = 100 - this.dimensions.x;
  var MaxY = 100 - this.dimensions.y;
  return new Random(0, MaxX, 0, MaxY);
};

Room.prototype.invertSide = function(side) {
  switch(side) {
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    default: return;
  }
};

module.exports = Room;
