<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link vtc cp">
      <img src="@as/img/menu.png" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-if="edit_show" @click.native="editHandler">編輯</el-dropdown-item>
      <el-dropdown-item v-if="inquiry_show" @click.native="inquiryHandler">詢價</el-dropdown-item>
      <el-dropdown-item v-if="del_show" @click.native="delHandler">刪除</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import { GO_fn_rebuilder } from "@js/GO_methods";
export default {
  props: [
    "edit",
    "del",
    "inquiry",
    "delObj"//刪除對像
  ],
  computed: {
    inquiry_show() {
      return this.inquiry
    },
    edit_show() {
      return this.edit
    },
    del_show() {
      return this.del
    }
  },
  methods: {
    inquiryHandler() {
      GO_fn_rebuilder(this.inquiry);
    },
    editHandler() {
      GO_fn_rebuilder(this.edit);
    },
    delHandler() {
      let warn = "確定要刪除嗎?";
      if (this.delObj) warn = `確定要刪除 ${this.delObj} ?`;
      this.$confirm(warn, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        GO_fn_rebuilder(this.del);
      })
    }
  }
}
</script>
