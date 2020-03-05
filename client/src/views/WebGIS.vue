<template>
  <v-container fluid fill-height pa-0 ma-0>
    <v-layout column>
      <v-flex d-flex class="webgis">
        <v-layout row wrap>
          <v-flex
            xs4
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
          <v-flex xs8 d-flex class="mapview">
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
              <!-- <v-flex
                d-flex
                class="maptools"
                align-center
                justify-center
                white--text
                pa-1
              >
                <MapTools></MapTools>
              </v-flex> -->
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
                  @geolocation:clear="setDisplay"
                  @measure:clear="setDisplay"
                  @info:clear="clearInfo"
                  @info:cancel="cancelInfo"
                  @info:get="getFeatureFromGeoserver"
                  @draw:cancel="setDisplay"
                  @upload:cancel="setDisplay"
                  @nomimatim:cancel="setDisplay"
                  @map:loading="mapLoading"
                ></VueMap>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
// import MapTools from "@/components/WebGISMaptools.vue";
import LayersTree from "@/components/WebGISLayersTree.vue";
import VueMap from "@/components/WebGisVueMap.vue";
// import { loadingBBox } from "vuelayers/lib/ol-ext";
// import { loaderFactory } from "../services/api.js";
import * as jsPDF from "jspdf";
import { mapLayers } from "../extra/layers.js";
// import { fetchLayers } from "../services/api";
export default {
  name: "WebGIS",
  components: {
    // MapTools,
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
      vectorLayers: mapLayers,
      utilityLayers: [
        {
          id: 9000001,
          ref: "draw",
          title: "Draw",
          cmp: "vl-layer-vector",
          target: "draw-target",
          visible: true,
          source: {
            cmp: "vl-source-vector",
            ident: "draw-target",
            features: "drawnFeatures"
          },
          zIndex: 9000001
        },
        {
          id: 9000002,
          ref: "measure",
          title: "Measure",
          cmp: "vl-layer-vector",
          target: "measure-target",
          visible: true,
          source: {
            cmp: "vl-source-vector",
            ident: "measure-target",
            features: "measuredFeatures"
          },
          zIndex: 9000002
        },
        {
          id: 9000003,
          ref: "nomimatim",
          title: "Nomimatim",
          cmp: "vl-layer-vector",
          target: "momimatim-target",
          visible: true,
          source: {
            cmp: "vl-source-vector",
            ident: "momimatim-target",
            features: "momimatimResults"
          },
          zIndex: 9000003
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
    ...mapGetters("webgis", ["mapStatus", "featureInfo", "showPanel"]),
    ...mapGetters("app", ["loading", "pages"]),
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
  async mounted() {
    // const a = await fetchLayers();
    // console.log(a);
  },
  methods: {
    ...mapActions("webgis", ["updateMapStatus", "getFeatureInfo"]),
    ...mapMutations("webgis", ["SET_SHOWPANEL", "SET_FEATURE_INFO"]),
    ...mapActions("app", ["updateLoading"]),
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
      // console.log(old_index, new_index);
      this.move(this.vectorLayers, old_index, new_index);
    },
    moveUp(id) {
      // console.log(id);
      const old_index = this.vectorLayers.findIndex(x => x.id === id);
      const new_index = old_index + 1;
      this.move(this.vectorLayers, old_index, new_index);
    },
    move(arr, old_index, new_index) {
      // console.log(arr[old_index].zIndex, arr[old_index].title);
      // console.log(arr[new_index].zIndex, arr[new_index].title);
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
      if (old_index > new_index) {
        arr[new_index].zIndex++;
        arr[new_index].id++;
        arr[old_index].zIndex--;
        arr[old_index].id--;
      } else {
        arr[new_index].zIndex--;
        arr[new_index].id--;
        arr[old_index].zIndex++;
        arr[old_index].id++;
      }

      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      // arr[old_index].zIndex--;
      // console.log(arr[old_index].zIndex, arr[old_index].title);
      // console.log(arr[new_index].zIndex, arr[new_index].title);

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
      // console.log(e);
      this.SET_SHOWPANEL(e);
    },
    setDisplay() {
      this.updateMapStatus("display");
    },
    async getFeatureFromGeoserver(url) {
      await this.getFeatureInfo({ url });
    },
    clearInfo() {
      this.SET_FEATURE_INFO({});
    },
    cancelInfo() {
      this.clearInfo();
      this.setDisplay();
    },
    mapLoading(e) {
      this.updateLoading(e);
    }
  }
};
</script>
<style lang="scss" scoped>
.webgis {
  max-height: calc(100vh - 164px);
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
    flex: 1;
    width: 100%;
  }
}
</style>
