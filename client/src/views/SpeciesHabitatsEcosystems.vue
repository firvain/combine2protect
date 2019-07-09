<template>
  <v-content>
    <v-container fluid grid-list-lg fill-height>
      <v-layout column>
        <v-flex>
          <v-layout row wrap align-content-start>
            <v-flex d-flex xs12 md10>
              <v-card height="300">
                <v-card-title primary-title>
                  <div class="full">{{ cardText }}</div>
                </v-card-title>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 md2>
              <v-img
                height="300"
                class="hoverImage"
                src="https://via.placeholder.com/120x90/0000FF/808080/?text=BookBanner"
                @click="showPdfReader"
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex>
          <v-layout column fill-height>
            <v-flex>
              <v-layout row wrap align-content-start fill-height>
                <v-flex d-flex xs12 md4 v-if="hasInfo === 0 || hasInfo === 1">
                  <v-card>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    ></v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent" flat @click="showInfoSpecies"
                        >Species</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12 md4 v-if="hasInfo === 0 || hasInfo === 2">
                  <v-card>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    ></v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent" flat @click="showInfoHabitats"
                        >Habitats</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12 md4 v-if="hasInfo === 0 || hasInfo === 3">
                  <v-card>
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    ></v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="accent" flat @click="showInfoEcosystems"
                        >Ecosystems</v-btn
                      >
                    </v-card-actions>
                  </v-card></v-flex
                >

                <v-flex d-flex xs12 md8 v-if="hasInfo > 0">
                  <v-card>
                    <v-layout column fill-height pa-0>
                      <v-flex d-flex>
                        <v-card-text>
                          {{ info }}
                        </v-card-text>
                      </v-flex>
                      <v-flex d-flex align-end>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat @click="goBack">Back</v-btn>
                        </v-card-actions>
                      </v-flex></v-layout
                    >
                  </v-card>
                </v-flex></v-layout
              >
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
export default {
  name: "habitats",
  components: {},
  data() {
    return {
      hasInfo: 0,
      info: "",
      cardText:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  },
  computed: {
    someInfo() {
      return "Some Info";
    }
  },
  methods: {
    showPdfReader() {
      console.log("showPdfReader");
    },
    showInfoSpecies() {
      this.hasInfo = 1;
      this.info = "Species Info";
    },
    showInfoHabitats() {
      this.hasInfo = 2;
      this.info = "Habitats Info";
    },
    showInfoEcosystems() {
      this.hasInfo = 3;
      this.info = "Ecosystems Info";
    },
    goBack() {
      this.hasInfo = 0;
      this.info = "";
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
