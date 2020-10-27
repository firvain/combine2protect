<template>
  <v-container grid-list-lg fill-height pa-0>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" flat>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[2].subpages[0].content[0].title`) }}
          </v-card-title>
          <v-card-text
            class="full"
            v-html="$t(`pages[2].subpages[0].content[0].msg`)"
          >
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" flat>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[2].subpages[0].content[1].title`) }}
          </v-card-title>
          <v-card-text
            class="full"
            v-html="$t(`pages[2].subpages[0].content[1].msg`)"
          >
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" flat>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[2].subpages[0].content[2].title`) }}
          </v-card-title>
          <v-card-text
            class="full"
            v-html="$t(`pages[2].subpages[0].content[2].msg`)"
          >
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" flat>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[2].subpages[0].content[3].title`) }}
          </v-card-title>
          <v-card-text
            class="full"
            v-html="$t(`pages[2].subpages[0].content[3].msg`)"
          >
          </v-card-text>
          <v-card-title secondary-title class="primary--text text--lighten-2">
            {{ $t(`pages[2].subpages[0].content[3].title`) }}
          </v-card-title>
          <v-card-text
            class="full"
            v-html="$t(`pages[2].subpages[0].content[3].tableMsg`)"
          >
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Conservation",
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
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Report 2",
          summary: `pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam`,
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Report 3",
          summary: `pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam`,
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
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
</style>
