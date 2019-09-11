import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { VUEX_STATE } from "@js/model";
let state = new VUEX_STATE();
const _USER = JSON.parse(localStorage.getItem("user"));
if (_USER != null && typeof _USER === "object" && Object.keys(_USER).length) {
  state.isLogin = true;
  state.user = _USER;
}
// console.log(state)
// if (location.pathname === "/") sessionStorage.removeItem("VUEX");
// sessionStorage.setItem("VUEX", JSON.stringify(state))
// const vuexSSSS = JSON.parse(sessionStorage.getItem("VUEX"));
// if (vuexSSSS != null && typeof vuexSSSS === "object" && Object.keys(vuexSSSS).length) {
//   for (const key in state) {
//     if (typeof vuexSSSS[key] !== "undefined") {
//       state[key] = vuexSSSS[key];
//     }
//   }
// }

export default new Vuex.Store({
  state
});
