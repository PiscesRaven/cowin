<template>
  <div class="lgi_frame">
    <img class="lgi_logo" src="@img/logo.png" />
    <div class="lgi_ctn">
      <div class="lgi_box bs">
        <div class="lgi_ttl lgi_item">COWIN銷售管理系統</div>
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
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState(['isLogin']),
  },
  mounted() {
    if (this.isLogin) {
      this.GO.initSet();
      return false;
    }
    //test
    setTimeout(() => {
      //admin
      // this.email = "test123@gmail.com";
      // this.password = "test123";
      //staff
      // this.email = "s1@g.com";
      this.email = "s2@gmail.com";
      //retailer
      // this.email = 'r1@gmail.com';
      this.password = '123456';
      this.userLogin();
    }, 1000)
  },
  methods: {
    userLogin() {
      this.$api.getUserService().login(this.email, this.password).then(res => {
        if (GO_isScs(res.status)) {
          this.$store.state.isLogin = true;
          this.$store.state.user = res.user;
          this.GO.initSet();
        }
        else this.$root.m_error(res.message);
      }).catch(ex => { this.GO.catch(ex, "登入失敗"); });
    }
  }
}
</script>
