<template>
  <div>
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
                <v-list-tile-title>{{
                  $t("pages[2].title")
                }}</v-list-tile-title></v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(subpage, i) in subPages"
            :key="i"
            :to="subpage.route"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{
                $t(`pages[2].subpages[${i}].title`)
              }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
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
<style lang="scss" scoped></style>
