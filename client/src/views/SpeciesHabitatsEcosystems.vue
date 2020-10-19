<template>
  <v-container fluid grid-list-lg fill-height>
    <v-layout row wrap justify-center>
      <v-flex v-show="!isshowpdf" xs12 md10>
        <v-card>
          <v-card-title primary-title>
            <div class="full">{{ $t(`pages[1].content[0].msg`) }}</div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex v-show="!isshowpdf" xs12 md2>
        <v-img
          class="hoverImage"
          contain
          src="https://via.placeholder.com/640x480/0000FF/808080/?text=BookBanner"
          @click="showPdffun"
        />
      </v-flex>
      <v-flex v-show="isshowpdf" xs12 md6 pa-0>
        <pdfViewer
          :value="isshowpdf"
          :pdfurl="pdfurls"
          @closepdf="closepdf"
          @pdferr="pdferr"
        ></pdfViewer>
      </v-flex>

      <v-flex
        v-if="(hasInfo === 0 || hasInfo === 1) && !isshowpdf"
        xs12
        md4
        d-flex
      >
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
      <v-flex
        v-if="(hasInfo === 0 || hasInfo === 2) && !isshowpdf"
        xs12
        md4
        d-flex
      >
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
      <v-flex
        v-if="(hasInfo === 0 || hasInfo === 3) && !isshowpdf"
        xs12
        md4
        d-flex
      >
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

      <v-flex v-if="hasInfo > 0" xs12 md8>
        <v-card height="100%">
          <v-card-text style="height:80%">
            {{ info }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" class="text-none" @click="goBack">
              {{ $t("comps.back").toUpperCase() }}</v-btn
            >
          </v-card-actions>
        </v-card>
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
