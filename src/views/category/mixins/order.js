import optionItem from "@c/optionItem";
import { mapState } from "vuex";
import { USER_ROLE } from "@js/model";
import GO from "@mix/GO_mixins";
import { GO_isNum } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      api: undefined,
      retailerId: "",
      //category
      categoryList: [
        {
          _id: "5d5913d90eab6e61585feb80",
          description: "汽車",
          i: 0,
          imageUrl: "",
          name: "汽車",
          updated: 1566118873760
        }
      ],
      sd_category: undefined,
      c_optionItem_show: false,
      c_create_show: false,
      //product
      productList: [
        {
          _id: "5d5913e40eab6e61585feb81",
          categoryId: "5d5913d90eab6e61585feb80",
          color: "",
          description: "輪胎",
          i: 0,
          imageUrl: "",
          name: "輪胎",
          size: "",
          updated: 1566118884316
        }
      ],
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
    // this.getData("category");
    // this.getData("product");
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
    //product
    sp_product(pmode, index) {
      if (GO_isNum(index)) this.sd_product = index;
      if (/^(create|sp)$/.test(pmode)) this.GO.R_toMode(pmode);
    },
    //page event
    c_item(index) {
      this.linkTo("product", this.categoryList[index]._id);
    },
    c_edit(index) {},
    c_del(index) {},
    c_create() {
      this.sp_product("sp");
    },
    p_item(index) {
      this.sp_product("create", index);
    },
    p_edit(index) {},
    p_del(index) {},
    p_create() {
      this.sp_product("sp");
    }
  }
};
