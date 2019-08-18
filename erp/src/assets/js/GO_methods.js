import store from '../../store';
import { SIDE_MENU, R2R } from "@js/model";

//set
export function GO_initSet() {
  const { role } = store.state.user;
  store.state.side_menu = new SIDE_MENU(role);
  store.state.R2R = new R2R(role);
}
export function GO_clearSet() {
  store.state.init = true;
  window.sessionStorage.clear();
  window.localStorage.clear();
  let highestTimeoutId = setTimeout(";");
  for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
}
//fn
export function GO_isSCS(val) {
  return /^success/.test(val);
}
export function GO_inject(obj1, obj2) {//obj1 --> obj2
  for (const key in obj1) {
    if (typeof obj2[key] !== "undefined") {
      obj2[key] = GO_DClone(obj1[key]);
    }
  }
}
export function GO_fetch(obj1, obj2) {//obj1 <-- obj2
  for (const key in obj1) {
    if (typeof obj2[key] !== "undefined") {
      obj1[key] = GO_DClone(obj2[key]);
    }
  }
}
export function GO_DClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}