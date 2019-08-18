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
            <el-select v-model="area" slot="prepend" placeholder="請選擇">
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
import { GO_inject, GO_fetch } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { Shield },
  data() {
    return {
      title: "",
      role: "",
      bonus: 0,// 贈送金額
      email: "",// Email(登入用)
      name: "",// 姓名
      GuiNumber: "",// 統一編號
      WeChat: "",// 微信
      phoneNumber: "",// 手機號碼
      password: "", // 密碼
      password2: "",// 密碼驗證
      address: "", // 地址
      area: "", //選擇地區
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
    }
  },
  mounted() {
    const { mode } = this.$route.params;
    const { sd_user, userList } = this.getVue("user");
    if (this.isEditMode && typeof userList[sd_user] === "undefined") this.GO.R_backfrom("mode");
    this.title = E2C[mode] + "使用者";
    if (this.isCreateMode) {
      this.role = this.R2R[0];
    }
    else if (this.isEditMode) {
      GO_inject(userList[sd_user], this);
      this.password2 = this.password;
    }
  },
  methods: {
    submit() {
      if (!this.email) return this.$root.m_error("請輸入信箱");
      if (this.password !== this.password2) return this.$root.m_error('密碼不一致');
      const { mode } = this.$route.params;
      const params = new USER();
      GO_fetch(params, this);
      if (this.user.role === USER_ROLE.retailer && params.role === USER_ROLE.franchiser)
        params.retailerId = this.user._id;
      if (mode === "create") {
        this.$api.getUserService().createUser(params).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("新增成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
      else if (mode === "edit") {
        const { sd_user, userList } = this.getVue("user");
        this.$api.getUserService().updateUser(userList[sd_user].email, params).then(res => {
          this.getVue("user").getData();
          this.GO.R_back();
          this.$root.m_scs("更新成功");
        }).catch(ex => { this.GO.catch(ex); });;
      }
    },
  }
}
</script>
