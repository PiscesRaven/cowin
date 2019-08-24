import { USER_ROLE } from "@js/model";
import { GO_isNum } from "@js/GO_methods";
export default {
  data() {
    return {
      api: undefined,
      retailerId: ""
    };
  },
  computed: {
    re_categoryList() {
      let result = this.categoryList;
      if (!!this.filterStr.trim()) {
        result = result.filter(x => x.name.has(this.filterStr.trim()));
      }
      return result;
    },
    re_productList() {
      let result = this.productList;
      if (!!this.filterStr.trim()) {
        result = result.filter(x => x.name.has(this.filterStr.trim()));
      }
      if (!!this.$route.params.cid) {
        result = result.filter(x => x.product.categoryId === this.$route.params.cid);
      }
      return result;
    }
  },
  created() {
    if (this.user.role === USER_ROLE.retailer) {
      this.api = this.$api.getRetailerService();
      this.retailerId = this.user._id;
    } else if (this.user.role === USER_ROLE.franchiser) {
      this.api = this.$api.getFranchiserService();
      this.retailerId = this.user.retailerId;
      this.c_create_show = this.p_create_show = true;
    }
  },
  mounted() {
    this.getData("category");
    this.getData("product");
    // this.categoryList = [{ _id: "5d5913d90eab6e61585feb80", description: "汽車", i: 0, imageUrl: "", name: "汽車", updated: 1566118873760 }];
    // this.productList = [{ _id: "5d5913e40eab6e61585feb81", categoryId: "5d5913d90eab6e61585feb80", color: "", description: "輪胎", i: 0, imageUrl: "", name: "輪胎", size: "", updated: 1566118884316 }];
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
    //product
    sp_product(pmode, index) {
      if (GO_isNum(index)) this.sd_product = index;
      if (/^(create|sp)$/.test(pmode)) this.GO.R_toMode(pmode);
    },
    //page event
    c_optionItem(index) {
      this.linkTo("product", this.categoryList[index]._id);
    },
    c_create() {
      this.sp_product("sp");
    },
    p_optionItem(index) {
      this.sp_product("create", index);
    },
    p_create() {
      this.sp_product("sp");
    }
  }
};
