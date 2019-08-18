import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      role: "",
      name: ""
    },
    side_menu: [],
    R2R: [] //role to role
  },
  mutations: {},
  actions: {}
});
