var Floor = require('../structures/Floor');

var Random = require('../utilities/Random');
var Square = require('../utilities/Square');
var Vector = require('../utilities/Vector');

function Player(dungeon) {
  Square.call(this, 1, null, 'player');
  this.health = 100;
  this.weaponName = 'stick';
  this.weaponLethality = 10; // [10, 60]
  this.level = 0;
  this.experience = 0;
  this.drawRandomly(dungeon);
}

Player.prototype = Object.create(Square.prototype);
Player.prototype.constructor = Player;

Player.prototype.getDestination = function(keyCode) {
  switch(keyCode) {
    case 37: // left
      return this.origin.plus(new Vector(-1, 0));
    case 38: // up
      return this.origin.plus(new Vector(0, -1));
    case 39: // right
      return this.origin.plus(new Vector(1, 0));
    case 40: // down
      return this.origin.plus(new Vector(0, 1));
    default: return;
  }
};

Player.prototype.move = function(keyCode, dungeon) {
  var destination = this.getDestination(keyCode);
  var row = dungeon[destination.y];
  var itemInWay = row ? row[destination.x] : undefined;
  if (itemInWay) {
    itemInWay.reactToPlayer(this, dungeon);
  }
  return dungeon;
};

Player.prototype.battle = function(enemy) {
  var power = (this.level + 1) * this.weaponLethality; // [10, 300]
  var minDamage = Math.round(((9 * power) + 100) / 28); // [7, 100]
  var maxDamage = Math.round(minDamage / 0.75);
  var random = new Random(minDamage, maxDamage);
  enemy.health -= random.x;
};

Player.prototype.shouldLevelUp = function() {
  return this.experience === (this.level + 1) * 50 && this.level < 4;
};

Player.prototype.isDead = function() {
  return this.health <= 0;
};

Player.prototype.isVictorious = function() {
  return this.experience === 500;
};

Player.prototype.levelUp = function(dungeon) {
  this.level += 1;
  this.drawRandomly(dungeon);
};

Player.prototype.erase = function(item, dungeon) {
  item.draw(dungeon, Floor);
};

module.exports = Player;
