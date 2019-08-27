<template>
  <div v-if="$P">
    <!-- category -->
    <div class="category_ctn" v-show="$P.isCategory">
      <div class="category_list">
        <div class="list" v-for="(item, index) in $P.re_categoryList" :key="index">
          <div class="list_item">
            <div v-if="(item.product||item).imageUrl[0]" class="item_img" @click="$P.c_optionItem(item.i)" :style="{backgroundImage:'url('+(item.product||item).imageUrl[0]+')'}"></div>
            <div v-else class="item_img" @click="$P.c_optionItem(item.i)" :style="{ backgroundImage: 'url(' + require('@img/category/screw1.png') + ')' }"></div>
            <optionItem class="hambuger" v-if="$P.c_optionItem_show" :edit="$P.c_edit_show&&[$P.c_edit,item.i]" :del="$P.c_del_show&&[$P.c_del,item.i]" :delObj="(item.product||item).name"></optionItem>
            <div class="item_name">{{(item.product||item).name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box" v-if="$P.c_create_show">
      <i class="el-icon-circle-plus btn1" @click="$P.c_create"></i>
    </div>
    <!-- product -->
    <div class="category_ctn" v-show="$P.isProduct">
      <div class="category_list">
        <div class="list" v-for="(item, index) in $P.re_productList" :key="index">
          <div class="list_item">
            <div v-if="(item.product||item).imageUrl[0]" class="item_img" @click="$P.p_optionItem(item.i)" :style="{backgroundImage:'url('+(item.product||item).imageUrl[0]+')'}"></div>
            <div v-else class="item_img" @click="$P.p_optionItem(item.i)" :style="{ backgroundImage: 'url(' + require('@img/category/screw1.png') + ')' }"></div>
            <optionItem v-if="$P.p_optionItem_show" class="hambuger" :edit="$P.p_edit_show&&[$P.p_edit,item.i]" :del="$P.p_del_show&&[$P.p_del,item.i]" :delObj="(item.product||item).name"></optionItem>
            <div class="item_name">{{(item.product||item).name}}</div>
            <template v-if="[USER_ROLE.sales ,USER_ROLE.retailer, USER_ROLE.franchiser].has(user.role)">
              <div v-if="item.number" class="item_name stock">庫存：{{item.number}}</div>
              <div v-else class="item_name warning">缺貨</div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box" v-if="$P.p_create_show">
      <i class="el-icon-circle-plus btn1" @click="$P.p_create"></i>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { USER_ROLE } from "@js/model";
import optionItem from "@c/optionItem";
import publicVue from "@mix/publicVue"
export default {
  components: { optionItem },
  mixins: [publicVue],
  computed: {
    ...mapState(["user"]),
    USER_ROLE() {
      return USER_ROLE;
    },
    $P() {
      let result = undefined;
      const currentParent = this.getVue("category");
      if (Object.keys(currentParent).length) result = currentParent;
      return result;
    }
  },
}
</script>
<style lang="less" scoped>
.tab_search.right {
  float: right;
}
</style>