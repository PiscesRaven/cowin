<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">{{title}}</div>
      <div class="modal_box">
        <div class="modal_item _200">
          <p class="ttl">商品名稱</p>
          <el-input v-model.trim="name"></el-input>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">詳細說明</p>
          <el-input type="textarea" v-model="description"></el-input>
        </div>
      </div>
      <div class="modal_box">
        <categoryImg />
      </div>
      <!-- <div class="modal_box">
        <div class="modal_item _600">
          <el-tag :key="tag" v-for="tag in elTags" closable :disable-transitions="false" type="info" @close="delTag(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-if="elShowInput" v-model="elTagVal" ref="saveTagInput" size="small" @keyup.enter.native="inputConfirm" @blur="inputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">輸入規格名稱</el-button>
        </div>
      </div>-->
    </template>
  </Shield>
</template>
<script>
import { E2C, PRODUCT } from "@js/model";
import Shield from '@/slot/shield';
import categoryImg from '@c/category_img';
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isUdf, GO_inject, GO_fetch } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { Shield, categoryImg },
  data() {
    return {
      title: "",
      name: "",
      description: "",
      imageUrl: "",
      size: "",
      color: ""
    }
  },
  computed: {
    isCreateMode() {
      return this.$route.params.pmode === "create";
    },
    isEditMode() {
      return this.$route.params.pmode === "edit";
    },
    E2C() {
      return E2C;
    },
  },
  mounted() {
    const { pmode } = this.$route.params;
    const { sd_product, productList } = this.getVue("category");
    if (this.isEditMode && GO_isUdf(productList[sd_product])) this.GO.R_backfrom("pmode");
    this.title = E2C[pmode] + "商品";
    if (this.isEditMode) {
      GO_inject(productList[sd_product], this);
    }
  },
  methods: {
    submit() {
      const { cid } = this.$route.params;
      const params = new PRODUCT();
      GO_fetch(params, this);
      if (this.isCreateMode) {
        params.categoryId = cid;
        this.$api.getStaffService().createProduct(params).then(res => {
          this.getVue("category").getData("product");
          this.GO.R_back();
          this.$root.m_scs("新增成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
      else if (this.isEditMode) {
        const { sd_product, productList } = this.getVue("product");
        this.$api.getStaffService().updateProduct(productList[sd_product]._id, params).then(res => {
          this.getVue("category").getData("product");
          this.GO.R_back();
          this.$root.m_scs("更新成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
    },
  }
}
</script>