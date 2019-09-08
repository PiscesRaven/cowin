import { USER_ROLE, FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    //接受/拒絕
    this.isRejected = this.$SD.source === USER_ROLE.franchiser && this.$SD.status === FLOW.all.rejected;
    this.rejected_label = "加盟店不接受報價,請重新報價";
    //retailerBiding / rejected(franchiser)
    if (this.$SD.status === FLOW.all.retailerBiding || (this.$SD.source === USER_ROLE.franchiser && this.$SD.status === FLOW.all.rejected)) {
      this.submit_show = true;//submit
      this.bidPrice_sales = this.$SD.retailer.price;
      this.bidPrice_sales_title = "公司報價";
      this.bidPrice_sales_show = true;
      this.bidPrice_retailer_title = "我的報價";
      this.bidPrice_retailer_show = true;
      this.bidPrice_retailer_edit = true;
    }
    //retailerChoosing
    else if (this.$SD.status === FLOW.all.retailerChoosing) {
      this.bidPrice_sales = this.$SD.retailer.price;
      this.bidPrice_sales_title = "公司報價";
      this.bidPrice_sales_show = true;
      this.confirmbtn_show = true;
    }
    //生產步驟
    else if (this.$SD.source === USER_ROLE.franchiser && FLOW.isProduce(this.$SD.status)) {
      this.submit_show = true;//submit
      this.orderStatus_show = true;
      this.orderStatus_edit = true;
      this.sd_orderStatus = this.$SD.status;
    }
    else {
      this.orderStatus_show = true;
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
      //retailerBiding / rejected(franchiser)
      if (this.$SD.status === FLOW.all.retailerBiding || (this.$SD.source === USER_ROLE.franchiser && this.$SD.status === FLOW.all.rejected)) {
        if (Number(this.bidPrice_retailer)) {
          this.$api.getRetailerService().updateOrderPrice(this.$SD._id, this.$SD.creator._id, Number(this.bidPrice_retailer)).then(res => {
            if (GO_isScs(res.status)) {
              this.$P.getData("order");
              this.GO.R_back();
              this.$root.m_scs("修改成功");
            }
          }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
        }
      }
      //生產步驟
      else if (FLOW.isProduce(this.$SD.status)) {
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
