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
      <v-btn
        flat
        small
        v-for="page in pages"
        :key="page.title"
        :to="page.route"
      >
        {{ page.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  name: "toolbar",
  props: {
    pages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="sass" scoped></style>
