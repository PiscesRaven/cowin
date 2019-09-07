import { mapState } from "vuex";
import GO from "@mix/GO_mixins";
import { USER_ROLE } from "@js/model"
export default {
  mixins: [GO],
  data() {
    return {
      title: "",
      //submit
      submit_show: true,
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
      bidPrice_supplier: "",
      bidPrice_supplier_title: "供應商",
      bidPrice_supplier_show: true,
      bidPrice_supplier_edit: true,
      bidPrice_sales: "",
      bidPrice_sales_title: "我們",
      bidPrice_sales_show: true,
      bidPrice_sales_edit: true,
      bidPrice_retailer: "",
      bidPrice_retailer_title: "經銷商",
      bidPrice_retailer_show: true,
      bidPrice_retailer_edit: true,
    };
  },
  computed: {
    ...mapState(["user"]),
    $P() {
      return this.$parent || undefined;
    },
    $SD() {
      return this.$P.tableList[this.$P.sd_order];
    },
    isStaff() {
      return this.user.role.has([USER_ROLE.staff, USER_ROLE.sales]);
    }
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    if (this.isStaff) {
      this.stepList = ["詢價", "報價", "價格確認", "商品準備中", "出貨中"];
      this.step_show = true;
      if (this.$SD.status === "choosingSupplier") {
        this.step = 1;
      }
      else if (this.$SD.status === "salesBiding") {
        this.step = 1;
      }
    }
  },
  mounted() { },
  methods: {
    submit() { }
  }
};
