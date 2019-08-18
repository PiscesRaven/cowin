<template>
  <div class="shield_frame fx jcc" :class="frameClass">
    <div class="close_frame"></div>
    <div class="shield_ctn" :class="ctnClass">
      <i class="el-icon-close icon_40 shoeld_x" @click="GO.R_back"></i>
      <slot name="body"></slot>
      <div class="shoeld_btn">
        <el-button @click="GO.R_back">取消</el-button>
        <el-button type="primary" @click="submit">確定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
//mixins
import GO from "@mix/GO_mixins";
export default {
  mixins: [GO],
  props: {
    frameClass: String,
    ctnClass: String,
    submit: Function
  },

}
</script>