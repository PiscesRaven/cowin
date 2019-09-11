<template></template>
<script>
import { mapState } from "vuex";
//mixins
import VuexSSSS from "@mix/VuexSSSS.js";
import publicVue from "@mix/publicVue";
import { SIDE_MENU, R2R } from "@js/model";
//GO_methods
import { GO_isScs, GO_isUdf } from "@js/GO_methods";
import { setTimeout } from 'timers';
export default {
  mixins: [publicVue, VuexSSSS],
  computed: {
    ...mapState(["isLogin", "side_menu", "user"])
  },
  created() {
    this.toPublic("GO");
  },
  mounted() {
    this.$store.state.isFirst = false;
    if (this.isLogin) this.initSet();
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
      const { role } = this.user;
      this.$store.state.side_menu = new SIDE_MENU(role);
      this.$store.state.R2R = new R2R(role);
      // this.getNewToken();
    },
    clearSet() {
      this.R_redirect();
      this.initVuex();
      setTimeout(() => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        let highestTimeoutId = setTimeout(";");
        for (let i = 0; i < highestTimeoutId; i++) {
          clearTimeout(i);
        }
      }, 0)
    },
    catch(ex, msg) {
      console.log(ex);
      if (msg) this.$root.m_error(msg);
      if (ex.errorCode === "tokenNotFound") {
        this.$root.m_error("使用者身分驗證失效, 請重新登入");
        this.$store.state.isLogin = false;
      }
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
      if (!this.isLogin) this.$router.push({ path: "/login" });
    },
    R_toMode(val) {
      const { mode, cmode, pmode } = this.$route.params;
      if ([mode, cmode, pmode].map(x => !GO_isUdf(x)).has(true)) return false;
      this.$router.push(`${this.$route.path}/${val}`);
    }
  },
  watch: {
    isLogin: {
      handler(val) {
        if (val) this.initSet();
        else this.clearSet();
      }
    }
  }
}
</script>