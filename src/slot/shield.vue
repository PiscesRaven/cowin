<template>
  <div class="shield_frame fx jcc" :class="frameClass">
    <div class="close_frame"></div>
    <div class="shield_ctn" :class="ctnClass">
      <i class="el-icon-close icon_40 shoeld_x" @click="$router.go(-1);"></i>
      <slot name="body"></slot>
      <div class="shoeld_btn">
        <el-button @click="$router.go(-1);">取消</el-button>
        <el-button v-if="!!submit" type="primary" @click="submit">確定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
//mixins
export default {
  props: {
    frameClass: String,
    ctnClass: String,
    submit: Function
  }
}
</script>