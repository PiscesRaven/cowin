<template>
  <flowTemplate></flowTemplate>
</template>
<script>
import flowTemplate from "@v/flow/flowTemplate";
export default {
  components: { flowTemplate },
  mixins: [
    require("@v/flow/mixins/default").default,
    require("./mixins/flow_franchiser").default,
  ]
}
</script>