var Vector = require('./Vector');

function Random(minX, maxX, minY, maxY) {
  this.x = this.randomInRange(minX, maxX);
  this.y = this.randomInRange(minY, maxY);
}

Random.prototype = Object.create(Vector.prototype);
Random.prototype.constructor = Vector;

Random.prototype.randomInRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = Random;
