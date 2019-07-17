<template>
  <v-app>
    <!-- <ToolBar :show="showToolbar"></ToolBar> -->
    <TheLoader></TheLoader>
    <router-view :pages="pages"></router-view>
  </v-app>
</template>
<script>
import TheLoader from "@/components/TheLoader.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    TheLoader
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["loading", "pages"])
  },
  methods: {
    ...mapActions("app", ["fetchPages"])
  },
  async created() {
    await this.fetchPages();
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: transparent;
}
</style>
