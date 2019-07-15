<template>
  <v-content>
    <v-container gid-list-lg fluid fill-height pa-0>
      <v-layout column>
        <v-flex d-flex class="webgis">
          <v-layout row wrap>
            <v-flex
              xs3
              d-flex
              class="layerstree"
              align-center
              justify-center
              white--text
              title
            >
              layerstree
            </v-flex>
            <v-flex xs9 d-flex class="mapview">
              <v-layout
                align-center
                justify-center
                column
                fill-height
                align-items-start
              >
                <v-flex
                  d-flex
                  class="maptools"
                  align-center
                  justify-center
                  white--text
                  title
                >
                  maptools
                </v-flex>
                <v-flex
                  d-flex
                  class="vuemap"
                  align-center
                  justify-center
                  white--text
                  title
                >
                  map
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "webGIS",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.webgis {
  min-height: calc(100vh - 165px);
  margin: 0;
  padding: 0;
}
.layerstree {
  background-color: red;
  flex: 1;
}
.mapview {
  background-color: green;
  flex: 1 1 auto;
  .maptools {
    background-color: blue;
    min-height: 56px;
    flex: 0 1 auto;
    width: 100%;
  }
  .vuemap {
    background-color: cyan;
    flex: 1;
    width: 100%;
  }
}
</style>
