<template>
  <v-toolbar color="primary" dark fixed clipped-left app>
    <img
      src="https://via.placeholder.com/160x60"
      width="160"
      height="60"
      alt="COMBINE2PROTECT logo"
    />
    <v-toolbar-title>COMBINE2PROTECT</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat v-for="page in pages" :key="page.title" :to="page.route">
        {{ page.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  name: "toolbar",
  props: {},
  data() {
    return {
      pages: [
        { title: "Home", route: "home" },
        { title: "Species Habitats Ecosystems", route: "specieshabitals" },
        {
          title: "Conservation Biodiversity Ecosystems",
          route: "consvbio"
        },
        { title: "Protection and Monitoring", route: "promon" },
        { title: "Gis Platform", route: "webgis" },
        { title: "Branding and Awards", route: "branding" },
        { title: "Capacity Building", route: "capacity" },
        { title: "News", route: "news" }
      ]
    };
  }
};
</script>
<style lang="sass" scoped></style>
