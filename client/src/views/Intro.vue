<template>
  <v-content>
    <v-container fluid fill-height pa-0 ma-0>
      <v-layout column>
        <v-flex d-flex class="intro">
          <v-layout v-resize="onResize" row wrap>
            <v-flex xs12 d-flex class="myCarousel" align-start justfy-center>
              <v-carousel
                hide-delimiters
                hide-controls
                :height="carouselHeight"
              >
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
                    <v-layout align-end justify-start fill-height>
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
      <!-- <v-flex xs12 class="mycarousel">
          <v-carousel height="700" hide-delimiters>
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
              :src="slide.src"
              reverse-transition="fade"
              transition="fade"
            ></v-carousel-item> </v-carousel
        ></v-flex>
        <v-flex xs12 class="textLabel secondary white--text" pl-4>
          <div style="display:flex;align-items:center;height:100%;">
            <span>Text Content</span>
          </div>
        </v-flex>
        <v-flex xs12><BottomNav :show="true"></BottomNav> </v-flex
      ></v-layout> -->
    </v-container>
  </v-content>
</template>
<script>
import BottomNav from "@/components/BottomNav.vue";
// In your VueJS component.

// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
import "vueperslides/dist/vueperslides.css";
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
/* .vueperslide__content-wrapper--outside-top {
  transition: 0.3s ease-in-out;
  opacity: 1;
  transform: scale(1);
}

.vueperslides--animated .vueperslide__content-wrapper--outside-top {
  transition: 0.15s ease-in-out;
  opacity: 0;
  transform: scale(0);
} */
</style>
