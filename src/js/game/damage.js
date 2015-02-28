var DAMAGE_TYPES = require('ab-data/constants/damage-types');
function Damage () {
  this.damageList = [];
}

Damage.prototype.add = function(value, type, element) {
  this.damageList.push({
    value : (typeof value === 'function' ? value() : value),
    type : type,
    element : element
  });
  return this;
};

module.exports = Damage;