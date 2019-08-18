<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link vtc cp">
      <img src="@as/img/menu.png">
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-if="edit" @click.native="editHandler">編輯</el-dropdown-item>
      <el-dropdown-item v-if="del" @click.native="delHandler">刪除</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
const functionCompiler = function (val) {
  if (Array.isArray(val)) val[0](...val.slice(1));
  else val();
}
export default {
  props: ["edit", "del"],
  methods: {
    editHandler() {
      functionCompiler(this.edit);
    },
    delHandler() {
      this.$confirm('確定要刪除嗎?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        functionCompiler(this.del);
      })
    }
  }
}
</script>
