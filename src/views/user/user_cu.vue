<template>
  <Shield :frameClass="'modal_frame'" :ctnClass="'modal_ctn'" :submit="submit">
    <template slot="body">
      <div class="modal_ttl">{{title}}</div>
      <div class="modal_box" v-if="isCreateMode">
        <div class="modal_item">
          <p class="ttl">角色</p>
          <el-radio-group v-model="role">
            <el-radio-button :label="item" :key="item" v-for="item in R2R">{{E2C[item]}}</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _600">
          <p class="ttl">Email(登入用)</p>
          <el-input v-model.trim="email"></el-input>
        </div>
        <div class="modal_item _200" v-show="[USER_ROLE.staff].has(role)">
          <p class="ttl">員工編號</p>
          <el-input></el-input>
        </div>
      </div>
      <div class="modal_box">
        <div class="modal_item _200">
          <p class="ttl">密碼</p>
          <el-input type="password" v-model.trim="password"></el-input>
        </div>
        <div class="modal_item _200">
          <p class="ttl">確認密碼</p>
          <el-input type="password" v-model.trim="password2"></el-input>
        </div>
        <div class="modal_item _200">
          <p class="ttl">姓名</p>
          <el-input v-model="name"></el-input>
        </div>
        <div class="modal_item _200">
          <p class="ttl">電話</p>
          <el-input v-model.trim="phoneNumber"></el-input>
        </div>
      </div>
      <div class="modal_box" v-show="[USER_ROLE.sales,USER_ROLE.supplier,USER_ROLE.retailer,USER_ROLE.franchiser].has(role)">
        <div class="modal_item _800">
          <p class="ttl">地址</p>
          <el-input v-model="address" class="input-with-select">
            <el-select v-model="selectRegion" slot="prepend" placeholder="請選擇">
              <el-option v-for="(item,index) in REGION" :key="index" :label="E2C[item]" :value="item"></el-option>
            </el-select>
          </el-input>
        </div>
      </div>
      <div class="modal_box" v-show="[USER_ROLE.franchiser].has(role)">
        <div class="modal_item _200">
          <p class="ttl">統一編號</p>
          <el-input v-model="GuiNumber"></el-input>
        </div>
        <div class="modal_item _200">
          <p class="ttl">微信帳號</p>
          <el-input v-model="WeChat"></el-input>
        </div>
        <div class="modal_item _200">
          <p class="ttl">贈送金額</p>
          <el-input v-model="bonus"></el-input>
        </div>
      </div>
      <template v-if="[USER_ROLE.retailer].has(role)">
        <div class="modal_box category">
          <p class="ttl">授權商品類別</p>
          <el-select v-model="sd_category" multiple filterable allow-create default-first-option placeholder="授權商品" width="100%;" class="el_select">
            <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </div>
      </template>
    </template>
  </Shield>
</template>
<script>
import { mapState } from "vuex";
import { E2C, USER, USER_ROLE, REGION } from "@js/model";
import Shield from '@/slot/shield';
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isUdf, GO_inject, GO_fetch, GO_DClone } from "@js/GO_methods";
import { constants } from 'crypto';
export default {
  mixins: [GO],
  components: { Shield },
  data() {
    return {
      title: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      name: "",
      phoneNumber: "",
      address: "",
      bonus: 0,
      GuiNumber: "",//統一編號
      WeChat: "",
      selectRegion: "",
      retailerId: "",//只有在經銷商建立加盟店時會有的值
      sd_category: [],//ex: {'test123': true}
    }
  },
  computed: {
    ...mapState(["R2R", "user"]),
    isCreateMode() {
      return this.$route.params.mode === "create";
    },
    isEditMode() {
      return this.$route.params.mode === "edit";
    },
    E2C() {
      return E2C;
    },
    USER_ROLE() {
      return USER_ROLE;
    },
    REGION() {
      return REGION;
    },
    categoryList() {
      return this.getVue("user").categoryList;
    }
  },
  mounted() {
    const { role, mode } = this.$route.params;
    const { sd_user, userList } = this.getVue("user");
    if (this.isEditMode && GO_isUdf(userList[sd_user])) this.GO.R_backfrom("mode");
    this.title = E2C[mode] + "使用者";
    if (this.isCreateMode) {
      this.role = role;
    }
    else if (this.isEditMode) {
      const sd_row = GO_DClone(userList[sd_user]);
      sd_row.sd_category = Object.keys(sd_row.authorizedCategoryIds || {});
      sd_row.password = sd_row.password2 = "";
      GO_inject(sd_row, this);
    }
    //against autocomplete
    setTimeout(() => {
      if (this.isCreateMode) this.mail = "";
      this.password = this.password2 = "";
    }, 300)
  },
  methods: {
    submit() {
      if (!this.email) return this.$root.m_error("請輸入信箱");
      if (!this.reg_mail(this.email)) return this.$root.m_error('請確認信箱格式');
      if (this.password !== this.password2) return this.$root.m_error('密碼不一致');
      if (this.isCreateMode || (this.isEditMode && this.password !== "")) {
        if (!this.reg_password(this.password)) return this.$root.m_error('密碼須含大小寫字母、數字，且長度為 6~10 位')
      }
      if (!this.reg_phone(this.phoneNumber)) return this.$root.m_error('請正確的電話號碼');
      let params = new USER();
      GO_fetch(params, this);
      if ([USER_ROLE.retailer].has(params.role)) {
        this.sd_category.forEach(el => {
          params.authorizedCategoryIds[el] = true;
        })
      }
      if (this.isCreateMode) {
        if (this.user.role === USER_ROLE.retailer && params.role === USER_ROLE.franchiser)
          params.retailerId = this.user._id;
        this.$api.getUserService().createUser(params, this.sd_category).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("新增成功");
        }).catch(ex => { this.GO.catch(ex, "新增失敗"); });;
      }
      else if (this.isEditMode) {
        if (params.password === "") delete params.password;
        this.$api.getUserService().updateUser(params.email, params, this.sd_category).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("更新成功");
        }).catch(ex => { this.GO.catch(ex, "編輯失敗"); });;
      }
    },
    reg_mail(txt) {
      let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(txt);
    },
    reg_phone(txt) {
      let regex = /[0-9]$/;
      return regex.test(txt);
    },
    reg_password(txt) {
      // let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
      let regex = /.{6,10}/;
      return regex.test(txt);
    },
  }
}
</script>
<style lang="less">
.modal_box.category {
  .el-select {
    display: block;
  }
  .el-select .el-input {
    width: 100%;
  }
}
</style>