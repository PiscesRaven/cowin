<template>
  <div class="category_frame">
    <div class="tab_ctn">
      <div class="tab_title">{{tabTitle}}</div>
      <div class="tab_search">
        <el-input placeholder="輸入關鍵字" v-model="input" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <!-- category -->
    <div class="category_ctn" v-show="isCategory">
      <div class="category_list">
        <div class="list" v-for="(item, index) in categoryList" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png" @click="c_item(item.i)" />
            <template v-if="c_optionItem_show">
              <optionItem class="hambuger" :edit="[c_edit,item.i]" :del="[c_del,item.i]"></optionItem>
            </template>
            <div class="catalogue_name">{{item.name}}</div>
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
        <div class="list" v-for="(item, index) in productList" :key="index">
          <div class="catalogue_img">
            <img src="@img/category/screw1.png" @click="p_item(item.i)" />
            <template v-if="p_optionItem_show">
              <optionItem class="hambuger" :edit="[p_edit,item.i]" :del="[p_del,item.i]"></optionItem>
            </template>
            <div class="catalogue_name">{{item.name}}</div>
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
const mixins = [];
const pathname = location.pathname;
if (pathname.has([USER_ROLE.retailer, USER_ROLE.franchiser])) {
  mixins.push(require("@v/category/mixins/order").default);
  mixins.push(require("@v/category/mixins/category").default);
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
  computed: {
    tabTitle() {
      if (this.isCategory) {
        return '商品類別'
      } else {
        return '商品管理'
      }
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