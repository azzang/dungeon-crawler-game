var Manifest = require('./Manifest');

var Enemy = require('./characters/Enemy');
var Boss = require('./characters/Boss');

var Health = require('./items/Health');
var Weapon = require('./items/Weapon');

var Room = require('./structures/Room');
var Wall = require('./structures/Wall');

function init(dungeon) {
  for (var i = 0; i < 100; i++) {
    dungeon[i] = [];
    for (var j = 0; j < 100; j++) {
      dungeon[i][j] = new Wall();
    }
  }
}

function drawRooms(room, dungeon) {
  room.floor(dungeon);
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
    console.log(item);
    //item.draw(dungeon);
  }
}

function getDungeon(level) {
  var dungeon = [];
  var roomCount = 0;
  var manifest = new Manifest(level);

  init(dungeon);

  while (roomCount < 4) { // happens rarely
    roomCount = drawRooms(new Room(), dungeon);
  }

  decorateRooms(dungeon, manifest, level);

  return dungeon;
}

module.exports = getDungeon;
