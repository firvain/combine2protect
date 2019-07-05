<template>
  <div>
    <SiteToolBar></SiteToolBar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12>
            Soon...
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <TheFooter> </TheFooter>
  </div>
</template>

<script>
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "webGIS",
  components: {
    SiteToolBar,
    TheFooter
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
