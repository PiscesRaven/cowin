export default {
  data() {
    return {
      publicId: "",
    }
  },
  beforeDestroy() {
    if (this.publicId) this.$root.publicList.splice(this.$root.publicList.findIndex(x => x.id === this.publicId), 1);
  },
  methods: {
    toPublic(id) {
      this.publicId = id;
      this.$root.publicList.push({
        id: this.publicId,
        val: this
      })
    },
    getVue(id) {
      return this.$root.publicList[
        this.$root.publicList.findIndex(x => x.id === id)
      ].val;
    }
  }
}