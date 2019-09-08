import { USER_ROLE, FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    //retailerChoosing
    if (this.$SD.status === FLOW.all.retailerChoosing) {
      this.submit_show = false;
      this.bidPrice_sales = this.$SD.retailer.price;
      this.bidPrice_sales_title = "公司報價";
      this.bidPrice_sales_show = true;
      this.confirmbtn_show = true;
    }
    //生產步驟
    else if (this.$SD.source === USER_ROLE.franchiser && FLOW.isProduce(this.$SD.status)) {
      this.orderStatus_show = true;
      this.orderStatus_edit = true;
      this.sd_orderStatus = this.$SD.status;
    }
  },
  methods: {
    confirmbtn_accept() {
      //retailerChoosing
      if (this.$SD.status === FLOW.all.retailerChoosing) {
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
      //retailerChoosing
      if (this.$SD.status === FLOW.all.retailerChoosing) {
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
      //生產步驟
      if (FLOW.isProduce(this.$SD.status)) {
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
