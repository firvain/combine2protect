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
                  $t("pages[5].title").toUpperCase()
                }}</v-list-tile-title></v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(subPage, i) in subPages"
            :key="i"
            :to="subPage.route"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{
                $t(`pages[5].subpages[${i}].title`)
              }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "BrandingAndAwards",
  components: {},
  props: {
    pages: { type: Array, required: true }
  },
  data() {
    return {};
  },
  computed: {
    showNav() {
      if (this.$vuetify.breakpoint.mdAndUp && this.$route.path !== "/branding")
        return false;
      if (this.$vuetify.breakpoint.mdAndDown) return false;
      return true;
    },
    subPages() {
      return this.pages[5].subpages;
    }
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
