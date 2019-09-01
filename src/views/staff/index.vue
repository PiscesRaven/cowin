<template>
  <div class="order_ctn">
    <div class="tab_ctn clear">
      <el-radio-group v-model="tab_role">
        <el-radio-button label="replenish_tab">補貨訂單</el-radio-button>
        <el-radio-button label="inquiry_tab">詢價列表</el-radio-button>
        <el-radio-button label="order_tab">訂單紀錄列表</el-radio-button>
      </el-radio-group>
      <div class="tab_search right">
        <el-input placeholder="輸入關鍵字" v-model="filterStr" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>
    <keep-alive>
      <component :is="getTabs" :tabData="orderList" />
    </keep-alive>
    <router-view />
  </div>
</template>
<script>

import optionItem from "@c/optionItem";

import { order_tab, inquiry_tab, replenish_tab } from './tabs'

export default {

  components: { optionItem, order_tab, inquiry_tab, replenish_tab },
  data() {
    return {
      tab_role: "replenish_tab",
      sd_user: -1,
      sd_role: "",
    }
  },
  computed: {
    orderList() {
      const fakeData = [{
        name: '123',
        quantity: 'ssss',
        type: 'size',
        updatedTime: '2019-08-30',
        role: 'replenish_tab'
      },
      {
        name: '321',
        quantity: 's87654',
        type: 'size',
        updatedTime: '2019-08-30',
        role: 'order_tab'
      }
      ]

      let result = fakeData.filter(x => x.role === this.tab_role);

      return result;
    },
    getTabs() {
      return this.tab_role
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const { role } = this.$route.params;
      if (!role) this.$router.replace({ path: `${this.$route.path}/${this.R2R[0]}` });
      else this.sd_role = role;
    }

  }
}
</script>