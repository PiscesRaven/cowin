import { mapState } from "vuex";
import GO from "@mix/GO_mixins";
import { USER_ROLE, FLOW } from "@js/model"
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
      orderStatus_edit: false,
      orderStatusList: ["accepted", "preparing", "shipping"],
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
      bidPrice_supplier_title: "",
      bidPrice_supplier_show: false,
      bidPrice_supplier_edit: false,
      bidPrice_sales: "",
      bidPrice_sales_title: "",
      bidPrice_sales_show: false,
      bidPrice_sales_edit: false,
      bidPrice_retailer: "",
      bidPrice_retailer_title: "",
      bidPrice_retailer_show: false,
      bidPrice_retailer_edit: false,
      //接受or拒絕
      confirmbtn_show: false,

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
      //choosingSupplier
      if (FLOW.in(this.$SD.status, FLOW.all.choosingSupplier)) {
        if (this.$SD.status === FLOW.all.choosingSupplier) {

        }
      }
      //salesBiding
      if (FLOW.in(this.$SD.status, FLOW.all.salesBiding) || this.$SD.status === FLOW.all.rejected) {
        if (this.$SD.status === FLOW.all.salesBiding) {

        }
        this.step = 1;
        this.bidPrice_supplier_title = (this.$P.supplierList.filter(x => x._id === (Object.values(this.$SD.chosenSuppliers).filter(x => x.isWinner)[0] || {})._id)[0] || {}).name || "供應商";
        this.bidPrice_supplier_show = true;
        this.bidPrice_supplier = (Object.values(this.$SD.chosenSuppliers).filter(x => x.isWinner)[0] || {}).bidPrice || "";
        this.bidPrice_sales_title = "公司報價";
        this.bidPrice_sales_show = true;
      }
      //retailerChoosing or franchiserChoosing
      if (FLOW.in(this.$SD.status, FLOW.all.retailerChoosing) || FLOW.in(this.$SD.status, FLOW.all.franchiserChoosing)) {
        if (this.$SD.status === FLOW.all.retailerChoosing || this.$SD.status === FLOW.all.franchiserChoosing) {

        }
        this.step = 2;
        this.bidPrice_sales = this.$SD.retailer.price;
      }
      //accepted
      if (FLOW.in(this.$SD.status, FLOW.all.accepted)) {
        if (this.$SD.status === FLOW.all.accepted) {

        }
        this.step = 3;
      }
      //preparing
      if (FLOW.in(this.$SD.status, FLOW.all.preparing)) {
        if (this.$SD.status === FLOW.all.preparing) {

        }
        this.step = 4;
      }
      //shipping
      if (FLOW.in(this.$SD.status, FLOW.all.shipping)) {
        if (this.$SD.status === FLOW.all.shipping) {

        }
      }
      //finished
      if (FLOW.in(this.$SD.status, FLOW.all.finished)) {
        if (this.$SD.status === FLOW.all.finished) {

        }
        this.step = 5;
      }
    }
  },
  mounted() { },
  methods: {
    submit() { },
    confirmbtn_accept() { },
    confirmbtn_reject() { },
  }
};
