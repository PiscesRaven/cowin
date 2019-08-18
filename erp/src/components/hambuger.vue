<template>
  <div class="hambuger">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img src="@img/menu.png">
      </span>
      <el-dropdown-menu slot="dropdown">
        <template v-if="mode === 'delete'">
          <el-popover
            placement="top"
            width="160"
            v-model="isShowMenu"
          >
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="isShowMenu = false"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="isShowMenu = false"
              >确定</el-button>
            </div>
            <el-button
              slot="reference"
              style="border: none;"
            >删除</el-button>
          </el-popover>
        </template>
        <template v-if="mode === 'edit'">
          <router-link :to="{name: 'categoryAdd'}">
            編輯
          </router-link>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    mode: String
  },
  data() {
    return {
      isShowMenu: false,
    }
  },
  methods: {
    open() {
      // 刪除談窗
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      });
    },
  }
}
</script>