export default {
  methods: {
    m_error(val) {
      this.$message({
        showClose: true,
        message: val,
        type: 'error'
      });
      return false;
    
    },
    m_scs(val) {
      this.$message({
        showClose: true,
        message: val,
        type: 'success'
      });
    }
  }
}