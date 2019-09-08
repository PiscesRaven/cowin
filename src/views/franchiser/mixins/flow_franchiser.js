import { FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    if (this.$SD.status === "franchiserBiding") {
      this.submit_show = false;

      this.bidPrice_sales = this.$SD.retailer.price;
      this.bidPrice_sales_title = "經銷商報價";
      this.bidPrice_sales_show = true;
      this.confirmbtn_show = true;
    }
  },
  methods: {
    confirmbtn_accept() {
      if (this.$SD.status === "franchiserBiding") {
        this.$api.getFranchiserService().acceptOrder(this.$SD._id).then(res => {
          if (GO_isScs(res.status)) {
            this.$P.getData("order");
            this.GO.R_back();
            this.$root.m_scs("修改成功");
          }
        }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
      }
    },
    confirmbtn_reject() {
      if (this.$SD.status === "franchiserBiding") {
        this.$api.getFranchiserService().rejectOrder(this.$SD._id).then(res => {
          if (GO_isScs(res.status)) {
            this.$P.getData("order");
            this.GO.R_back();
            this.$root.m_scs("拒絕成功");
          }
        }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
      }
    }
  }
};