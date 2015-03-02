var xtend = require('xtend');
function Skill(data){
  this.name = data.name;
  this.cooldown = 0;
  this.baseCooldown = data.baseCooldown;
  this.castTime = data.castTime;
  this.costs = xtend({}, data.costs);
}

Skill.prototype.applyCost = function(player, enemy) {
  if(cost.ap) player.stats.ap.subtract(this.costs.ap);
  if(cost.mp) player.stats.mp.subtract(this.costs.mp);
  if(cost.hp) player.stats.hp.subtract(this.costs.hp);
};

Skill.prototype.canUse = function(player, enemy) {
  return this.cooldown === 0 && this.checkCosts();
};

Skill.prototype.checkCosts = function(player, enemy) {
  if(this.costs.ap && player.stats.ap.current < this.costs.ap) return false;
  if(this.costs.mp && player.stats.mp.current < this.costs.mp) return false;
  if(this.costs.hp && player.stats.hp.current > this.costs.hp) return false;
  return true;
};


module.exports = Skill;