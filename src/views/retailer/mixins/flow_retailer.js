import { FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    if (this.$SD.status === "retailerBiding") {
      this.submit_show = false;
      this.bidPrice_sales = this.$SD.retailer.price;
      this.bidPrice_sales_title = "公司報價";
      this.bidPrice_sales_show = true;
      this.confirmbtn_show = true;
    }
    else if (this.$SD.status.has([FLOW.all.preparing, FLOW.all.shipping])) {
      this.orderStatus_show = true;
      this.orderStatusList = ["preparing", "shipping"];
      this.sd_orderStatus = this.$SD.status;
    }
  },
  methods: {
    confirmbtn_accept() {
      if (this.$SD.status === "retailerBiding") {
        this.$api.getRetailerService().acceptOrder(this.$SD._id).then(res => {
          if (GO_isScs(res.status)) {
            this.$P.getData("order");
            this.GO.R_back();
            this.$root.m_scs("修改成功");
          }
        }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
      }
    },
    confirmbtn_reject() {
      if (this.$SD.status === "retailerBiding") {
        this.$api.getRetailerService().rejectOrder(this.$SD._id).then(res => {
          if (GO_isScs(res.status)) {
            this.$P.getData("order");
            this.GO.R_back();
            this.$root.m_scs("拒絕成功");
          }
        }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
      }
    },
    submit() {
      if (this.$SD.status.has([FLOW.all.preparing, FLOW.all.shipping])) {
        this.$api.getRetailerService().updateOrderStatus(this.$SD._id, this.sd_orderStatus).then(res => {
          if (GO_isScs(res.status)) {
            this.$P.getData("order");
            this.GO.R_back();
            this.$root.m_scs("修改成功");
          }
        }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
      }
    }
  }
};
