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
      <div v-show="sd_tab === '0'">
        <el-table :data="re_t0" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t" class="hasOption">
          <el-table-column label="#" width="50px;" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">{{(scope.row.product||{}).name}}</template>
          </el-table-column>
          <el-table-column label="加盟店">
            <template slot-scope="scope">{{(scope.row.creator||{}).role === USER_ROLE.franchiser ? (scope.row.creator||{}).name:""}}</template>
          </el-table-column>
          <el-table-column property label="經銷商">
            <template slot-scope="scope">{{(scope.row.creator||{}).role === USER_ROLE.retailer ? (scope.row.creator||{}).name:""}}</template>
          </el-table-column>
          <el-table-column property label="數量">
            <template slot-scope="scope">{{scope.row.number.toPrice()}}</template>
          </el-table-column>
          <el-table-column property label="時間">
            <template slot-scope="scope">{{MMT(scope.row.updated).format('YYYY/MM/DD HH:mm:ss')}}</template>
          </el-table-column>
          <!-- <el-table-column width="50px" align="center">
            <div slot-scope="scope" @click.stop.prevent>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link vtc cp">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="sp_order('delete',scope.row.i)">刪除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-table-column>-->
        </el-table>
      </div>
      <div v-show="sd_tab === '1'">
        <el-table :data="re_t1" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t1" class="hasOption">
          <el-table-column label="#" width="50px;" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column label="商品">
            <template slot-scope="scope">{{(scope.row.product||{}).name}}</template>
          </el-table-column>
          <el-table-column label="最低價">
            <template slot-scope="scope">{{Object.values(scope.row.chosenSuppliers||{}).filter(x=>x.bidPrice).map(x=>x.bidPrice).sort((a,b)=>a-b)[0]||""}}</template>
          </el-table-column>
          <el-table-column property label="供應商">
            <template slot-scope="scope">{{(supplierList.filter(c=>c._id===(Object.values(scope.row.chosenSuppliers||{}).filter(x=>x.bidPrice).sort((a,b) => a.bidPrice - b.bidPrice)[0]||{})._id)[0]||{}).name}}</template>
          </el-table-column>
          <!-- <el-table-column property label="負責採購員工">
            <template slot-scope="scope">{{scope.row.staffId}}</template>
          </el-table-column>-->
          <el-table-column property label="建立時間">
            <template slot-scope="scope">{{MMT(scope.row.created).format('YYYY/MM/DD HH:mm:ss')}}</template>
          </el-table-column>
          <el-table-column property label="更新時間">
            <template slot-scope="scope">{{MMT(scope.row.updated).format('YYYY/MM/DD HH:mm:ss')}}</template>
          </el-table-column>
          <!-- <el-table-column width="50px" align="center">
            <div slot-scope="scope" @click.stop.prevent>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link vtc cp">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="sp_bot('delete',scope.$index)">刪除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-table-column>-->
        </el-table>
      </div>
      <div v-show="sd_tab === '2'">
        <el-table :data="re_t2" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t2" class="hasOption">
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
          <!-- <el-table-column width="50px" align="center">
            <div slot-scope="scope" @click.stop.prevent>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link vtc cp">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="sp_bot('delete',scope.$index)">刪除</el-dropdown-item>
                  <el-dropdown-item @click.native="sp_bot('print',scope.$index)">列印出售單</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import optionItem from "@c/optionItem";
import { USER_ROLE, FLOW } from "@js/model";
// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isNum } from "@js/GO_methods";
import { setTimeout } from 'timers';

export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      filterStr: "",
      tabList: ["補貨訂單", "詢價列表", "訂單紀錄"],
      sd_tab: "0",////test
      tableList: [],
      sd_order: -1,
      supplierList: [],
    }
  },
  computed: {
    ...mapState(["user"]),
    USER_ROLE() {
      return USER_ROLE;
    },
    MMT() {
      return MMT
    },

    FLOW() {
      return FLOW;
    },
    re_t0() {//補貨訂單
      let result = this.tableList.filter(x => x.status === "choosingSupplier" && !x.chosenSuppliers);
      return result;
    },
    re_t1() {//詢價列表
      let result = this.tableList.filter(x => x.status === "choosingSupplier" && x.chosenSuppliers);
      return result;
    },
    re_t2() {//訂單紀錄列表(全部)
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
        this.$api.getStaffService().getOrderList().then(res => {
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
    sp_t(row, column, event) {
      this.sp_order("inquiry", row.i);
    },
    sp_t0(row, column, event) {
      this.sp_order("inquiry", row.i);
    },
    sp_t1(row, column, event) {
      this.sp_order("inquiry", row.i);
    },
    sp_t2(row, column, event) {
      this.sp_order("inquiry", row.i);
    }
  }
}
</script>