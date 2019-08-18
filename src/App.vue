<template>
  <div id="app" class="space_frame">
    <GO/>
    <router-view/>
  </div>
</template>
<script>
import GO from "@/GO";
export default {
  components: { GO }
}
</script>