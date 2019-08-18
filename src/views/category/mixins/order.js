import optionItem from "@c/optionItem";
import { mapState } from "vuex";
import { USER_ROLE } from "@js/model";
import GO from "@mix/GO_mixins";
import { GO_isScs, GO_isNum } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      api: undefined,
      retailerId: "",
      //category
      categoryList: [],
      sd_category: undefined,
      c_optionItem_show: false,
      c_create_show: false,
      //product
      productList: [],
      sd_product: undefined,
      p_optionItem_show: false,
      p_create_show: false
    };
  },
  computed: {
    ...mapState(["user"]),
    isCategory() {
      return !this.$route.params.cid;
    },
    isProduct() {
      return !!this.$route.params.cid;
    }
  },
  created() {
    if (this.user.role === USER_ROLE.retailer) {
      this.api = this.$api.getRetailerService();
      this.retailerId = this.user._id;
    } else if (this.user.role === USER_ROLE.franchiser) {
      this.api = this.$api.getFranchiserService();
      this.retailerId = this.user.retailerId;
      this.c_optionItem_show = this.p_optionItem_show = true;
      this.c_create_show = this.p_create_show = true;
    }
  },
  mounted() {
    this.getData("category");
    this.getData("product");
  },
  methods: {
    getData(type) {
      if (!this.api) return false;
      if (type === "category") {
        this.api
          .getCategoryList(this.retailerId)
          .then(res => {
            this.categoryList = res.map((x, i) => {
              x.i = i;
              return x;
            });
          })
          .catch(ex => {
            this.GO.catch(ex);
          });
      } else if (type === "product") {
        this.api
          .getProductItemList(this.retailerId)
          .then(res => {
            this.productList = res.map((x, i) => {
              x.i = i;
              return x;
            });
          })
          .catch(ex => {
            this.GO.catch(ex);
          });
      }
    },
    linkTo(type, val) {
      const { cid } = this.$route.params;
      if (type === "product") {
        if (!cid) this.$router.push({ path: `${this.$route.path}/${val}` });
      }
    },
    //page event
    c_item(index) {
      this.linkTo("product", this.categoryList[index]._id);
    },
    c_edit(index) {},
    c_del(index) {},
    c_create() {
      // this.sp_category("create");
    },
    p_item(index) {},
    p_edit(index) {},
    p_del(index) {},
    p_create() {
      // this.sp_product("create");
    }
  }
};
