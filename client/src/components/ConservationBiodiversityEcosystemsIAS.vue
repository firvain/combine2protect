<template>
  <v-layout row wrap align-center justify-center fill-height>
    <v-flex xs12>
      <v-card height="100%" class="mx-auto" flat>
        <v-card-text
          class="full"
          v-html="$t(`pages[2].subpages[4].content[0].msg`)"
        >
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "IAS",
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
