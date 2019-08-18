import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {
      role: "",
      name: ""
    },
    side_menu: [],
    R2R: [],//role to role
    areaList: [
      { value: "all", label: "全部" },
      { value: "加拿大", label: "加拿大" },
      { value: "越南", label: "越南" }
    ]
  },
  mutations: {},
  actions: {}
})
