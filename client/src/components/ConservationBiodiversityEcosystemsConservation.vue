<template>
  <v-container grid-list-xl>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12>
        <v-card>
          <v-img
            :height="cardHeight"
            src="https://via.placeholder.com/600/?text=Wetland"
          ></v-img>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="makeVisibleReports">Show more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex
        v-show="showReports"
        xs12
        v-for="report in reports"
        :key="report.title"
      >
        <v-container grid-list-md>
          <v-layout row wrap justify-start align-center>
            <v-flex xs12 class="text-xs-center">
              <div class="title font-weight-medium">
                {{ report.title }}
              </div>
            </v-flex>
            <v-flex xs8 v-if="report.summary">
              <read-more
                more-str="read more"
                :text="report.summary"
                link="#"
                less-str="read less"
                :max-chars="200"
              ></read-more>
            </v-flex>
            <v-flex xs2 v-if="report.image">
              <v-img :src="report.image" contain> </v-img>
            </v-flex>
            <v-flex xs2 v-if="report.link" class="text-xs-center">
              <v-btn color="primary" :href="report.link" target="_blank"
                >Link</v-btn
              >
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "conservation",
  data() {
    return {
      showReports: false,
      reports: [
        {
          title: "Report 1",
          summary: `pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam`,
          image:
            "https://via.placeholder.com/200/0000FF/808080/?text=Report Image",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Report 2",
          summary: `pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam`,
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Report 3",
          summary: `pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam`,
          link:
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
