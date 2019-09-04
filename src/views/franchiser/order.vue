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
        <el-table :data="re_t0" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t0" class="hasOption">
          <el-table-column label="#" width="50px;" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column property="name" label="商品"></el-table-column>
          <el-table-column property label="加盟店"></el-table-column>
          <el-table-column property label="數量"></el-table-column>
          <el-table-column property label="時間"></el-table-column>
        </el-table>
      </div>
      <div v-show="sd_tab === '1'">
        <el-table :data="re_t1" stripe style="width: 100%" max-height="650" highlight-current-row fit border @row-click="sp_t1">
          <el-table-column label="#" width="50px;" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column property label="商品"></el-table-column>
          <el-table-column property label="最低價"></el-table-column>
          <el-table-column property label="供應商"></el-table-column>
          <el-table-column property label="負責採購員工"></el-table-column>
          <el-table-column property label="時間"></el-table-column>
        </el-table>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>

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
      sd_user: -1,
      sd_role: "",
    }
  },
  computed: {
    tableList() {
      const fakeData = [{
        name: '123',
        quantity: 'ssss',
        type: 'size',
        updatedTime: '2019-08-30',
        role: '0'
      },
      {
        name: '321',
        quantity: 's87654',
        type: 'size',
        updatedTime: '2019-08-30',
        role: '1'
      },
      {
        name: '32133',
        quantity: 's87654',
        type: 'size',
        updatedTime: '2019-08-30',
        role: '2'
      }
      ]

      let result = fakeData.filter(x => x.role === this.sd_tab);

      return result;
    },
    re_t0() {
      let result = this.tableList;

      return result;
    },
    re_t1() {
      let result = this.tableList;

      return result;
    }
  },
  created() {

  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // this.$api.getSupplierService().getOrderList().then(res => {
      //   ////test
      //   console.log(res);
      //   if (res.length) {
      //     this.tableList = res.map((x, i) => { x.i = i; return x });
      //   };
      // }).catch(ex => { this.GO.catch(ex); });
    },
    sp_user(mode, index) {
      if (GO_isNum(index)) this.sd_user = index;
      if (/^(create|edit|inquiry)$/.test(mode)) this.GO.R_toMode(mode);
      else if (mode === "delete") {
        this.$api.getStaffService().removeUser(this.userList[this.sd_user].email).then(res => {
          if (GO_isScs(res.status)) {
            this.getData();
            this.$root.m_scs("删除成功!");
          }
          else this.$root.m_error(res.message);
        }).catch(ex => { this.GO.catch(ex); });
      }
    },
    sp_bot() {

    },
    sp_t0(row, column, event) {
      console.log(row, column, event)
      this.$router.push('/order/franchiser/inquiry')
    },
    sp_t1(row, column, event) {
      console.log(row, column, event)
    }

  }
}
</script>