<template>
  <v-card flat>
    <v-footer :value="show" fixed height="64" color="white">
      <v-layout justify-center row wrap>
        <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="accent" dark v-on="on">
              Data
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, index) in home"
              :key="index"
              @click="gotoText"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn color="accent">
          Project Details
        </v-btn>
        <v-btn color="accent">
          Objectives
        </v-btn>
        <v-btn color="accent">
          Partnership
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" fab small dark to="/home">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-card>
  <!-- <v-toolbar color="primary" dark fixed app v-show="show">
   <v-toolbar-side-icon
      @click.stop="closeSidebar"
      v-show="showSideBarBtn"
    ></v-toolbar-side-icon>
        <img
      src="https://via.placeholder.com/60"
      width="60"
      height="60"
      alt="COMBINE2PROTECT logo" -->
  <!-- /> -->
</template>
<script>
export default {
  name: "bottomNav",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      home: [
        { title: "DataSet1" },
        { title: "DataSet2" },
        { title: "DataSet3" },
        { title: "DataSet4" }
      ]
    };
  },
  methods: {
    gotoText() {
      alert("text");
    }
  }
};
</script>
<style lang="sass" scoped></style>
