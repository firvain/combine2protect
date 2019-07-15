<template>
  <v-content>
    <v-container gid-list-lg fluid fill-height>
      <v-layout>
        <v-flex xs3 d-flex class=layerstree>
       
        </v-flex>
        <v-flex xs9 d-flex class=mapview>
          <v-layout row wrap>
            <v-flex xs12  d-flex class=maptools>
              
            </v-flex>
            <v-flex xs12   d-flexclass=vuemap>
              
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
.treeview {
  background-color: red;
}
.maptools {
  background-color: blue
}
.vuemap {
  bacground-color: green;
}
</style>
