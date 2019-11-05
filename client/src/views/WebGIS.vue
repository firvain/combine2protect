<template>
  <v-content>
    <v-container fluid fill-height pa-0 ma-0>
      <v-layout column>
        <v-flex d-flex class="webgis">
          <v-layout row wrap>
            <v-flex
              xs3
              d-flex
              class="layerstreeWrapper"
              align-start
              justify-center
              pa-1
            >
              <LayersTree
                :base-layers="baseLayers"
                :vector-layers="vectorLayers"
                @change:visible="setVisibility"
                @change:moveUp="moveUp"
                @change:moveDown="moveDown"
                @change:activeTreeItem="activeTreeItem"
              ></LayersTree>
            </v-flex>
            <v-flex xs9 d-flex class="mapview">
              <v-layout
                align-center
                justify-center
                column
                fill-height
                align-items-start
                pt-1
                pl-1p
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
                    :base-layers="baseLayers"
                    :vector-layers="vectorLayers"
                    :utility-layers="utilityLayers"
                    :feature-info="featureInfo"
                    :show-panel="showPanel"
                    :map-status="mapStatus"
                    :active-tree-item="selectedLayer"
                    @export:pdf="exportPDF"
                    @change:showpanel="changeShowPanel"
                    @geolocation:clear="clearGeolocation"
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
import { mapMutations } from "vuex";
import MapTools from "@/components/WebGISMaptools.vue";
import LayersTree from "@/components/WebGISLayersTree.vue";
import VueMap from "@/components/WebGisVueMap.vue";
// import { loadingBBox } from "vuelayers/lib/ol-ext";
// import { loaderFactory } from "../services/api.js";
import * as jsPDF from "jspdf";
export default {
  name: "WebGIS",
  components: {
    MapTools,
    LayersTree,
    VueMap
  },
  data() {
    return {
      baseLayers: [
        {
          id: 100,
          name: "osm",
          title: "Carto Light",
          visible: true,
          crossOrigin: "anonymous",
          preload: Infinity,
          url:
            "https://cartodb-basemaps-{1-4}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
          attributions:
            "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
          zIndex: 0
        },
        {
          id: 101,
          name: "osm",
          title: "OpenStreetMap",
          visible: false,
          crossOrigin: "anonymous",
          preload: Infinity,
          zIndex: 1
        },
        {
          id: 102,
          name: "bingmaps",
          title: "Bing Maps (Aerial with Labels)",
          apiKey:
            "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
          imagerySet: "AerialWithLabelsOnDemand",
          visible: false,
          crossOrigin: "anonymous",
          preload: Infinity,
          zIndex: 2
        },
        {
          id: 103,
          name: "bingmaps",
          title: "Bing Maps (Roads)",
          apiKey:
            "Ap3sskZ5BccP6TvBr0FoLc9orA4_R1uh-8UjpOKYciXL1hNMtAJr_BdxMjTJNkpv",
          imagerySet: "CanvasLight",
          visible: false,
          crossOrigin: "anonymous",
          preload: Infinity,
          zIndex: 3
        }
      ],
      vectorLayers: [
        // {
        //   id: 200,
        //   title: "Bird Directive GREEN",
        //   cmp: "vl-layer-vector",
        //   visible: false,
        //   renderMode: "image",
        //   source: {
        //     cmp: "vl-source-vector",
        //     features: [],
        //     url(extent, resolution, projection) {
        //       return (
        //         "https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/EUNIS_Website_Dyna_WM/MapServer/7/query?" +
        //         "&geometryType=esriGeometryEnvelope" +
        //         "&geometry=" +
        //         extent.join(",") +
        //         "&spatialRel=esriSpatialRelEnvelopeIntersects" +
        //         "&inSR=" +
        //         projection.split(":")[1] +
        //         "&outFields=*&f=geojson"
        //       );
        //     },
        //     strategyFactory() {
        //       return loadingBBox;
        //     }
        //   },
        //   style: [
        //     {
        //       cmp: "vl-style-box",
        //       styles: {
        //         "vl-style-fill": {
        //           color: "green"
        //         },
        //         "vl-style-stroke": {
        //           color: "#8f209b",
        //           width: 2
        //         }
        //       }
        //     }
        //   ]
        // },
        // {
        //   id: 201,
        //   title: "DEMO DATA blue",
        //   cmp: "vl-layer-vector",
        //   visible: false,
        //   renderMode: "image",
        //   source: {
        //     cmp: "vl-source-vector",
        //     features: [],
        //     strategyFactory() {
        //       return loadingBBox;
        //     },
        //     loaderFactory
        //   },
        //   style: [
        //     {
        //       cmp: "vl-style-box",
        //       styles: {
        //         "vl-style-fill": {
        //           color: "blue"
        //         },
        //         "vl-style-stroke": {
        //           color: "#219e46",
        //           width: 2
        //         }
        //       }
        //     }
        //   ]
        // },
        // {
        //   id: 202,
        //   title: "DEMO DATA2 red",
        //   cmp: "vl-layer-vector",
        //   visible: false,
        //   renderMode: "image",
        //   source: {
        //     cmp: "vl-source-vector",
        //     features: [],
        //     strategyFactory() {
        //       return loadingBBox;
        //     },
        //     loaderFactory
        //   },
        //   style: [
        //     {
        //       cmp: "vl-style-box",
        //       styles: {
        //         "vl-style-fill": {
        //           color: "red"
        //         },
        //         "vl-style-stroke": {
        //           color: "#219e46",
        //           width: 2
        //         }
        //       }
        //     }
        //   ]
        // },

        {
          id: 203,
          title: "Image Example (AUTH)",
          cmp: "vl-layer-tile",
          visible: false,
          source: {
            cmp: "vl-source-wms",
            url: process.env.VUE_APP_GEOSERVER_URL,
            layers: "combine2protect:Acip_brev",
            extParams: { TILED: true },
            serverType: "geoserver",
            crossOrigin: "anonymous"
          },
          zIndex: 203
        },
        {
          id: 204,
          title: "Shapefile Example (AUTH)",
          cmp: "vl-layer-tile",
          visible: true,
          source: {
            cmp: "vl-source-wms",
            url: process.env.VUE_APP_GEOSERVER_URL,
            layers: "combine2protect:WDPA_cleaning",
            extParams: { TILED: true },
            serverType: "geoserver",
            crossOrigin: "anonymous",
            projection: "EPSG:4326"
          },
          zIndex: 204
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
          },
          zIndex: 1000
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
      },
      selectedLayer: null
    };
  },
  computed: {
    ...mapGetters("webgis", [
      "mapStatus",
      "drawType",
      "featureInfo",
      "showPanel"
    ]),
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
    ...mapMutations("webgis", ["SET_SHOWPANEL"]),
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
    },
    setVisibility(e) {
      const layer = this.vectorLayers.find(k => k.id === e.id);
      const baseLayer = this.baseLayers.find(k => k.id === e.id);
      if (layer) layer.visible = e.visible;
      if (baseLayer) baseLayer.visible = e.visible;
    },
    moveDown(id) {
      const old_index = this.vectorLayers.findIndex(x => x.id === id);
      const new_index = old_index - 1;
      this.move(this.vectorLayers, old_index, new_index);
    },
    moveUp(id) {
      const old_index = this.vectorLayers.findIndex(x => x.id === id);
      const new_index = old_index + 1;
      this.move(this.vectorLayers, old_index, new_index);
    },
    move(arr, old_index, new_index) {
      while (old_index < 0) {
        old_index += arr.length;
      }
      while (new_index < 0) {
        new_index += arr.length;
      }
      if (new_index >= arr.length) {
        let k = new_index - arr.length;
        while (k-- + 1) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },
    activeTreeItem(e) {
      if (e) {
        this.selectedLayer = e[0];
      } else {
        this.selectedLayer = null;
      }
    },
    changeShowPanel(e) {
      console.log(e);
      this.SET_SHOWPANEL(e);
    },
    clearGeolocation() {
      this.updateMapStatus("display");
    }
  }
};
</script>
<style lang="scss" scoped>
.webgis {
  min-height: calc(100vh - 165px);
  // background-color: #da7033;
}
.layerstreeWrapper {
  // background-color: red;
  flex: 1;
}
.mapview {
  // background-color: green;
  flex: 1 1 auto;
  .maptools {
    background-color: #454545;
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
