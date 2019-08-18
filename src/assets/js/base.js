[String, Array].forEach(el => {
  el.prototype.has = function (val) {
    if (Array.isArray(val)) return val.map(x => this.valueOf().indexOf(x) > -1).indexOf(true) > -1;
    return this.valueOf().indexOf(val) > -1;
  }
})