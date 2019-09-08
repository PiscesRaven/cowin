<template>
  <Shield :frameClass="'modal_frame'" :title="title" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
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
      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">產品名稱</p>
          <el-input v-model.trim="name"></el-input>
        </div>
      </div>
      <div class="modal_box">
        <p class="ttl">產品規格</p>
        <div class="specList_box">
          <div class="specList_item fx" v-for="(item,index) in specList">
            <span>
              <span>{{index+1}}.</span>
              {{item}}
            </span>
            <i class="el-icon-close delbtn" @click="sp_specList('del', index);"></i>
          </div>
        </div>
        <div class="specAdd_box">
          <span class="no">{{specList.length+1}}.&nbsp;</span>
          <el-input class="specAdd_item" v-model.trim="specVal" @keyup.native.enter.stop.prevent="sp_specList('add');"></el-input>
          <i class="el-icon-circle-plus specAdd_icon" :class="{active: !!this.specVal}" @click="sp_specList('add');"></i>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">詳細說明</p>
          <el-input type="textarea" v-model="description"></el-input>
        </div>
      </div>
      <div class="modal_item _300 order_gap">
        <p class="ttl">數量</p>
        <el-input-number v-model="number" :min="1"></el-input-number>
      </div>
    </template>
  </Shield>
</template>
<script>
import { mapState } from "vuex";
import { E2C, PRODUCT } from "@js/model";
import Shield from '@/slot/shield';
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isUdf, GO_inject, GO_fetch, GO_DClone } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { Shield },
  data() {
    return {
      title: "",
      name: "",
      description: "",
      number: 1,
      imageUrl: [],
      specList: [],
      specVal: ""
    }
  },
  computed: {
    ...mapState(["user"]),
    E2C() {
      return E2C;
    }
  },
  mounted() {
    const { cid } = this.$route.params;
    this.title = "新增特殊規格訂單";
  },
  methods: {
    submit() {
      ////驗證
      const params = {
        product: {
          name: this.name,
          description: this.description,
          imageUrl: this.imageUrl,
          specList: this.specList,
        },
        creator: {
          _id: this.user._id,
          email: this.user.email,
          name: this.user.name,
          role: this.user.role,
        },
        number: this.number,
        retailerId: this.user.retailerId
      }
      this.$api.getFranchiserService().createSpecialOrder(params).then(res => {
        this.GO.R_back();
        this.$root.m_scs("新增成功");
      }).catch(ex => { this.GO.catch(ex); });;
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
    },
    sp_specList(type, index) {
      if (type === 'add') {
        if (!this.specVal) return false;
        this.specList.push(this.specVal);
        this.specVal = "";
      }
      else if (type === 'del') {
        let warn = `確定要刪除 ${this.specList[index]} 嗎?`
        this.$confirm(warn, '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.specList.splice(index, 1);
        })
      }
    }
  }
}
</script>