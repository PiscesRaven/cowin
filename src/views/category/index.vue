<template>
  <div>
    <router-view v-if="isCategory" name="category" />
    <router-view v-if="isOrder" name="order" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import { USER_ROLE } from "@js/model";
const { admin, staff, sales, supplier, retailer, franchiser } = USER_ROLE;
export default {
  computed: {
    ...mapState(["user"]),
    isCategory() {
      return [this.user.role].has([staff]);
    },
    isOrder() {
      return [this.user.role].has([retailer, franchiser]);
    },
  }
}
</script>