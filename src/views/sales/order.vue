<template>
  <div class="order_ctn">
    <div class="tab_ctn clear">
      <el-radio-group v-model="sd_tab">
        <el-radio-button :label="`${index}`" v-for="(item,index) in tabList">{{item}}</el-radio-button>
      </el-radio-group>
      <div class="tab_search right">
        <el-input placeholder="請輸入關鍵字" prefix-icon="el-icon-search" v-model="filterStr" @blur="filterStr = filterStr.trim();"></el-input>
      </div>
    </div>
    <!-- <div class="query_ctn" v-show="sd_tab === '1'">
      <span>訂單狀態</span>
      <el-select v-model="sd_status">
        <el-option :key="-1" :label="E2C['all']" :value="'-1'"></el-option>
        <el-option v-for="(item,index) in statusList" :key="`${index}`" :label="E2C[item]" :value="item"></el-option>
      </el-select>
    </div>-->
    <div class="table_ctn">
      <el-table :data="[re_t0, re_t1][Number(sd_tab)]" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t0">
        <el-table-column label="#" width="50px;" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="商品">
          <template slot-scope="scope">{{(scope.row.product||{}).name}}</template>
        </el-table-column>
        <el-table-column property label="數量">
          <template slot-scope="scope">{{scope.row.number.toPrice()}}</template>
        </el-table-column>
        <el-table-column label="加盟店">
          <template slot-scope="scope">{{(scope.row.creator ||{} ).role === USER_ROLE.franchiser ? scope.row.creator.name:""}}</template>
        </el-table-column>
        <el-table-column property label="經銷商">
          <template slot-scope="scope">{{(scope.row.creator || {}).role === USER_ROLE.retailer ? scope.row.creator.name:""}}</template>
        </el-table-column>
        <el-table-column property label="負責採購員工">
          <template slot-scope="scope">{{(scope.row.updatingStaff||{}).email}}</template>
        </el-table-column>
        <el-table-column property label="狀態">
          <template slot-scope="scope">{{$t(`flow.${FLOW.label(user.role,scope.row.status)}`)}}</template>
        </el-table-column>
        <el-table-column property label="建立時間">
          <template slot-scope="scope">{{MMT(scope.row.created).format('YYYY/MM/DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column property label="更新時間">
          <template slot-scope="scope">{{MMT(scope.row.updated).format('YYYY/MM/DD HH:mm:ss')}}</template>
        </el-table-column>
      </el-table>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { E2C, USER_ROLE, FLOW } from "@js/model";
import optionItem from "@c/optionItem";
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isNum } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      filterStr: "",
      tabList: ["報價列表", "訂單紀錄"],
      sd_tab: "0",
      statusList: [],
      sd_status: "-1",
      tableList: [],
      sd_order: -1,
      supplierList: [],
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
    MMT() {
      return MMT
    },
    FLOW() {
      return FLOW;
    },
    re_t0() {
      let result = this.tableList.filter(x =>
        x.status === FLOW.all.salesBiding ||
        (x.source === USER_ROLE.retailer && x.status === FLOW.all.rejected)
      );
      return result;
    },
    re_t1() {
      let result = this.tableList;

      return result;
    }
  },
  mounted() {
    this.getData("supplier");
    this.getData("order");
  },
  methods: {
    getData(type) {
      if (type === "order") {
        this.$api.getSalesService().getOrderList().then(res => {
          if (res.length) {
            this.tableList = res.map((x, i) => { x.i = i; return x });
          };
        }).catch(ex => { this.GO.catch(ex); });
      }
      else if (type === "supplier") {
        this.$api.getAdminService().getUserList().then(res => {
          if (res.length) {
            this.supplierList = res.filter(x => x.role === USER_ROLE.supplier).map((a, i) => {
              const b = {};
              b.i = i;
              b._id = a._id;
              b.name = a.name;
              return b;
            });
          };
        }).catch(ex => { this.GO.catch(ex); });
      }
    },
    sp_order(type, index) {
      if (GO_isNum(index)) this.sd_order = index;
      if (type === "inquiry") this.$router.push({ path: `${this.$route.path}/${type}` })
    },
    sp_t0(row, column, event) {
      this.sp_order("inquiry", row.i);
    }
  }
}
</script>