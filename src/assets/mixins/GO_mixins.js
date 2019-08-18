//mixins
import publicVue from "@mix/publicVue";
export default {
  mixins: [publicVue],
  computed:{
    GO() {
      return this.getVue('GO');
    }
  }
}