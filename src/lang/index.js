import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const messages = {};
const requireLang = require.context("@/lang", true, /.*(?<!\.\/)index\.js/);
requireLang.keys().forEach(el => {
  messages[el.replace(/\.\/|\/index\.js/g, "")] = requireLang(el).default;
});

const i18n = new VueI18n({
  locale: "tw",
  messages
});

export default i18n;
