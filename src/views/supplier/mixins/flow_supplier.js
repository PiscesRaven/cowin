import { GO_isScs, GO_DClone } from "@js/GO_methods";
export default {
  data() {
    return {
      //submit
      submit_show: true,
    };
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    if (this.$SD.status === "choosingSupplier") {
      this.priceStep = 1;
    }
  },
  methods: {
    submit() {
      if (this.$SD.status === "choosingSupplier") {
        if (Number(this.bidPrice_supplier)) {
          this.$api.getSupplierService().updateBid(this.$SD._id, this.bidPrice_supplier).then(res => {
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
