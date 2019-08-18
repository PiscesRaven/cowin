<template>
  <div class="category_frame">
    <div class="tab_ctn">
      <div class="tab_title">商品類別</div>
      <div class="tab_search">
        <el-input placeholder="輸入關鍵字" v-model="input" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <!-- category -->
    <div class="category_ctn" v-show="isCategory">
      <div class="category_list">
        <div class="list" v-for="(item, index) in categoryList" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png" @click="linkTo('product', item._id)" />
            <template v-if="c_optionItem_show">
              <optionItem :edit="[sp_category,'edit',item.i]" :del="[sp_category,'delete',item.i]"></optionItem>
            </template>
            <div class="catalogue_name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="sp_category('create')"></i>
    </div>
    <!-- product -->
    <div class="category_ctn" v-show="isProduct">
      <div class="category_list">
        <div class="list" v-for="(item, index) in productList" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png" />
            <template v-if="p_optionItem_show">
              <optionItem :edit="[sp_product,'edit',item.i]" :del="[sp_product,'delete',item.i]"></optionItem>
            </template>
            <div class="catalogue_name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="sp_category('create')"></i>
    </div>
    <router-view />
  </div>
</template>
<script>
import { USER_ROLE } from "@js/model";
const mixins = [];
const pathname = location.pathname;
if (pathname.has([USER_ROLE.retailer, USER_ROLE.franchiser])) {
  mixins.push(require("@v/category/mixins/order").default);
}
else if (pathname.has([USER_ROLE.staff])) {
  mixins.push(require("@v/category/mixins/category").default);
}
export default {
  mixins,
  data() {
    return {
      input: ''
    }
  },
  created() {
    this.toPublic("category");
    const { role } = this.$route.params;
    if (!role) this.$router.replace({ path: `${this.$route.path}/${this.user.role}` });
    else if (role !== this.user.role) this.$router.replace({ path: `${this.$route.parentPath}/${this.user.role}` });
  }
}
</script>