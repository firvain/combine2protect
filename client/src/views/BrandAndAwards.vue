<template>
  <div>
    <SiteToolBar></SiteToolBar>
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
                <v-list-tile-title
                  >Branding and Awards</v-list-tile-title
                ></v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile v-for="(page, i) in pages" :key="i" :to="page.route">
            <v-list-tile-content>
              <v-list-tile-title v-text="page.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
    <TheFooter> </TheFooter>
  </div>
</template>
<script>
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "BrandingAndAwards",
  components: {
    SiteToolBar,
    TheFooter
  },
  data() {
    return {
      pages: [
        { title: "Branding Sheme Products", route: "bsp" },
        {
          title: "Branding Sheme Services",
          route: "bss"
        },
        { title: "Destination of Exellence Award", route: "dea" },
        { title: "The Green Network", route: "tgn" }
      ]
    };
  },
  computed: {
    showNav() {
      if (this.$route.path !== "/branding") return false;
      return true;
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
