<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap align-start justify-start>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[0].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[0].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[1].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[1].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[2].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[2].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[3].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[3].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[4].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[4].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[5].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[5].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card height="100%" class="mx-auto" elevation-1>
          <v-card-title
            primary-title
            class="primary--text font-weight-medium font-italic title text--lighten-1"
          >
            {{ $t(`pages[3].subpages[0].content[6].title`) }}
          </v-card-title>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[3].subpages[0].content[6].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              class="full"
              :max-chars="1200"
            >
            </read-more>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "TransBorder",
  components: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
