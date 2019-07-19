<template>
  <v-content>
    <v-container fluid fill-height pa-0 ma-0>
      <v-layout column>
        <v-flex d-flex class="webgis">
          <v-layout row wrap>
            <v-flex
              xs3
              d-flex
              class="layerstree"
              align-center
              justify-center
              white--text
            >
              layerstree
            </v-flex>
            <v-flex xs9 d-flex class="mapview">
              <v-layout
                align-center
                justify-center
                column
                fill-height
                align-items-start
                pt-1
                pl-1
                pr-1
                pb-0
              >
                <v-flex
                  d-flex
                  class="maptools"
                  align-center
                  justify-center
                  white--text
                  pa-1
                >
                  <MapTools></MapTools>
                </v-flex>
                <v-flex
                  d-flex
                  class="vuemap"
                  align-center
                  justify-center
                  white--text
                >
                  <VueMap
                    :baseLayers="baseLayers"
                    :vectorLayers="vectorLayers"
                    :utilityLayers="utilityLayers"
                    :mapStatus="mapStatus"
                    :drawType="drawType"
                    :measureType="measureType"
                    @export:pdf="exportPDF"
                  ></VueMap>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import MapTools from "@/components/WebGISMaptools.vue";
import VueMap from "@/components/WebGisVueMap.vue";
import { loadingBBox } from "vuelayers/lib/ol-ext";
import { loaderFactory } from "../services/api.js";
import * as jsPDF from "jspdf";
export default {
  name: "webGIS",
  components: {
    MapTools,
    VueMap
  },
  data() {
    return {
      baseLayers: [
        {
          id: 100,
          name: "osm",
          title: "OpenStreetMap",
          visible: true,
          crossOrigin: "anonymous",
          preload: Infinity
        },
        {
          id: 100,
          name: "bingmaps",
          title: "Bing Maps",
          apiKey:
            "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
          imagerySet: "AerialWithLabelsOnDemand",
          visible: false,
          crossOrigin: "anonymous",
          preload: Infinity
        }
      ],
      vectorLayers: [
        {
          id: 201,
          title: "Bird Directive Sites [EN]",
          cmp: "vl-layer-vector",
          visible: true,
          renderMode: "image",
          source: {
            cmp: "vl-source-vector",
            features: [],
            url(extent, resolution, projection) {
              return (
                "https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer/7/query?" +
                "&geometryType=esriGeometryEnvelope" +
                "&geometry=" +
                extent.join(",") +
                "&spatialRel=esriSpatialRelEnvelopeIntersects" +
                "&inSR=" +
                projection.split(":")[1] +
                "&outFields=*&f=geojson"
              );
            },
            strategyFactory() {
              return loadingBBox;
            }
          },
          style: [
            {
              cmp: "vl-style-box",
              styles: {
                "vl-style-fill": {
                  color: [255, 255, 255, 0.5]
                },
                "vl-style-stroke": {
                  color: "#8f209b",
                  width: 2
                }
              }
            }
          ]
        },
        {
          id: 202,
          title: "Bird Directive Sites [EN]",
          cmp: "vl-layer-vector",
          visible: true,
          renderMode: "image",
          source: {
            cmp: "vl-source-vector",
            features: [],
            url() {},
            strategyFactory() {
              return loadingBBox;
            },
            loaderFactory
          },
          style: [
            {
              cmp: "vl-style-box",
              styles: {
                "vl-style-fill": {
                  color: [255, 255, 255, 0.5]
                },
                "vl-style-stroke": {
                  color: "#219e46",
                  width: 2
                }
              }
            }
          ]
        }
      ],
      utilityLayers: [
        {
          id: 1000,
          target: "draw-target",
          ref: "draw",
          title: "Draw",
          cmp: "vl-layer-vector",
          visible: true,
          source: {
            cmp: "vl-source-vector"
          }
        }
      ],
      pdfOptions: {
        fontSize: 6,
        textColor: "#FFFFFF",
        fillCollor: "#3f51b5",
        text: "powered by Terrarum"
      },
      date: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minute: null
      }
    };
  },
  computed: {
    ...mapGetters("webgis", ["mapStatus", "drawType", "measureType"]),
    currentDate: {
      get() {
        return this.date;
      },
      set(date) {
        this.date = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          minutes: date.getMinutes()
        };
      }
    }
  },
  methods: {
    ...mapActions("webgis", ["updateMapStatus"]),
    async exportPDF(data) {
      const myPromise = new Promise((resolve, reject) => {
        if (data) resolve(data);
        reject();
      });

      try {
        const { data } = await myPromise;
        const pdf = new jsPDF("landscape", "mm", "a4");
        pdf.addImage(data, "JPEG", 0, 0, 297, 210);
        pdf.setFontSize(this.pdfOptions.fontSize);
        pdf.setFillColor(this.pdfOptions.fillCollor);
        pdf.rect(0, 0, 25, 6, "F");
        pdf.setTextColor(this.pdfOptions.textColor);
        pdf.text(this.pdfOptions.text, 2, 4);
        this.currentDate = new Date();
        const { year, month, day, hour, minutes } = this.date;
        await pdf.save(
          `export_${year}-${month}-${day}_${hour}\u02D0${minutes}.pdf`,
          {
            returnPromise: true
          }
        );
        this.updateMapStatus("display");
      } catch (error) {
        console.log(error);
        this.updateMapStatus("display");
      }
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.webgis {
  min-height: calc(100vh - 165px);
  background-color: #da7033;
}
.layerstree {
  background-color: red;
  flex: 1;
}
.mapview {
  background-color: green;
  flex: 1 1 auto;
  .maptools {
    background-color: blue;
    min-height: 56px;
    flex: 0 1 auto;
    width: 100%;
  }
  .vuemap {
    background-color: cyan;
    flex: 1;
    width: 100%;
  }
}
</style>
