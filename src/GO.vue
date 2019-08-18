<template></template>
<script>
//mixins
import VuexSSSS from "@mix/VuexSSSS.js";
import publicVue from "@mix/publicVue";
import { SIDE_MENU, R2R } from "@js/model";
//GO_methods
import { GO_isScs, GO_isUdf } from "@js/GO_methods";
export default {
  mixins: [publicVue, VuexSSSS],
  created() {
    this.toPublic("GO");
  },
  methods: {
    // getNewToken() {
    // const refreshTime = 1000 * 60 * 30;
    //   if (new Date(GO_auth.expire()) - new Date() < refreshTime) {
    //     this.$api.getUserService().fetchToken().then(res => {
    //       console.log(res)
    //       if (GO_isScs(res.status)) return false;
    //       GO_auth.set({
    //         expire: MMT().add(refreshTime, "s")._d
    //       });
    //     })
    //   }
    //   setTimeout(() => {
    //     this.getNewToken();
    //   }, 1000 * 60);
    // },
    initSet() {
      // this.getNewToken();
      const { role } = this.$store.state.user;
      this.$store.state.side_menu = new SIDE_MENU(role);
      this.$store.state.R2R = new R2R(role);
      if (this.$route.name === "login") this.R_redirect();
    },
    clearSet() {
      this.$store.state.init = true;
      window.sessionStorage.clear();
      window.localStorage.clear();
      let highestTimeoutId = setTimeout(";");
      for (let i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
      this.R_redirect();
    },
    catch(ex, msg) {
      console.log(ex);
      if (msg) this.$root.m_error(msg);
      if (ex.errorCode === "tokenNotFound") this.clearSet();
    },
    //R_router
    R_back() {//上一頁
      this.$router.go(-1);
    },
    R_backfrom(type) {
      if (GO_isUdf(type)) return false;
      const { path, params } = this.$route;
      this.$router.replace({
        path: path.replace(new RegExp(`\/${params[type]}$`), '')
      });
    },
    R_redirect() {
      let path = "";
      if (this.$store.state.isLogin) {//1st path or main
        path = this.$store.state.side_menu[0].path;
      }
      else path = "/login";
      this.$router.push({ path });
    },
    R_toMode(val) {
      const { mode, cmode, pmode } = this.$route.params;
      if ([mode, cmode, pmode].map(x => !GO_isUdf(x)).has(true)) return false;
      this.$router.push(`${this.$route.path}/${val}`);
    }
  }
}
</script>