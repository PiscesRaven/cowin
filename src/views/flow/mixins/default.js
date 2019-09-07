import GO from "@mix/GO_mixins";
export default {
  mixins: [GO],
  data() {
    return {
      title: "",
      //submit
      submit_show: false,
      //進度條
      step: 0,
      step_show: false,
      stepList: [],
      sd_imageUrl: 0,
      //訂單狀態
      orderStatus_show: false,
      orderStatusList: [],
      sd_orderStatus: "",
      //供應商詢價
      select_supplier_show: false,
      sd_select_supplier: [],
      //選擇供應商
      choose_supplier_show: false,
      choose_supplierList: [],
      sd_choose_supplier: "",
      //報價流程
      priceStep: 0,
      bidPrice_supplier: "",
    };
  },
  computed: {
    $P() {
      return this.$parent || undefined;
    },
    $SD() {
      return this.$P.tableList[this.$P.sd_order];
    }
  },
  created() { },
  mounted() { },
  methods: {
    submit() { }
  }
};
