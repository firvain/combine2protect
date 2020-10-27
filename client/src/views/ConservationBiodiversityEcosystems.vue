<template>
  <v-container>
    <v-navigation-drawer
      fixed
      app
      clipped
      stateless
      width="400"
      :value="showNav"
    >
      <v-list class="pt-0">
        <v-list-group value="true" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                {{ $t("pages[2].content[0].title") }}</v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(subpage, i) in subPages"
            :key="i"
            two-line
            class="my-tile"
            :to="subpage.route"
          >
            <v-list-tile-content>
              {{ $t(`pages[2].subpages[${i}].title`) }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <div>
      <router-view></router-view>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "ConservationBiodiversity",
  components: {},
  props: {
    pages: { type: Array, required: true }
  },
  data() {
    return {};
  },
  computed: {
    showNav() {
      if (this.$vuetify.breakpoint.mdAndUp && this.$route.path !== "/consvbio")
        return false;
      if (this.$vuetify.breakpoint.mdAndDown) return false;
      return true;
    },
    subPages() {
      return this.pages[2].subpages;
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .v-list__group__items--no-action .v-list__tile {
  padding-left: 2em;
}
</style>
