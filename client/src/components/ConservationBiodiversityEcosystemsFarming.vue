<template>
  <v-layout row wrap align-center justify-center fill-height>
    <v-flex xs12>
      <v-card height="100%" class="mx-auto" flat>
        <v-card-title
          primary-title
          class="primary--text font-weight-medium font-italic title text--lighten-1"
        >
          {{ $t(`pages[2].subpages[3].content[0].title`) }}
        </v-card-title>
        <v-card-text
          class="full"
          v-html="$t(`pages[2].subpages[3].content[0].msg`)"
        >
        </v-card-text>
        <v-card-title
          primary-title
          class="primary--text font-weight-medium font-italic title text--lighten-1"
        >
          {{ $t(`pages[2].subpages[3].content[1].title`) }}
        </v-card-title>
        <v-card-text
          class="full"
          v-html="$t(`pages[2].subpages[3].content[1].msg`)"
        >
        </v-card-text>
        <v-card-title
          primary-title
          class="primary--text font-weight-medium font-italic title text--lighten-1"
        >
          {{ $t(`pages[2].subpages[3].content[2].title`) }}
        </v-card-title>
        <v-card-text
          class="full"
          v-html="$t(`pages[2].subpages[3].content[2].msg`)"
        >
        </v-card-text>
        <v-card-title
          primary-title
          class="primary--text font-weight-medium font-italic title text--lighten-1"
        >
          {{ $t(`pages[2].subpages[3].content[3].title`) }}
        </v-card-title>
        <v-card-text
          class="full"
          v-html="$t(`pages[2].subpages[3].content[3].msg`)"
        >
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "Framing",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
