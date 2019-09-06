import { VUEX_STATE } from "@js/model";
let readySync = true;
export default {
  computed: {
    vuex() {
      return this.$store.state;
    }
  },
  methods: {
    initVuex() {
      readySync = false;
      setTimeout(() => {
        let vuex_init_value = new VUEX_STATE();
        for (let prop in vuex_init_value) {
          this.$store.state[prop] = vuex_init_value[prop];
        }
        readySync = true;
      }, 0);
    },
    syncTo() {
      sessionStorage.setItem("VUEX", JSON.stringify(this.vuex));
    }
  },
  watch: {
    vuex: {
      handler(val) {
        if (readySync) this.syncTo(val);
      },
      deep: true
    }
  }
};
