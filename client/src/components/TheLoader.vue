<template>
  <v-dialog v-model="loading" fullscreen>
    <v-container fill-height>
      <v-layout column justify-center align-center>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </v-container>
  </v-dialog>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "loader",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["loading"])
  }
};
</script>
<style lang="scss" scoped>
.full {
  height: 100vh;
}
</style>
