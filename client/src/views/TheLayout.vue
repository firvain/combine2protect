<template>
  <div class="mine">
    <SiteToolBar :pages="pages" v-if="showBars"></SiteToolBar>
    <router-view :pages="pages"></router-view>
    <TheFooter v-if="showBars"></TheFooter>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "TheLayout",
  components: {
    SiteToolBar,
    TheFooter
  },
  props: {
    pages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    showBars() {
      return !!(this.$route.path !== "/" && this.pages.length > 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.mine {
  height: 100%;
}
</style>
