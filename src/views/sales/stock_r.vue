<template>
  <Shield :frameClass="'modal_frame'" :title="title" :ctnClass="'modal_ctn'">
    <template slot="body">
      <div class="category_frame book" style="padding: 0;">
        <div class="tab_ctn clear">
          <div class="tab_title">{{pageTitle}}</div>
          <div class="tab_search right">
            <el-input placeholder="輸入關鍵字" v-model="filterStr" prefix-icon="el-icon-search"></el-input>
          </div>
        </div>
        <IndexTemplate />
      </div>
    </template>
  </Shield>
</template>
<script>
import Shield from '@/slot/shield';
import IndexTemplate from "@v/category/index_template";
export default {
  components: { Shield, IndexTemplate },
  mixins: [
    require("@v/category/mixins/indexDefault").default,
    require("@v/category/mixins/sales").default
  ],
  data() {
    return {
      title: ""
    }
  },
}
</script>