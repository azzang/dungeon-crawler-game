function Counts(max) {
  this.current = 0;
  this.max = max;
}

function Manifest(level) {
  this.health = new Counts(5);
  this.weapon = new Counts(1);
  this.enemy = new Counts(5);
  this.boss = new Counts(level === 4 ? 1 : 0);
}

Manifest.prototype.next = function() {
  for (var item in this) {
    if (this.hasOwnProperty(item) && this[item].current < this[item].max) {
      this[item].current += 1;
      return item;
    }
  }
};

module.exports = Manifest;
