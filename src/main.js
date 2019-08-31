import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;
import base from "@js/base";
//Element
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-TW";
Vue.use(Element, { locale });
//screwSaleApiS
import { screwSaleApi } from "screwsale-api";
screwSaleApi.init("DEV");
Vue.prototype.$api = screwSaleApi;
//mixins main
import alert from "@mix/alert";
//perfect-scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
//VueDragscroll
import VueDragscroll from "vue-dragscroll";
Vue.use(VueDragscroll);
//i18n
import i18n from "@/lang";
Vue.prototype.$ts = function(array) {
  return array.map(x => this.$t(x)).toString();
};
new Vue({
  mixins: [alert],
  data: {
    publicList: []
  },
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
