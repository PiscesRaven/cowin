import { mapState } from "vuex";
import { USER_ROLE } from "@js/model";
import GO from "@mix/GO_mixins";
export default {
  mixins: [GO],
  data() {
    return {
      categoryList: [],
      productList: [],
      sd_category: "",
      sd_product: "",
      hambuger_show: false,
      api: undefined,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created() {
    if (this.user.role === USER_ROLE.retailer) this.api = this.$api.getRetailerService();
    else if (this.user.role === USER_ROLE.franchiser) this.api = this.$api.getFranchiserService();
  },
  mounted() {
    this.getData("category");
  },
  methods: {
    getData(type) {
      if (!this.api) return false;
      if (type === "category") {
        this.api.getCategoryList().then(res => {
          this.categoryList = res;
        }).catch(ex => { this.GO.catch(ex); });
      }
      else if (type === "product") {
        this.api.getProductList().then(res => {
          this.productList = res;
        }).catch(ex => { this.GO.catch(ex); });
      }
    },
    categoryHandler() {

    },
    productHandler() {

    },
    createHandler() {

    }
  }
}