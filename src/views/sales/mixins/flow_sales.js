import { FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    //salesBiding / rejected(retailer)
    if (this.$SD.status === FLOW.all.salesBiding || (this.$SD.source === USER_ROLE.retailer && this.$SD.status === FLOW.all.rejected)) {
      this.bidPrice_sales_edit = true;
    }
  },
  methods: {
    submit() {
      //salesBiding / rejected(retailer)
      if (this.$SD.status === FLOW.all.salesBiding || (this.$SD.source === USER_ROLE.retailer && this.$SD.status === FLOW.all.rejected)) {
        if (Number(this.bidPrice_sales)) {
          this.$api.getSalesService().updateOrderPrice(this.$SD._id, this.$SD.retailerId, Number(this.bidPrice_sales)).then(res => {
            if (GO_isScs(res.status)) {
              this.$P.getData("order");
              this.GO.R_back();
              this.$root.m_scs("修改成功");
            }
          }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
        }
      }
    }
  }
};
