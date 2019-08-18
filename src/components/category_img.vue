<template>
  <div class="modal_item _600 _H180" v-perfect-scroll:100>
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="addImg" :on-remove="removeImg">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="elShowFolder">
      <img width="100%" :src="imageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>

import scrollBar from '@mix/scrollBar';

export default {
  mixins: [scrollBar],
  data() {
    return {
      elShowFolder: false, // 資料夾開啟狀態
      imageUrl: '', // order
    }
  },
  methods: {
    addImg(file) {
      //新增圖片
      this.imageUrl = file.url;
      this.elShowFolder = true;
    },
    removeImg(file, fileList) {
      //刪除圖片
      console.log(file, fileList);
    }
  }
}
</script>
