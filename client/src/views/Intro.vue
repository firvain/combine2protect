<template>
  <v-content>
    <v-container fluid pa-0>
      <v-layout row wrap justify-center align-center fill-height pa-0>
        <v-flex xs12 class="mycarousel">
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
      ></v-layout>
    </v-container>
  </v-content>
</template>
<script>
import BottomNav from "@/components/BottomNav.vue";
// In your VueJS component.

// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
import "vueperslides/dist/vueperslides.css";
export default {
  name: "Home",
  components: {
    BottomNav
  },
  data() {
    return {
      slides: [
        {
          title: "first image",
          content: "1st content",
          src: "https://via.placeholder.com/1920x1024/FF0000.png"
        },
        {
          title: "second image",
          content: "2nd content",
          src: "https://via.placeholder.com/1920x1024/008000.png"
        },
        {
          title: "third image",
          content: "3rd content",
          src: "https://via.placeholder.com/1920x1024.png"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.textLabel {
  height: 56px;
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
