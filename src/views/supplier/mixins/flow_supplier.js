import { FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    if (this.$SD.status === FLOW.all.choosingSupplier) {
      this.bidPrice_supplier_title = "公司報價";
      this.bidPrice_supplier_show = true;
      this.bidPrice_supplier_edit = true;
    }
    else if (this.$SD.status.has([FLOW.all.preparing, FLOW.all.shipping])) {
      this.orderStatus_show = true;
      this.orderStatusList = ["preparing", "shipping"];
      this.sd_orderStatus = this.$SD.status;
    }
  },
  methods: {
    submit() {
      if (this.$SD.status === FLOW.all.choosingSupplier) {
        if (Number(this.bidPrice_supplier)) {
          this.$api.getSupplierService().updateBid(this.$SD._id, Number(this.bidPrice_supplier)).then(res => {
            if (GO_isScs(res.status)) {
              this.$P.getData("order");
              this.GO.R_back();
              this.$root.m_scs("修改成功");
            }
          }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
        }
      }
      else if (this.$SD.status.has([FLOW.all.preparing, FLOW.all.shipping])) {
        this.$api.getSupplierService().updateOrderStatus(this.$SD._id, this.sd_orderStatus).then(res => {
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
