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
      <div class="modal_box uploadImage">
        <div style="height: 0; overflow: hidden;">
          <input ref="fileUploadBtn" @change="addImage($event)" type="file" id="profilePic" />
        </div>
        <div class="uploadImage_btn_ctn">
          <div class="uploadImage_btn_box">
            <el-button type="primary">上傳圖片</el-button>
            <label class="uploadImage_label" for="profilePic"></label>
          </div>
        </div>
        <div class="uploadImage_ctn" :class="{active: imageUrl.length>0}" v-dragscroll.x="true">
          <div class="uploadImage_box" v-for="(item,index) in imageUrl">
            <div class="uploadImage_x" @click="delImage(index)">X</div>
            <el-avatar shape="square" :src="item" :size="180"></el-avatar>
          </div>
        </div>
      </div>
    </template>
  </Shield>
</template>
<script>
import { E2C, CATEGORY } from "@js/model";
import Shield from '@/slot/shield';
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isUdf, GO_inject, GO_fetch } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { Shield },
  data() {
    return {
      title: "",
      name: "",
      description: "",
      imageUrl: []
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
      if (!Array.isArray(this.imageUrl)) this.imageUrl = [];
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
    addImage(event) {//修改照片
      if (event.target.files.length === 0) return false;
      let formData = new FormData()
      formData.append('file', event.target.files[0]);
      event.target.value = "";
      this.$api.getCommonService().uploadImage(formData).then(res => {
        if (GO_isScs(res.status)) {
          this.imageUrl.push(res.imageUrl);
        }
        else this.$root.m_error("上傳失敗");
      }).catch(ex => { this.GO.catch(ex, "上傳失敗"); });
    },
    delImage(index) {
      this.$confirm('確定要刪除嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imageUrl.splice(index, 1);
      })
    }
  }
}
</script>
