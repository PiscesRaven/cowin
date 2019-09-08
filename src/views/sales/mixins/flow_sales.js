import { FLOW } from "@js/model";
import { GO_isScs } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    //salesBiding
    if (this.$SD.status === FLOW.all.salesBiding) {
      this.bidPrice_sales_edit = true;
    }
  },
  methods: {
    submit() {
      //salesBiding
      if (this.$SD.status === FLOW.all.salesBiding) {
        if (Number(this.bidPrice_supplier)) {
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
