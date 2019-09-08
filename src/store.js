import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { VUEX_STATE } from "@js/model";
import { GO_fetch } from "@js/GO_methods";
let state = new VUEX_STATE();
const vuexSSSS = JSON.parse(sessionStorage.getItem("VUEX"));
if (vuexSSSS != null && typeof vuexSSSS === "object" && Object.keys(vuexSSSS).length) {
  GO_fetch(state, vuexSSSS);
}
else {
  sessionStorage.removeItem("VUEX");
}

export default new Vuex.Store({
  state
});
