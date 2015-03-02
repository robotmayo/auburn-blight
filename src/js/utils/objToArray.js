module.exports = function(obj){
  return Object.keys(obj).map(function(k){
    return obj[k];
  });
}