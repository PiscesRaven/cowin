import { FLOW } from "@js/model";
import { GO_isScs, GO_DClone } from "@js/GO_methods";
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$SD) { this.GO.R_backfrom("mode"); return false; }
    //choosingSupplier
    if (this.$SD.status === FLOW.all.choosingSupplier) {
      this.submit_show = true;
      //選擇供應商詢價
      this.select_supplier_show = true;
      if (this.$SD.chosenSuppliers) {
        this.sd_select_supplier = Object.values(this.$SD.chosenSuppliers).map(x => x._id);
        this.choose_supplierList = GO_DClone(this.$P.supplierList).filter(x => this.$SD.chosenSuppliers[x._id] && this.$SD.chosenSuppliers[x._id].bidPrice).map(x => {
          x.bidPrice = this.$SD.chosenSuppliers[x._id].bidPrice;
          x.label = x.name + "：" + x.bidPrice.toPrice();
          return x;
        })
      }
      //選擇供應商
      this.choose_supplier_show = !!this.$SD.chosenSuppliers;
    }
  },
  methods: {
    submit() {
      //choosingSupplier
      if (this.$SD.status === FLOW.all.choosingSupplier) {
        if (this.sd_choose_supplier) {
          this.$api.getStaffService().chooseBiddingWinner(this.$SD._id, this.sd_choose_supplier).then(res => {
            if (GO_isScs(res.status)) {
              this.$P.getData("order");
              this.$api.getStaffService().updateOrderStatus(this.$SD._id, "salesBiding").then(res => {
                if (GO_isScs(res.status)) {
                  this.$P.getData("order");
                  this.GO.R_back();
                  this.$root.m_scs("修改成功");
                }
              }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
            }
          }).catch(ex => { this.GO.catch(ex, "系統錯誤"); });
        }
        else {
          if (this.sd_select_supplier.length) {
            this.$api.getStaffService().chooseBiddingSupplier(this.$SD._id, this.sd_select_supplier).then(res => {
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
  }
};
