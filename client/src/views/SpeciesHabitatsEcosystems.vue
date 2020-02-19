<template>
  <v-container fluid grid-list-lg fill-height>
    <v-layout column>
      <v-flex d-flex>
        <v-layout row wrap align-content-start justify-center>
          <v-flex v-show="!isshowpdf" d-flex-inline xs12 md10>
            <v-card height="300">
              <v-card-title primary-title>
                <div class="full">{{ cardText }}</div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex v-show="!isshowpdf" d-flex-inline xs12 md2>
            <v-img
              height="300"
              class="hoverImage"
              src="https://via.placeholder.com/120x90/0000FF/808080/?text=BookBanner"
              @click="showPdffun"
            />
          </v-flex>
          <v-flex d-flex xs12 md6>
            <pdfViewer
              :value="isshowpdf"
              :pdfurl="pdfurls"
              @closepdf="closepdf"
              @pdferr="pdferr"
            ></pdfViewer>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex d-flex>
        <v-layout column fill-height>
          <v-flex d-flex>
            <v-layout row wrap align-content-start fill-height>
              <v-flex v-if="hasInfo === 0 || hasInfo === 1" d-flex xs12 md4>
                <v-card>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  ></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      class="text-none"
                      @click="showInfoSpecies"
                    >
                      {{ $t(`pages[1].subpages[0].title`) }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex v-if="hasInfo === 0 || hasInfo === 2" d-flex xs12 md4>
                <v-card>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  ></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      class="text-none"
                      @click="showInfoHabitats"
                    >
                      {{ $t(`pages[1].subpages[1].title`) }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-flex>
              <v-flex v-if="hasInfo === 0 || hasInfo === 3" d-flex xs12 md4>
                <v-card>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  ></v-img>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      flat
                      color="primary"
                      class="text-none"
                      @click="showInfoEcosystems"
                    >
                      {{ $t(`pages[1].subpages[2].title`) }}</v-btn
                    >
                  </v-card-actions>
                </v-card></v-flex
              >

              <v-flex v-if="hasInfo > 0" d-flex xs12 md8>
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
                        <v-btn
                          flat
                          color="primary"
                          class="text-none"
                          @click="goBack"
                        >
                          {{ $t("comps.back").toUpperCase() }}</v-btn
                        >
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
</template>
<script>
import pdfViewer from "@/components/PdfViewer";

export default {
  name: "Specieshabitatsecosystems",
  components: { pdfViewer },
  data() {
    return {
      hasInfo: 0,
      info: "",
      cardText:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      showPDF: false,
      isshowpdf: false,
      pdfurls:
        "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
    };
  },
  computed: {
    someInfo() {
      return "Some Info";
    }
  },
  methods: {
    closepdf() {
      this.isshowpdf = false;
    },
    pdferr(errurl) {
      console.log(errurl);
    },
    showPdffun() {
      this.isshowpdf = true;
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
.cpdf {
  position: relative;
}
</style>
