<template>
  <v-content>
    <v-container fluid fill-height pa-0 ma-0>
      <v-layout column>
        <v-flex d-flex class="intro">
          <v-layout v-resize="onResize" row wrap>
            <v-flex xs12 d-flex class="myCarousel" align-start justfy-center>
              <v-carousel :height="carouselHeight">
                <v-carousel-item
                  v-for="(slide, i) in slides"
                  :key="i"
                  :src="slide.src"
                  reverse-transition="fade"
                  transition="fade"
                >
                  <v-sheet
                    height="100%"
                    tile
                    color="transparent"
                    class="display-3"
                  >
                    <v-layout align-start justify-start fill-height>
                      <div
                        class="pa-2"
                        style="width:100%; color:red; background-color:rgb(117,117,117,.5)"
                      >
                        {{ slide.title }}
                      </div>
                    </v-layout>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </v-flex>
            <v-flex xs12 d-flex class="bottomNav">
              <BottomNav :show="true"></BottomNav>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
import BottomNav from "@/components/BottomNav.vue";
// In your VueJS component.

// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
// import "vueperslides/dist/vueperslides.css";

export default {
  name: "Intro",
  components: {
    BottomNav
  },
  data() {
    return {
      slides: [
        {
          title: "first image",
          content: "1st content",
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          title: "second image",
          content: "2nd content",
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          title: "third image",
          content: "3rd content",
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      carouselHeight: 300
    };
  },
  computed: {},
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = this.carouselHeight = window.innerHeight - 64;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./node_modules/vue-cookieconsent-component/src/scss/_cookie-consent.scss";
@import "./node_modules/vue-cookieconsent-component/src/scss/_cookie-consent-bottom";
.textLabel {
  height: 56px;
}
.intro {
  height: 100%;
  background-color: #da7033;
  // flex: 1;
}
.myCarousel {
  background-color: blue;
  min-height: calc(100vh - 64px);
  width: 100%;
}
.bottomNav {
  background-color: red;
  // flex: 0 1 auto;
  width: 100%;
  height: 64px;
}
</style>
