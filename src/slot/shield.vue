<template>
  <div ref="frame" class="shield_frame fx jcc" :class="frameClass" @keyup.esc="$router.go(-1);" tabindex="-1">
    <div class="close_frame"></div>
    <div class="shield_ctn" :class="ctnClass">
      <i class="el-icon-close icon_40 shoeld_x" @click="$router.go(-1);"></i>
      <div class="modal_ttl">{{title}}</div>
      <slot name="body"></slot>
      <div class="shoeld_btn">
        <el-button @click="$router.go(-1);">{{cancelLabel||'取消'}}</el-button>
        <el-button v-if="!!submit" type="primary" @click="submitEvent">{{submitLabel||'確定'}}</el-button>
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
    cancelLabel: String,
    submit: Function,
    submitLabel: String,
    title: String
  },
  mounted() {
    this.$refs.frame.focus();
  },
  methods: {
    submitEvent() {
      if (this.submit) this.submit();
    }
  }
}
</script>