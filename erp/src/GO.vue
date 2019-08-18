<template></template>
<script>
import { mapState } from "vuex";
//mixins
import VuexSSSS from "@mix/VuexSSSS.js";
import publicVue from "@mix/publicVue";
//GO_methods
import { GO_isSCS, GO_initSet, GO_clearSet } from "@js/GO_methods";
const refreshTime = 1000 * 60 * 30;
export default {
  mixins: [VuexSSSS, publicVue],
  computed: {
    ...mapState(["isLogin", "user"]),
  },
  created() {
    this.toPublic("GO");
  },
  methods: {
    // getNewToken() {
    //   if (new Date(GO_auth.expire()) - new Date() < refreshTime) {
    //     this.$api.getUserService().fetchToken().then(res => {
    //       console.log(res)
    //       if (GO_isSCS(res.status)) return false;
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
      GO_initSet();
      if (this.$route.name === "login") this.R_redirect();
    },
    clearSet() {
      this.initVuex();
      GO_clearSet();
      this.R_redirect();
    },
    catch(ex){
      console.log(ex); 
      if (ex.errorCode === "tokenNotFound") this.clearSet();
    },
    //R_router
    R_back() {//上一頁
      this.$router.go(-1);
    },
    R_backfrom(type) {
      if (type === "mode") {
        const { path, params } = this.$route;
        this.$router.replace({
          path: path.replace(new RegExp(`\/${params.mode}$`), '')
        });
      }
    },
    R_redirect() {
      let path = "";
      if (this.$store.state.isLogin) {//1st path
        path = this.$store.state.side_menu[0].path;
      }
      else path = "/login";
      this.$router.push({ path });
    },
    R_toMode(mode) {
      if (this.$route.params.mode) return false;
      this.$router.push(`${this.$route.path}/${mode}`);
    }
  }
}
</script>