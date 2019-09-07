<template>
  <div ref="frame" class="lgi_frame" @keyup.enter="userLogin" tabindex="-1">
    <div class="lgi_ctn">
      <div class="flag_ctn left">
        <div class="flag_box">
          <div class="flag us"></div>
          <p>美國</p>
        </div>
        <div class="flag_box">
          <div class="flag ca"></div>
          <p>加拿大</p>
        </div>
        <div class="flag_box">
          <div class="flag tw"></div>
          <p>台灣</p>
        </div>
      </div>
      <div class="lgi_box bs">
        <img class="lgi_logo" src="@img/logo.png" />
        <div class="lgi_ttl lgi_item">COWIN 螺絲銷售</div>
        <div class="lgi_item">
          <p>電子信箱</p>
          <el-input v-model="email"></el-input>
        </div>
        <div class="lgi_item">
          <p>密碼</p>
          <el-input v-model="password" show-password></el-input>
        </div>
        <div class="lgi_item last">
          <el-button @click.native="userLogin" type="primary" style="width: 100%;">登&nbsp;&nbsp;入</el-button>
        </div>
      </div>
      <div class="flag_ctn right">
        <div class="flag_box">
          <div class="flag kh"></div>
          <p>柬埔寨</p>
        </div>
        <div class="flag_box">
          <div class="flag cn"></div>
          <p>中國</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs } from "@js/GO_methods";
export default {
  mixins: [GO],
  data() {
    return {
      email: "",
      password: "",
    }
  },
  mounted() {
    if (this.isLogin) {
      this.R_redirect();
      return false;
    }
    this.$refs.frame.focus();
    ////test
    setTimeout(() => {
      //admin
      //this.email = "dev.tengi@gmail.com";
      //staff
      // this.email = "winnt.chen@gmail.com";
      //sales
      // this.email = "hakka1.huang@gmail.com";
      //supplier
      this.email = "tengi.huang@gmail.com";
      //retailer
      // this.email = "mkid2727@gmail.com";
      //franchiser
      // this.email = "tengjie.huang@airabbi.com";
      this.password = "test123";
      this.userLogin();
    }, 500)
  },
  methods: {
    userLogin() {
      this.$api.getUserService().login(this.email, this.password).then(res => {
        if (GO_isScs(res.status)) {
          this.$store.state.user = res.user;
          this.$store.state.isLogin = true;
          this.$router.push({ path: "/index" });
        }
        else this.$root.m_error(res.message);
      }).catch(ex => { this.GO.catch(ex, "登入失敗"); });
    }
  }
}
</script>
