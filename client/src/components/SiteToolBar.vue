<template>
  <v-toolbar color="primary" dark fixed clipped-left app>
    <img
      src="https://via.placeholder.com/160x40"
      width="160"
      height="40"
      alt="COMBINE2PROTECT logo"
    />
    <v-toolbar-title @click="$router.push('/')" class="hoverTitle"
      >COMBINE2PROTECT</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <div class="search">
      <v-text-field
        hide-details
        v-model="search"
        append-icon="mdi-magnify"
        placeholder="Search for WHAT??????"
      >
      </v-text-field>
    </div>
    <template v-slot:extension>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat small :to="pages[0].route">
          {{ $t("pages[0].title") }}
        </v-btn>
        <v-btn flat small :to="pages[1].route">
          {{ $t("pages[1].title") }}
        </v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn small flat v-on="on" :to="pages[2].route">
              {{ $t("pages[2].title") }}
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, index) in pages[2].subpages"
              :key="index"
              :to="item.route"
            >
              <v-list-tile-title>
                {{ $t(`pages[2].subpages[${index}].title`) }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat small :to="pages[3].route">
          {{ $t("pages[3].title") }}
        </v-btn>
        <v-btn flat small :to="pages[4].route">
          {{ $t("pages[4].title") }}
        </v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn small flat v-on="on" :to="pages[5].route">
              {{ $t("pages[5].title") }}
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, index) in pages[5].subpages"
              :key="index"
              :to="item.route"
            >
              <v-list-tile-title>
                {{ $t(`pages[5].subpages[${index}].title`) }}</v-list-tile-title
              >
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-btn flat small :to="pages[6].route">
          {{ $t("pages[6].title") }}
        </v-btn>
        <v-btn flat small :to="pages[7].route">
          {{ $t("pages[7].title") }}
        </v-btn>
        <v-menu open-on-hover offset-y full-width>
          <template v-slot:activator="{ on }">
            <v-btn fab small flat v-on="on">
              <flag :iso="activeLocale" :squared="false" />
            </v-btn>
          </template>

          <v-list dense nav>
            <v-list-tile v-for="lang in langs" :key="lang.iso" href="#">
              <v-list-tile-action @click="changeLocal(lang.iso)">
                <flag :iso="lang.iso" :title="lang.title" :squared="false" />
              </v-list-tile-action>
              <v-list-tile-title>{{
                lang.iso.toUpperCase()
              }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
    </template>
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
    return {
      langs: [
        { iso: "gb", title: "English" },
        { iso: "gr", title: "Ελληνικά" },
        { iso: "mk", title: "македонски јазик" }
      ],
      search: null
    };
  },
  computed: {
    activeLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    changeLocal(e) {
      this.$i18n.locale = e;
    }
  }
};
</script>
<style lang="scss" scoped>
.hoverTitle {
  cursor: pointer;
}
.search {
  width: 200px;
}
</style>
