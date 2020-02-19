<template>
  <v-layout row wrap align-start justify-center>
    <v-flex xs12>
      <v-card elevetion="0">
        <v-card-title primary-title>
          <div class="full">{{ $t(`pages[2].content[0].msg`) }}</div>
        </v-card-title>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-container fluid grid-list-md
        ><v-layout wrow wrap align-start justify-center fill-height>
          <v-flex xs12 md4>
            <v-card height="300px">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                height="250px"
              ></v-img>
              <v-card-actions d-flex style="justify-content: center;">
                <v-btn
                  color="primary"
                  flat
                  to="/conservation"
                  class="text-none"
                  >{{ $t("pages[2].subpages[0].title") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card height="300">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                height="250px"
              ></v-img>
              <v-card-actions d-flex style="justify-content: center;">
                <v-btn
                  color="primary"
                  flat
                  to="/biodiversity"
                  class="text-none"
                >
                  {{ $t("pages[2].subpages[1].title") }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                height="250px"
              ></v-img>
              <v-card-actions d-flex style="justify-content: center;">
                <v-btn color="primary" flat to="/ecosystems" class="text-none">
                  {{ $t("pages[2].subpages[2].title") }}</v-btn
                >
              </v-card-actions>
            </v-card>
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
