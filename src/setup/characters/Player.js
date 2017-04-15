var Square = require('../utility/Square');
var Random = require('../utility/Random');
var Floor = require('../structures/Floor');

function Player(dungeon) {
  Square.call(this, 1, null, 'player');
  this.health = 100;
  //this.weaponName = 'stick';
  //this.weaponLethality = 10; // ranges from 10 to 60
  this.weaponName = 'reapers scythe';
  this.weaponLethality = 50;
  //this.level = 0;
  //this.experience = 0;
  this.level = 4;
  this.experience = 200;
  this.drawRandomly(dungeon);
}

Player.prototype = Object.create(Square.prototype);
Player.prototype.constructor = Player;

Player.prototype.move = function(move, dungeon) {
  var destination = this.origin.plus(move);
  var itemInWay = dungeon[destination.y][destination.x];
  itemInWay.reactToPlayer(this, dungeon);
  return dungeon;
};

Player.prototype.battle = function(enemy) {
  var power = (this.level + 1) * this.weaponLethality; // ranges from 10 to 300
  var minDamage = Math.round(((9 * power) + 100) / 28); // ranges from 7 to 100
  var maxDamage = Math.round(minDamage / 0.75); // adjust damage range here
  var random = new Random(minDamage, maxDamage);
  var damage = random.x;
  enemy.health -= damage;
  console.log(minDamage, maxDamage, damage);
};

Player.prototype.shouldLevelUp = function() {
  return this.experience === (this.level + 1) * 50;
};

Player.prototype.levelUp = function(dungeon) {
  this.level += 1;
  this.drawRandomly(dungeon);
};

Player.prototype.erase = function(item, dungeon) {
  item.traverse((i, j) => {
    dungeon[item.origin.y][item.origin.x] = new Floor(item.origin);
  });
};

module.exports = Player;
