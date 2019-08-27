let vuex_init_value = {};
const vuex = "VUEX";
let readySync = false;
export default {
  computed: {
    vuex() {
      return this.$store.state;
    }
  },
  created() {
    vuex_init_value = JSON.parse(JSON.stringify(this.vuex));
    this.sync();
  },
  methods: {
    initVuex() {
      readySync = false;
      setTimeout(() => {
        for (let prop in vuex_init_value) {
          this.$store.state[prop] = vuex_init_value[prop];
        }
        window.sessionStorage.removeItem(vuex);
        readySync = true;
      }, 0);
    },
    sync(obj) {
      if (obj) sessionStorage.setItem(vuex, JSON.stringify(obj));
      else {
        readySync = false;
        const vxObj = JSON.parse(sessionStorage.getItem(vuex));
        if (vxObj != null && typeof vxObj === "object" && Object.keys(vxObj).length) {
          for (let prop in vxObj) {
            this.$store.state[prop] = vxObj[prop];
          }
        }
        readySync = true;
      }
    }
  },
  watch: {
    vuex: {
      handler(val) {
        if (readySync) this.sync(val);
      },
      deep: true
    }
  }
};
