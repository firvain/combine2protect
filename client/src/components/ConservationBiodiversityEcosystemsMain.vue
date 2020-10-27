<template>
  <v-layout row wrap align-start justify-center>
    <v-flex xs12>
      <v-card elevetion="6">
        <v-card-title class="headline primary--text">
          {{ $t(`pages[2].content[0].msg`) }}
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-container fluid grid-list-md
        ><v-layout wrow wrap align-center justify-center>
          <v-flex xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 0}`"
                height="100%"
                class="primary mx-auto"
                @click="$router.push('conservation')"
              >
                <v-card-title
                  primary-title
                  class="headline white--text text-xs-center"
                >
                  {{ $t("pages[2].subpages[0].title") }}
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 0}`"
                height="100%"
                class="primary lighten-3 mx-auto"
                @click="$router.push('biodiversity')"
              >
                <v-card-title
                  primary-title
                  class="headline white--text text-xs-center"
                >
                  {{ $t("pages[2].subpages[1].title") }}
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 0}`"
                height="100%"
                class="primary lighten-1 mx-auto"
                @click="$router.push('ecosystems')"
              >
                <v-card-title
                  primary-title
                  class="headline white--text text-xs-center"
                >
                  {{ $t("pages[2].subpages[2].title") }}
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 0}`"
                height="100%"
                class="primary darken-1 mx-auto"
                @click="$router.push('farming')"
              >
                <v-card-title
                  primary-title
                  class="headline white--text text-xs-center"
                >
                  {{ $t("pages[2].subpages[3].title") }}
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
          <v-flex xs12 md6>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 0}`"
                height="100%"
                class="primary lighten-3 mx-auto"
                @click="$router.push('ias')"
              >
                <v-card-title
                  primary-title
                  class="headline white--text text-xs-center"
                >
                  {{ $t("pages[2].subpages[4].title") }}
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout></v-container
      >
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: "ConservationBiodiversityEcosystems",
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
