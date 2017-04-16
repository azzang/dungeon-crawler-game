var Enemy = require('./models/characters/Enemy');
var Boss = require('./models/characters/Boss');

var Health = require('./models/items/Health');
var Weapon = require('./models/items/Weapon');

var Floor = require('./models/structures/Floor');
var Room = require('./models/structures/Room');
var Wall = require('./models/structures/Wall');

var Manifest = require('./models/utilities/Manifest');

function init(dungeon) {
  for (var i = 0; i < 100; i++) {
    dungeon[i] = [];
    for (var j = 0; j < 100; j++) {
      dungeon[i][j] = new Wall();
    }
  }
}

function drawRooms(room, dungeon) {
  room.draw(dungeon, Floor);
  var count = 1;
  'top right bottom left'.split(' ').forEach((side) => {
    var exit = room.getExit(side);
    if (exit.canFit(dungeon, 'wall')) {
      var child = new Room(side, exit.origin);
      if (child.canFit(dungeon, 'wall')) {
        exit.draw(dungeon);
        count += drawRooms(child, dungeon);
      }
    }
  });
  return count;
}

function getConstructor(name) {
  switch(name) {
    case 'health':
      return Health;
    case 'weapon':
      return Weapon;
    case 'enemy':
      return Enemy;
    case 'boss':
      return Boss;
    default: return;
  }
}

function decorateRooms(dungeon, manifest, level) {
  var itemName, item, Item;
  while (itemName = manifest.next()) {
    Item = getConstructor(itemName);
    item = new Item(dungeon, level);
  }
}

module.exports = function(level) {
  var dungeon = [];
  var roomCount = 0;
  var manifest = new Manifest(level);

  init(dungeon);

  while (roomCount < 4) { // happens rarely
    roomCount = drawRooms(new Room(), dungeon);
  }

  decorateRooms(dungeon, manifest, level);

  return dungeon;
};
