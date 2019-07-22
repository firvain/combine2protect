<template>
  <v-container grid-list-lg fluid pa-0 fill-height>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex d-flex xs12>
        <v-card>
          <v-img
            :height="cardHeight"
            src="https://via.placeholder.com/600/?text=Branding Sheme Services"
          ></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="makeVisibleReports">Show more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex v-if="showReports" d-flex xs12>
        <v-layout row wrap pa-2>
          <v-flex d-flex xs12>
            <v-layout row wrap fill-height>
              <v-flex d-flex xs12 md8>
                <v-layout row wrap>
                  <v-flex xs12>
                    <div class="full">
                      {{ text }}
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      v-for="(link, idx) in links"
                      :key="idx"
                      color="primary"
                      :href="link.ref"
                      target="_blank"
                      flat
                      >{{ link.name }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d- flex xs12 md4>
                <v-card>
                  <v-img
                    src="https://via.placeholder.com/240x180/0000FF/808080/?text=BannerGreenCheck"
                    class="hoverImage"
                    @click="$router.push('/quiz')"
                  />
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "BSS",
  data() {
    return {
      showReports: false,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor morbi non arcu risus. Etiam tempor orci eu lobortis elementum nibh tellus. Amet nulla facilisi morbi tempus iaculis urna id volutpat. Quam adipiscing vitae proin sagittis nisl. Amet volutpat consequat mauris nunc congue nisi vitae. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Ligula ullamcorper malesuada proin libero nunc consequat. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Congue eu consequat ac felis. Amet facilisis magna etiam tempor orci eu. Et netus et malesuada fames ac. Euismod lacinia at quis risus sed vulputate odio ut enim. In cursus turpis massa tincidunt dui ut ornare lectus. A pellentesque sit amet porttitor eget dolor. Senectus et netus et malesuada fames. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Sed elementum tempus egestas sed sed. Mauris pharetra et ultrices neque ornare aenean euismod. Consequat interdum varius sit amet mattis vulputate. Cursus turpis massa tincidunt dui. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget. Scelerisque in dictum non consectetur a erat nam. Pharetra pharetra massa massa ultricies mi. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Morbi blandit cursus risus at. Id faucibus nisl tincidunt eget. Mi quis hendrerit dolor magna. Eget arcu dictum varius duis. Aliquam eleifend mi in nulla. Cursus turpis massa tincidunt dui ut ornare lectus sit amet. Vitae tempus quam pellentesque nec nam aliquam. Placerat duis ultricies lacus sed turpis tincidunt. Condimentum mattis pellentesque id nibh. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Viverra suspendisse potenti nullam ac tortor vitae. Mattis nunc sed blandit libero volutpat sed cras ornare. Malesuada fames ac turpis egestas. Et ultrices neque ornare aenean euismod elementum nisi. Egestas sed sed risus pretium quam vulputate. Eget nunc scelerisque viverra mauris. Nisi vitae suscipit tellus mauris. Sagittis nisl rhoncus mattis rhoncus urna neque viverra. A diam sollicitudin tempor id eu nisl nunc. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Felis bibendum ut tristique et egestas quis ipsum. Magna eget est lorem ipsum dolor sit amet. Feugiat pretium nibh ipsum consequat nisl vel. Faucibus pulvinar elementum integer enim neque volutpat ac. Sit amet dictum sit amet justo donec enim diam.`,
      links: [
        {
          name: "A Link",
          ref:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          name: "A Link",
          ref:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          name: "A Link",
          ref:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          name: "A Link",
          ref:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          name: "A Link",
          ref:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        }
      ]
    };
  },
  computed: {
    cardHeight() {
      return window.innerHeight - 250;
    }
  },
  methods: {
    makeVisibleReports() {
      this.showReports = true;
      this.$vuetify.goTo(window.innerHeight);
    }
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
.hoverImage {
  cursor: pointer;
}
</style>
