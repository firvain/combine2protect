<template>
  <v-toolbar color="primary" dark fixed clipped-left app>
    <img
      src="https://via.placeholder.com/160x60"
      width="160"
      height="60"
      alt="COMBINE2PROTECT logo"
    />
    <v-toolbar-title @click="$router.push('/')" class="hoverTitle"
      >COMBINE2PROTECT</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat small :to="pages[0].route">
        {{ pages[0].title }}
      </v-btn>
      <v-btn flat small :to="pages[1].route">
        {{ pages[1].title }}
      </v-btn>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small flat v-on="on" :to="pages[2].route">
            {{ pages[2].title }}
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="(item, index) in pages[2].subpages"
            :key="index"
            :to="item.route"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat small :to="pages[3].route">
        {{ pages[3].title }}
      </v-btn>
      <v-btn flat small :to="pages[4].route">
        {{ pages[4].title }}
      </v-btn>
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn small flat v-on="on" :to="pages[5].route">
            {{ pages[5].title }}
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="(item, index) in pages[5].subpages"
            :key="index"
            :to="item.route"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat small :to="pages[6].route">
        {{ pages[6].title }}
      </v-btn>
      <v-btn flat small :to="pages[7].route">
        {{ pages[7].title }}
      </v-btn>
      <!-- <v-btn
        flat
        small
        v-for="page in pages"
        :key="page.title"
        :to="page.route"
      >
        {{ page.title }}
      </v-btn> -->
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
<style lang="scss" scoped>
.hoverTitle {
  cursor: pointer;
}
</style>
