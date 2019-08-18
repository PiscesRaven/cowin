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
      <div class="modal_box" v-show="[USER_ROLE.staff,USER_ROLE.sales,USER_ROLE.supplier,USER_ROLE.franchiser].has(role)">
        <div class="modal_item _800">
          <p class="ttl">地址</p>
          <el-input v-model="address" class="input-with-select">
            <el-select v-model="selectRegion" slot="prepend" placeholder="請選擇">
              <el-option v-for="(item,index) in areaList" :key="index" :label="item.value" :value="item.value"></el-option>
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
        <div class="modal_box">
          <p class="ttl">授權商品</p>
          <el-select v-model="authorizedCategoryIds" multiple filterable allow-create default-first-option placeholder="授權商品" width="100%;">
            <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </div>
      </template>
    </template>
  </Shield>
</template>
<script>
import { mapState } from "vuex";
import { E2C, USER, USER_ROLE } from "@js/model";
import Shield from '@/slot/shield';
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isUdf, GO_inject, GO_fetch } from "@js/GO_methods";
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
      authorizedCategoryIds: []//ex: {'test123': true}
    }
  },
  computed: {
    ...mapState(["areaList", "R2R", "user"]),
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
      GO_inject(userList[sd_user], this);
      this.password = this.password2 = "";
    }
  },
  methods: {
    submit() {
      if (!this.email) return this.$root.m_error("請輸入信箱");
      if (this.password !== this.password2) return this.$root.m_error('密碼不一致');

      const params = new USER();
      GO_fetch(params, this);
      params.authorizedCategoryIds = {};
      if ([USER_ROLE.retailer].has(params.role)) {
        this.authorizedCategoryIds.forEach(el => {
          params.authorizedCategoryIds[el] = true;
        })
      }
      if (this.isCreateMode) {
        if (this.user.role === USER_ROLE.retailer && params.role === USER_ROLE.franchiser)
          params.retailerId = this.user._id;
        this.$api.getUserService().createUser(params).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("新增成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
      else if (this.isEditMode) {
        if (params.password === "") delete params.password;
        this.$api.getUserService().updateUser(params.email, params).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("更新成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
    }
  }
}
</script>
<style lang="less">
.el-select {
  display: block;
}
.el-select .el-input {
  width: 100%;
}
</style>