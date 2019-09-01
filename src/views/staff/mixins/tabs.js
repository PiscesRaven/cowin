import optionItem from "@c/optionItem";

// mixins
import GO from "@mix/GO_mixins";
//GO_methods
import { GO_isScs, GO_isNum } from "@js/GO_methods";

export default {
  mixins: [GO],
  components: { optionItem },
  props: ["tabData"],
  methods: {
    sp_user(mode, index) {
      if (GO_isNum(index)) this.sd_user = index;
      if (/^(create|edit|inquiry)$/.test(mode)) this.GO.R_toMode(mode);
      else if (mode === "delete") {
        this.$api.getStaffService().removeUser(this.userList[this.sd_user].email).then(res => {
          if (GO_isScs(res.status)) {
            this.getData();
            this.$root.m_scs("删除成功!");
          }
          else this.$root.m_error(res.message);
        }).catch(ex => { this.GO.catch(ex); });
      }
    }
  },
}
