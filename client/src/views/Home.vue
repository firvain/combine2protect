<template>
  <div>
    <v-navigation-drawer
      :value="this.$vuetify.breakpoint.lgAndUp"
      fixed
      app
      clipped
      stateless
      width="400"
    >
      <v-list class="pt-0">
        <v-list-group prepend-icon="mdi-home" value="true" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{
                  $t("pages[0].title").toUpperCase()
                }}</v-list-tile-title></v-list-tile-content
              >
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(subPage, i) in subPages"
            :key="i"
            :to="subPage.route"
          >
            <v-list-tile-content>
              <v-list-tile-title>
                {{ $t(`pages[${i + 1}].title`) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile href="#">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t(`pages[0].content[0].title`) }}</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile href="#objectives">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t(`pages[0].content[1].title`) }}</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile href="#partnership">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ $t(`pages[0].content[2].title`) }}</v-list-tile-title
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid grid-list-lg fill-height>
      <v-layout row wrap align-start justify-center fill-height>
        <v-flex d-flex xs12 md10>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card id="partnership" flat>
                <v-card-title primary-title class="justify-center">
                  <div class="headline font-weight-medium">
                    {{ $t(`pages[0].content[0].title`) }}
                  </div>
                </v-card-title>
                <v-card-text class="full">
                  <read-more
                    :more-str="$t(`comps.readmore.more`)"
                    :text="$t(`pages[0].content[0].msg`)"
                    link="#"
                    :less-str="$t('comps.readmore.less')"
                    :max-chars="maxChars"
                  ></read-more>
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex xs12>
              <v-card id="partnership" flat>
                <v-card-title primary-title class="justify-center">
                  <div class="headline font-weight-medium">
                    {{ $t(`pages[0].content[1].title`) }}
                  </div>
                </v-card-title>
                <v-card-text class="full">
                  <read-more
                    :more-str="$t(`comps.readmore.more`)"
                    :text="$t(`pages[0].content[0].msg`)"
                    link="#"
                    :less-str="$t('comps.readmore.less')"
                    :max-chars="maxChars"
                  ></read-more>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12>
              <v-card id="partnership" flat>
                <v-card-title primary-title class="justify-center">
                  <div class="headline font-weight-medium">
                    {{ $t(`pages[0].content[2].title`) }}
                  </div>
                </v-card-title>
                <v-card-text class="full">
                  <read-more
                    :more-str="$t(`comps.readmore.more`)"
                    :text="$t(`pages[0].content[2].msg`)"
                    link="#"
                    :less-str="$t('comps.readmore.less')"
                    :max-chars="maxChars"
                  ></read-more>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 md2>
          <HomeBanners></HomeBanners>
        </v-flex>
      </v-layout>
    </v-container>
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
      maxChars: 400
    };
  },
  computed: {
    subPages() {
      return this.pages.slice(1);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
