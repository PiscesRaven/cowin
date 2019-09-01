//fn
export function GO_isScs(val) {
  return /^success/.test(val);
}
export function GO_isUdf(val) {
  return typeof val === "undefined";
}
export function GO_isNum(val) {
  return typeof val === "number";
}
export function GO_isObj(val) {
  return typeof val === "number";
}
export function GO_inject(obj1, obj2) {
  //obj1 --> obj2
  for (const key in obj1) {
    if (!GO_isUdf(obj2[key])) {
      obj2[key] = GO_DClone(obj1[key]);
    }
  }
}
export function GO_fetch(obj1, obj2) {
  //obj1 <-- obj2
  for (const key in obj1) {
    if (!GO_isUdf(obj2[key])) {
      obj1[key] = GO_DClone(obj2[key]);
    }
  }
}
export function GO_DClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function GO_fn_rebuilder(val) {
  if (Array.isArray(val)) val[0](...val.slice(1));
  else val();
}
export function GO_highLight(filterStr, val) {
  filterStr = (filterStr || "").trim();
  const matchStr = ((val || "").match(new RegExp(`${filterStr}`, "im")) || [])[0] || "";
  return !!matchStr ? (val || "").replace(new RegExp(`${matchStr}`, "m"), `<b>${matchStr}</b>`) : val;
}
