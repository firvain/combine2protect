<template>
  <div class="mine">
    <SiteToolBar :pages="pages" v-if="$route.path !== '/'"></SiteToolBar>
    <router-view :pages="pages"></router-view>
    <TheFooter v-if="$route.path !== '/'"></TheFooter>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "TheLayout",
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
<style lang="scss" scoped>
.mine {
  height: 100%;
}
</style>
