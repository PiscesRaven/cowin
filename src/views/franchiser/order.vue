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
    <div class="table_ctn">
      <el-table :data="[re_t0,re_t1][sd_tab]" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t">
        <el-table-column label="#" width="50px;" align="center">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="商品">
          <template slot-scope="scope">{{(scope.row.product||{}).name}}</template>
        </el-table-column>
        <el-table-column property label="數量">
          <template slot-scope="scope">{{scope.row.number.toPrice()}}</template>
        </el-table-column>
        <el-table-column label="價格">
          <template slot-scope="scope">{{(scope.row.franchiser||{}).price}}</template>
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
      tabList: ["等待報價確認", "訂單紀錄列表"],
      sd_tab: "0",
      statusList: [],
      sd_status: "-1",
      tableList: [],
      sd_order: -1,
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
      return MMT;
    },
    FLOW() {
      return FLOW;
    },
    re_t0() {
      let result = this.tableList.filter(x => x.status === "franchiserChoosing");
      return result;
    },
    re_t1() {
      let result = this.tableList;
      return result;
    }
  },
  mounted() {
    this.getData("order");
  },
  methods: {
    getData(type) {
      if (type === "order") {
        this.$api.getFranchiserService().getOrderList().then(res => {
          if (res.length) {
            this.tableList = res.map((x, i) => { x.i = i; return x });
          };
        }).catch(ex => { this.GO.catch(ex); });
      }
    },
    sp_order(type, index) {
      if (GO_isNum(index)) this.sd_order = index;
      if (type === "inquiry") this.$router.push({ path: `${this.$route.path}/${type}` })
    },
    sp_t(row, column, event) {
      this.sp_order("inquiry", row.i);
    }
  }
}
</script>