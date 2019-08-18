<template>
  <div class="user_frame">
    <div class="tab_ctn">
      <el-tabs v-model="sd_role" @tab-click="handleRole">
        <el-tab-pane :label="E2C[item]" :name="item" :key="item" v-for="item in R2R"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="query_ctn">
      <span>地區</span>
      <el-select v-model="sd_area">
        <el-option v-for="item in areaList" :key="item.no" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>-->
    <div class="table_ctn">
      <el-table :data="re_userList" stripe style="width: 100%" max-height="650" highlight-current-row fit border>
        <el-table-column label="#" width="50px;" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="email" label="電子郵件"></el-table-column>
        <el-table-column property="address" label="電話"></el-table-column>
        <el-table-column width="50px;">
          <template slot-scope="scope">
            <optionItem :edit="[sp_user,'edit',scope.row.i]" :del="[sp_user,'delete',scope.row.i]"></optionItem>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="add_box">
      <i class="el-icon-circle-plus btn1" @click="sp_user('create')"></i>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { E2C } from "@js/model";
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
      sd_role: "",
      sd_area: "all",
      sd_user: -1,
      userList: [],
    }
  },
  computed: {
    ...mapState(["areaList", "R2R"]),
    E2C() {
      return E2C;
    },
    re_userList() {
      return this.userList.filter(x => x.role === this.sd_role);
    }
  },
  created() {
    this.toPublic("user");
    this.init();
  },
  mounted() {
    this.getData();
  },
  methods: {
    init() {
      const { role } = this.$route.params;
      if (!role) this.$router.replace({ path: `${this.$route.path}/${this.R2R[0]}` });
      else this.sd_role = role;
    },
    getData() {
      this.$api.getAdminService().getUserList().then(res => {
        if (res.length) {
          res.forEach((el, i) => {
            el.i = i;
          });
          this.userList = res;
        };
      }).catch(ex => { this.GO.catch(ex); });
    },
    handleRole() {
      if (this.sd_role === this.$route.params.role) return false;
      this.$router.push({ path: `${this.$route.meta.parentPath}/${this.sd_role}` });
    },
    sp_user(mode, index) {
      if (GO_isNum(index)) this.sd_user = index;
      if (/^(create|edit)$/.test(mode)) this.GO.R_toMode(mode);
      else if (mode === "delete") {
        this.$api.getUserService().removeUser(this.userList[this.sd_user].email).then(res => {
          if (GO_isScs(res.status)) {
            this.getData();
            this.$root.m_scs("删除成功!");
          }
          else this.$root.m_error(res.message);
        }).catch(ex => { this.GO.catch(ex); });
      }
    }
  },
  watch: {
    "$route": {
      handler() {
        this.init();
      }
    }
  }
}
</script>
