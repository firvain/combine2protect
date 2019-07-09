<template>
  <v-app>
    <!-- <ToolBar :show="showToolbar"></ToolBar> -->

    <router-view></router-view>
  </v-app>
</template>
<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: transparent;
}
</style>
