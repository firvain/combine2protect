<template>
  <v-layout row wrap justify-start align-content-start>
    <!-- <v-flex xs12>
      <v-img
        src="https://via.placeholder.com/120x90/0000FF/808080/?text=NEWS"
        class="hoverImage"
        @click="$router.push('news')"
      />
    </v-flex>
    <v-flex xs12>
      <v-img
        class="hoverImage"
        src="https://via.placeholder.com/120x90/0000FF/808080/?text=Documentary"
      />
    </v-flex> -->
    <v-flex xs12>
      <v-img
        class="hoverImage"
        src="https://via.placeholder.com/120x90/0000FF/808080/?text=WebGis"
        @click="$router.push('webgis')"
      />
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "HomeBanners",
  data() {
    return {};
  },
  methods: {
    gotoNav() {}
  }
};
</script>
<style lang="scss" scoped>
.hoverImage {
  cursor: pointer;
}
</style>
