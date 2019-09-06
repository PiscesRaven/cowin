import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { VUEX_STATE } from "@js/model";
let state = {};
const vuexSSSS = JSON.parse(sessionStorage.getItem("VUEX"));
if (vuexSSSS != null && typeof vuexSSSS === "object" && Object.keys(vuexSSSS).length) {
  state = vuexSSSS;
} else {
  state = new VUEX_STATE();
}

export default new Vuex.Store({
  state
});
