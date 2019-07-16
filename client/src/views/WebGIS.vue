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
import MapTools from "@/components/WebGISMaptools.vue";
import VueMap from "@/components/WebGisVueMap.vue";
import { loadingBBox } from "vuelayers/lib/ol-ext";
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
          visible: false,
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
          }
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
            url(extent, resolution, projection) {
              console.log(extent);
              return (
                "http://localhost:3000/api/layers/WDPA_cleaning/" +
                extent[0] +
                "/" +
                extent[1] +
                "/" +
                extent[2] +
                "/" +
                extent[3]
              );
            },
            strategyFactory() {
              return loadingBBox;
            }
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters("webgis", ["mapStatus"])
  }
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
