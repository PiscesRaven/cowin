export default {
  data() {
    return {};
  },
  computed: {
    isCategory() {
      return false;
    },
    isProduct() {
      return true;
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
        result = result.filter(x => x.product.categoryId === this.$route.params.cid);
      }
      return result;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(type) {
      // if (type === "category") {
      //   this.api
      //     .getCategoryList(this.retailerId)
      //     .then(res => {
      //       this.categoryList = res.map((x, i) => {
      //         x.i = i;
      //         return x;
      //       });
      //     })
      //     .catch(ex => {
      //       this.GO.catch(ex);
      //     });
      // } else if (type === "product") {
      //   this.api
      //     .getProductItemList(this.retailerId)
      //     .then(res => {
      //       this.productList = res.map((x, i) => {
      //         x.i = i;
      //         return x;
      //       });
      //     })
      //     .catch(ex => {
      //       this.GO.catch(ex);
      //     });
      // }
    }
  }
};
