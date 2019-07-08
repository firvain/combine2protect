<template>
  <div>
    <SiteToolBar :pages="pages"></SiteToolBar>
    <router-view :pages="pages"></router-view>
    <TheFooter></TheFooter>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "thelayout",
  components: {
    SiteToolBar,
    TheFooter
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["pages"])
  }
};
</script>
<style lang="scss" scoped></style>
