<template>
  <div class="index_frame">
    <Header />
    <div class="body_frame ctn1">
      <div class="body_ctn">
        <Side />
        <div class="page_frame">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@c/header";
import Side from "@c/side";
export default {
  components: { Header, Side },
}
</script>
