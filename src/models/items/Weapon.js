var Square = require('../utilities/Square');

function Weapon(dungeon, level) {
  Square.call(this, 1, null, 'weapon');
  this.name = this.getName(level);
  this.lethality = (level + 2) * 10;
  this.drawRandomly(dungeon);
}

Weapon.prototype = Object.create(Square.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.reactToPlayer = function(player, dungeon) {
  player.weaponName = this.name;
  player.weaponLethality = this.lethality;
  player.erase(this, dungeon);
};

Weapon.prototype.getName = function(level) {
  switch(level) {
    case 0:
      return 'brass knuckles';
    case 1:
      return 'serrated dagger';
    case 2:
      return 'katana';
    case 3:
      return 'reapers scythe';
    case 4:
      return 'large trout';
    default: return;
  }
};

module.exports = Weapon;
