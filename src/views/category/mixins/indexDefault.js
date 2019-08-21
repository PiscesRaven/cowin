import optionItem from "@c/optionItem";
import { mapState } from "vuex";
import GO from "@mix/GO_mixins";
export default {
  mixins: [GO],
  components: { optionItem },
  data() {
    return {
      filterStr: "",
      //category
      categoryList: [],
      sd_category: undefined,
      c_optionItem_show: false,
      c_edit_show: false,
      c_del_show: false,
      c_create_show: false,
      //product
      productList: [],
      sd_product: undefined,
      p_optionItem_show: false,
      p_edit_show: false,
      p_del_show: false,
      p_create_show: false
    };
  },
  computed: {
    ...mapState(["user"]),
    pageTitle() {
      if (this.isCategory) return "商品類別";
      else if (this.isProduct) return "商品列表";
    },
    isCategory() {
      return !this.$route.params.cid;
    },
    isProduct() {
      return !!this.$route.params.cid;
    },
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
  created() {
    this.toPublic("category");
    const { role } = this.$route.params;
    if (!role) this.$router.replace({ path: `${this.$route.path}/${this.user.role}` });
    else if (role !== this.user.role) this.$router.replace({ path: `${this.$route.parentPath}/${this.user.role}` });
  },
  methods: {
    linkTo(type, val) {
      const { cid } = this.$route.params;
      if (type === "product") {
        if (!cid) this.$router.push({ path: `${this.$route.path}/${val}` });
      }
    },
    //page event
    c_optionItem(index) {},
    c_edit(index) {},
    c_del(index) {},
    c_create() {},
    p_optionItem(index) {},
    p_edit(index) {},
    p_del(index) {},
    p_create() {}
  }
};
