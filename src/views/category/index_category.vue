<template>
  <div class="category_frame">
    <div class="tab_ctn clear">
      <div class="tab_title">{{pageTitle}}</div>
      <div class="tab_search right">
        <el-input placeholder="輸入關鍵字" v-model="filterStr" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <IndexTemplate />
    <router-view />
  </div>
</template>
<script>
import IndexTemplate from "./index_template";
export default {
  components: { IndexTemplate },
  mixins: [
    require("@v/category/mixins/indexDefault").default,
    require("@v/category/mixins/category").default
  ]
}
</script>
<style lang="less" scoped>
.tab_search.right {
  float: right;
}
</style>