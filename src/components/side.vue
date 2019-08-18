<template>
  <div class="side_ctn">
    <div class="side_box">
      <span class="user_img_box">
        <div class="user_img" :style="{backgroundImage: 'url(/img/user.jpg)'}"></div>
      </span>
      <span class="user_info">
        <p class="p1">{{E2C[user.role]}}</p>
        <p class="p2">{{user.name}}</p>
      </span>
    </div>
    <div class="side_item" v-for="item in side_menu" @click="linkTo(item.path)" :class="{active: currentPath(item.path)}">
      <i class="icon" :class="item.icon"></i>
      <span class="p1">{{item.label}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { E2C } from "@js/model";
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(["side_menu", "user"]),
    E2C() {
      return E2C;
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push({ path });
    },
    currentPath(val) {
      return new RegExp(`^${val}`).test(this.$route.path);
    }
  }
}
</script>
