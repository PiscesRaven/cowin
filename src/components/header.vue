<template>
  <div class="header">
    <div class="header_ctn ctn1 clear">
      <img class="logo" src="@img/logo.png" />
      <div class="nav_box clear">
        <div class="nav_item">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-bell icon_50"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>通知1</el-dropdown-item>
              <el-dropdown-item>通知2</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="nav_item">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <div class="user_box">{{re_name}}</div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div @click="userLogout">
                <el-dropdown-item>登出</el-dropdown-item>
              </div>
              <!-- <el-dropdown-item>版本</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
//mixins
import publicVue from "@mix/publicVue";
//GO_methods
import { GO_isScs } from "@js/GO_methods";
export default {
  mixins: [publicVue],
  computed: {
    ...mapState(["user"]),
    re_name() {
      return this.user.name && this.user.name.toString().substr(0, 2) || "";
    }
  },
  methods: {
    userLogout() {
      this.$api.getUserService().logout().then(res => {
        this.$store.state.isLogin = false;
        this.getVue("GO").clearSet();
      }).catch(ex => { this.getVue("GO").catch(ex); });
    }
  }
}
</script>
<style lang="less">
  .el-icon-bell.icon_50{
    transform: scale(0.7);
  }
</style>