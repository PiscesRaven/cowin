import { GO_isScs, GO_isNum } from "@js/GO_methods";
export default {
  data() {
    return {
      //category
      c_optionItem_show: true,
      c_edit_show: true,
      c_del_show: true,
      c_create_show: true,
      //product
      p_optionItem_show: true,
      p_del_show: true,
      p_create_show: true
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
        result = result.filter(x => x.categoryId === this.$route.params.cid);
      }
      return result;
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
    c_optionItem(index) {
      this.sd_category = index;
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
    p_optionItem(index) {
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
