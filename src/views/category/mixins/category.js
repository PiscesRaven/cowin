import optionItem from "@c/optionItem";
import { mapState } from "vuex";
import GO from "@mix/GO_mixins";
import { GO_isScs, GO_isNum } from "@js/GO_methods";
export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      //category
      categoryList: [],
      sd_category: undefined,
      c_optionItem_show: true,
      c_create_show: true,
      //product
      productList: [],
      sd_product: undefined,
      p_optionItem_show: true,
      p_create_show: true,
      p_edit: false
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
  mounted() {
    this.getData("category");
    this.getData("product");
  },
  methods: {
    getData(type) {
      const { cid } = this.$route.params;
      if (type === "category") {
        this.$api
          .getStaffService()
          .getCategoryList()
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
        this.$api
          .getStaffService()
          .getProductList()
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
    //category
    sp_category(cmode, index) {
      if (GO_isNum(index)) this.sd_category = index;
      if (/^(create|edit)$/.test(cmode)) this.GO.R_toMode(cmode);
      else if (cmode === "delete") {
        this.$api
          .getStaffService()
          .removeCategory(this.categoryList[this.sd_category]._id)
          .then(res => {
            if (GO_isScs(res.status)) {
              this.getData("category");
              this.$root.m_scs("删除成功!");
            } else this.$root.m_error(res.message);
          })
          .catch(ex => {
            this.GO.catch(ex);
          });
      }
    },
    //product
    sp_product(pmode, index) {
      if (GO_isNum(index)) this.sd_product = index;
      if (/^(create|edit)$/.test(pmode)) this.GO.R_toMode(pmode);
      else if (pmode === "delete") {
        this.$api
          .getStaffService()
          .removeProduct(this.productList[this.sd_product]._id)
          .then(res => {
            if (GO_isScs(res.status)) {
              this.getData("product");
              this.$root.m_scs("删除成功!");
            } else this.$root.m_error(res.message);
          })
          .catch(ex => {
            this.GO.catch(ex);
          });
      }
    },
    //page event
    c_item(index) {
      this.linkTo("product", this.categoryList[index]._id);
    },
    c_edit(index) {
      this.sp_category("edit", index);
    },
    c_del(index) {
      this.sp_category("delete", index);
    },
    c_create() {
      this.sp_category("create");
    },
    p_item(index) {
      this.sp_product("edit", index);
    },
    p_del(index) {
      this.sp_product("delete", index);
    },
    p_create() {
      this.sp_product("create");
    }
  }
};
