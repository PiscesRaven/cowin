[String, Array].forEach(el => {
  el.prototype.has = function (val) {
    if (Array.isArray(val)) return val.map(x => this.valueOf().indexOf(x) > -1).indexOf(true) > -1;
    return this.valueOf().indexOf(val) > -1;
  };
});
console.__proto__.dev = function () {
  if (process.env.NODE_ENV) console.log(...arguments);
};
[Number, String].forEach(el => {
  el.prototype.toPrice = function () {
    return this.valueOf().toString().replace(/\B(?=(\d{3})+$)/g, ',')
  };
});