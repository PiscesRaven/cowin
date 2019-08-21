<template>
  <div class="category_frame">
    <div class="tab_ctn clear">
      <div class="tab_title">{{pageTitle}}</div>
      <div class="tab_search right">
        <el-input placeholder="輸入關鍵字" v-model="filterStr" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <!-- category -->
    <div class="category_ctn" v-show="isCategory">
      <div class="category_list">
        <div class="list" v-for="(item, index) in re_categoryList" :key="index">
          <div class="list_item">
            <div v-if="item.imageUrl[0]" class="item_img" @click="c_optionItem(item.i)" :style="{backgroundImage:'url('+item.imageUrl+')'}"></div>
            <div v-else class="item_img" @click="c_optionItem(item.i)" :style="{ backgroundImage: 'url(' + require('@img/category/screw1.png') + ')' }"></div>
            <template v-if="c_optionItem_show">
              <optionItem class="hambuger" :edit="c_edit_show&&[c_edit,item.i]" :del="c_del_show&&[c_del,item.i]"></optionItem>
            </template>
            <div class="item_name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box" v-if="c_create_show">
      <i class="el-icon-circle-plus btn1" @click="c_create"></i>
    </div>
    <!-- product -->
    <div class="category_ctn" v-show="isProduct">
      <div class="category_list">
        <div class="list" v-for="(item, index) in re_productList" :key="index">
          <div class="list_item">
            <div v-if="item.imageUrl[0]" class="item_img" @click="p_optionItem(item.i)" :style="{backgroundImage:'url('+item.imageUrl+')'}"></div>
            <div v-else class="item_img" @click="p_optionItem(item.i)" :style="{ backgroundImage: 'url(' + require('@img/category/screw1.png') + ')' }"></div>
            <template v-if="p_optionItem_show">
              <optionItem class="hambuger" :edit="p_edit_show&&[p_edit,item.i]" :del="p_del_show&&[p_del,item.i]"></optionItem>
            </template>
            <div class="item_name">{{item.name}}</div>
            <!-- <div class="item_name warning">缺貨</div> -->
            <!-- <div class="item_name stock">庫存</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="add_box" v-if="p_create_show">
      <i class="el-icon-circle-plus btn1" @click="p_create"></i>
    </div>
    <router-view />
  </div>
</template>
<script>
import { USER_ROLE } from "@js/model";
import store from "@/store";
const UROLE = store.state.user.role;
const mixins = [];
mixins.push(require("@v/category/mixins/indexDefault").default);
if (UROLE.has([USER_ROLE.retailer, USER_ROLE.franchiser])) {
  mixins.push(require("@v/category/mixins/order").default);
}
else if (UROLE.has([USER_ROLE.staff])) {
  mixins.push(require("@v/category/mixins/category").default);
}
export default {
  mixins
}
</script>
<style lang="less" scoped>
.tab_search.right {
  float: right;
}
</style>