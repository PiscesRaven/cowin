<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">{{title}}</div>
      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">商品類別</p>
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
    </template>
  </Shield>
</template>
<script>
import { E2C, CATEGORY } from "@js/model";
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
      imageUrl: ""
    }
  },
  computed: {
    isCreateMode() {
      return this.$route.params.cmode === "create";
    },
    isEditMode() {
      return this.$route.params.cmode === "edit";
    },
    E2C() {
      return E2C;
    },
  },
  mounted() {
    const { cmode } = this.$route.params;
    const { sd_category, categoryList } = this.getVue("category");
    if (this.isEditMode && GO_isUdf(categoryList[sd_category])) this.GO.R_backfrom("cmode");
    this.title = E2C[cmode] + "商品類別";
    if (this.isEditMode) {
      GO_inject(categoryList[sd_category], this);
    }
  },
  methods: {
    submit() {
      const { mode } = this.$route.params;
      const params = new CATEGORY();
      GO_fetch(params, this);
      if (this.isCreateMode) {
        this.$api.getStaffService().createCategory(params).then(res => {
          this.getVue("category").getData("category");
          this.GO.R_back();
          this.$root.m_scs("新增成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
      else if (this.isEditMode) {
        const { sd_category, categoryList } = this.getVue("category");
        this.$api.getStaffService().updateCategory(categoryList[sd_category]._id, params).then(res => {
          this.getVue("category").getData("category");
          this.GO.R_back();
          this.$root.m_scs("更新成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
    },
  }
}
</script>
