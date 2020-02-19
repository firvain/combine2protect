<template>
  <v-app>
    <!-- <ToolBar :show="showToolbar"></ToolBar> -->
    <TheLoader></TheLoader>
    <v-content>
      <router-view :pages="pages"></router-view>
    </v-content>
  </v-app>
</template>
<script>
import TheLoader from "@/components/TheLoader.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    TheLoader
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["loading", "pages"])
  },
  async created() {
    await this.fetchPagesLocal();
  },
  methods: {
    ...mapActions("app", ["fetchPagesLocal"])
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: transparent;
}
</style>
