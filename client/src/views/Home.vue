<template>
  <div>
    <v-navigation-drawer value="true" fixed app clipped stateless width="400">
      <v-list class="pt-0">
        <v-list-group prepend-icon="mdi-home" value="true" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Home</v-list-tile-title></v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(subPage, i) in subPages"
            :key="i"
            :to="subPage.route"
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="subPage.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile href="#">
          <v-list-tile-content>
            <v-list-tile-title>Project Information</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile href="#objectives">
          <v-list-tile-content>
            <v-list-tile-title>Objectives</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile href="#partnership">
          <v-list-tile-content>
            <v-list-tile-title>Partnership</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap align-start justify-center fill-height>
          <v-flex xs10>
            <v-flex xs12 class="text-xs-center" id="projectInfo">
              <div class="headline font-weight-medium">Project Information</div>
            </v-flex>
            <v-flex xs12 class="full">
              <read-more
                more-str="read more"
                :text="msg"
                link="#"
                less-str="read less"
                :max-chars="400"
              ></read-more>
            </v-flex>

            <v-flex xs12 class="text-xs-center full" id="objectives">
              <div class="headline font-weight-medium">Objectives</div></v-flex
            >
            <v-flex xs12 class="full">
              <read-more
                more-str="read more"
                :text="msg"
                link="#"
                less-str="read less"
                :max-chars="400"
              ></read-more>
            </v-flex>
            <v-flex xs12 class="text-xs-center full" id="partnership">
              <div class="headline font-weight-medium">Partnership</div></v-flex
            >
            <v-flex xs12 class="full">
              <read-more
                more-str="read more"
                :text="msg"
                link="#"
                less-str="read less"
                :max-chars="200"
              ></read-more>
            </v-flex>
          </v-flex>
          <v-flex xs2>
            <HomeBanners></HomeBanners>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import HomeBanners from "@/components/HomeBanners.vue";
export default {
  name: "Home",
  components: {
    HomeBanners
  },
  props: {
    pages: { type: Array, required: true }
  },
  data() {
    return {
      msg:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet mauris commodo quis imperdiet massa tincidunt. Nisi quis eleifend quam adipiscing vitae. Ut placerat orci nulla pellentesque dignissim enim. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. Habitant morbi tristique senectus et netus. Vulputate ut pharetra sit amet aliquam. Sed egestas egestas fringilla phasellus faucibus scelerisque. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Integer feugiat scelerisque varius morbi enim nunc. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. A iaculis at erat pellentesque adipiscing commodo elit at. Nibh nisl condimentum id venenatis. Morbi quis commodo odio aenean sed adipiscing diam. Donec ac odio tempor orci. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit.Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Id aliquet risus feugiat in ante metus dictum at tempor. Phasellus vestibulum lorem sed risus. Arcu ac tortor dignissim convallis aenean et tortor at risus. Eget mauris pharetra et ultrices. Proin sed libero enim sed faucibus turpis. Neque volutpat ac tincidunt vitae semper. Duis at consectetur lorem donec massa sapien faucibus et. Diam vulputate ut pharetra sit amet aliquam id. Aliquam eleifend mi in nulla. Viverra nam libero justo laoreet sit amet cursus sit. Sit amet massa vitae tortor condimentum lacinia. Suspendisse potenti nullam ac tortor vitae purus faucibus. Arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales. Nulla posuere sollicitudin aliquam ultrices. Lacus vel facilisis volutpat est velit egestas dui. Nibh nisl condimentum id venenatis. Cursus euismod quis viverra nibh cras pulvinar. Amet nisl suscipit adipiscing bibendum est ultricies integer. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque.Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Sagittis nisl rhoncus mattis rhoncus urna neque. Placerat in egestas erat imperdiet sed euismod nisi. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Vitae et leo duis ut diam. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Consequat semper viverra nam libero justo laoreet sit. Sit amet commodo nulla facilisi nullam vehicula ipsum a arcu. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Mauris vitae ultricies leo integer malesuada nunc vel risus. Euismod in pellentesque massa placerat duis ultricies. Mauris sit amet massa vitae tortor. Potenti nullam ac tortor vitae purus faucibus. Ut ornare lectus sit amet est placerat. Iaculis eu non diam phasellus vestibulum lorem sed risus. Dui ut ornare lectus sit amet est placerat in.",
      msg2: "Lorem ipsum dolor sit amet"
    };
  },
  computed: {
    subPages() {
      return this.pages.slice(1);
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
