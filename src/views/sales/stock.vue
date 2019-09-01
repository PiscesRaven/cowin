<template>
  <div class="user_frame">
    <!-- <div class="table_ctn">
      <el-table :data="re_userList" stripe style="width: 100%" max-height="650" highlight-current-row fit border>
        <el-table-column label="#" width="50px;" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="email" label="電子郵件"></el-table-column>
        <el-table-column property="phoneNumber" label="電話"></el-table-column>
        <el-table-column width="50px;">
          <template slot-scope="scope">
            <optionItem :edit="[sp_user,'edit',scope.row.i]" :del="[sp_user,'delete',scope.row.i]"></optionItem>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="sp_user('create')"></i>
    </div>-->
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { E2C, USER_ROLE } from "@js/model";
import optionItem from "@c/optionItem";
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isNum } from "@js/GO_methods";
export default {
  name: "user",
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      // sd_role: "",
      // sd_region: "-1",
      // sd_user: -1,
      // userList: [],
      // categoryList: []
    }
  },
  computed: {
    ...mapState(["user"]),
    E2C() {
      return E2C;
    },
    USER_ROLE() {
      return USER_ROLE;
    },
    hasRegion() {
      return [USER_ROLE.sales, USER_ROLE.retailer, USER_ROLE.franchiser, USER_ROLE.supplier].has(this.sd_role);
    },
    // re_userList() {
    //   let result = this.userList.filter(x => x.role === this.sd_role);
    //   if (this.hasRegion)
    //     result = result.filter(x => this.sd_region === "-1" || x.selectRegion === this.sd_region);

    //   return result;
    // }
  },
  created() {
    this.toPublic("sales_stock");
  },
  mounted() {
    this.getData("order");
  },
  methods: {
    getData(type) {
      if (type === "order") {
        this.$api.getSalesService().getOrderList().then(res => {
          ////test
          console.log(res)
        }).catch(ex => { this.GO.catch(ex); });
      }

    },
    // sp_user(mode, index) {
    //   if (GO_isNum(index)) this.sd_user = index;
    //   if (/^(create|edit)$/.test(mode)) this.GO.R_toMode(mode);
    //   else if (mode === "delete") {
    //     this.$api.getUserService().removeUser(this.userList[this.sd_user].email).then(res => {
    //       if (GO_isScs(res.status)) {
    //         this.getData();
    //         this.$root.m_scs("删除成功!");
    //       }
    //       else this.$root.m_error(res.message);
    //     }).catch(ex => { this.GO.catch(ex); });
    //   }
    // }
  }
}
</script>