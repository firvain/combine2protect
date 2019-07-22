<template>
  <v-layout row wrap align-center fill-height align-content-center pa-0>
    <v-flex xs12 d-flex fill-height pa-0 ma-0>
      <vl-map
        id="mymap"
        ref="map"
        class="mymap"
        :load-tiles-while-animating="false"
        :load-tiles-while-interacting="false"
        data-projection="EPSG:4326"
        :style="mapStyle"
        @mounted="onMapMounted"
      >
        <vl-view
          :zoom.sync="zoom"
          :min-zoom="minZoom"
          :max-zoom="maxzoom"
          :center.sync="center"
          :rotation.sync="rotation"
        ></vl-view>

        <!-- BASE LAYERS -->
        <vl-layer-tile
          v-for="(layer, key) in baseLayers"
          :id="key"
          :key="key"
          :visible="layer.visible"
          :preload="layer.preload"
        >
          <component :is="'vl-source-' + layer.name" v-bind="layer"></component>
        </vl-layer-tile>

        <!-- VECTOR LAYERS -->
        <component
          :is="layer.cmp"
          v-for="layer in vectorLayers"
          :id="layer.id"
          :key="layer.id"
          :visible="layer.visible"
          v-bind="layer"
          :z-index="layer.zIndex"
        >
          <!-- add vl-source-* -->
          <component :is="layer.source.cmp" v-bind="layer.source"></component>
          <!--// vl-source-* -->

          <!-- add style components if provided -->
          <!-- create vl-style-box or vl-style-func -->
          <div v-if="layer.style">
            <component
              :is="style.cmp"
              v-for="(style, i) in layer.style"
              :key="i"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <div v-if="style.styles">
                <component
                  :is="cmp"
                  v-for="(st, cmp) in style.styles"
                  :key="cmp"
                  v-bind="st"
                >
                  <!-- vl-style-fill, vl-style-stroke if provided -->
                  <vl-style-fill
                    v-if="st.fill"
                    v-bind="st.fill"
                  ></vl-style-fill>
                  <vl-style-stroke
                    v-if="st.stroke"
                    v-bind="st.stroke"
                  ></vl-style-stroke>
                </component>
              </div>
            </component>
          </div>
          <!--// style -->
        </component>

        <!-- UTILITY LAYERS -->
        <component
          :is="layer.cmp"
          v-for="layer in utilityLayers"
          :id="layer.target"
          :key="layer.id"
          :visible="layer.visible"
          v-bind="layer"
        >
          <component
            :is="layer.source.cmp"
            v-bind="layer.source"
            :ident="layer.target"
            :features.sync="drawnFeatures"
          ></component>
          <div v-if="layer.style">
            <component
              :is="style.cmp"
              v-for="(style, i) in layer.style"
              :key="i"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <div v-if="layer.style">
                <component
                  :is="cmp"
                  v-for="(st, cmp) in style.styles"
                  :key="cmp"
                  v-bind="st"
                >
                  <!-- vl-style-fill, vl-style-stroke if provided -->
                  <vl-style-fill
                    v-if="st.fill"
                    v-bind="st.fill"
                  ></vl-style-fill>
                  <vl-style-stroke
                    v-if="st.stroke"
                    v-bind="st.stroke"
                  ></vl-style-stroke>
                </component>
              </div>
            </component>
          </div>
        </component>
        <!-- DRAW INTERACTION -->
        <vl-interaction-draw
          v-if="mapStatus === 'draw'"
          source="draw-target"
          :type="drawType"
          :stop-click="true"
        ></vl-interaction-draw>
        <!-- MEASURE INTERACTION -->
        <vl-interaction-draw
          v-if="mapStatus === 'measure'"
          source="draw-target"
          :type="measureType"
          :stop-click="true"
        ></vl-interaction-draw>

        <!-- SELECT INTERACTION -->
        <vl-interaction-select
          v-if="mapStatus === 'info'"
          :features.sync="selectedFeatures"
          :multi="true"
          :filter="filterF"
          :hit-tolerance="20"
        >
          <!-- select styles -->
          <vl-style-box>
            <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
            <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            <vl-style-circle :radius="5">
              <vl-style-stroke color="#423e9e" :width="7"></vl-style-stroke>
              <vl-style-fill :color="[254, 178, 76, 0.7]"></vl-style-fill>
            </vl-style-circle>
          </vl-style-box>
          <vl-style-box :z-index="1">
            <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
            <vl-style-circle :radius="5">
              <vl-style-stroke color="#d43f45" :width="2"></vl-style-stroke>
            </vl-style-circle>
          </vl-style-box>
          <!--// select styles -->
        </vl-interaction-select>
      </vl-map>
    </v-flex>
  </v-layout>
</template>
<script>
// import { mapGetters } from "vuex";
import ScaleLine from "ol/control/ScaleLine";
import FullScreen from "ol/control/FullScreen";
import OverviewMap from "ol/control/OverviewMap";
import ZoomSlider from "ol/control/ZoomSlider";
// import { getArea, getLength } from "ol/sphere.js";
// import { Polygon } from "ol/geom.js";
// import KML from "ol/format/KML";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  name: "VueMap",
  props: {
    baseLayers: {
      type: Array,
      required: true
    },
    vectorLayers: {
      type: Array,
      required: true
    },
    utilityLayers: {
      type: Array,
      required: true
    },
    mapStatus: {
      type: String,
      default: "display"
    },
    drawType: {
      type: String,
      default: "Point"
    },
    measureType: {
      type: String,
      default: "Linestring"
    }
  },
  data() {
    return {
      center: [21.78896, 40.30069],
      minZoom: 9,
      zoom: 11,
      maxzoom: 13,
      rotation: 0,
      selectedFeatures: [],
      drawnFeatures: [],
      printSize: [(297 * 72) / 25.4, (210 * 72) / 25.4]
    };
  },
  computed: {
    mapStyle() {
      let cursor;
      switch (this.mapStatus) {
        case "draw":
          cursor = "crosshair";
          break;
        case "measure":
          cursor = "copy";
          break;
        case "info":
          cursor = "help";
          break;
        default:
          cursor = "default";
          break;
      }
      return {
        cursor
      };
    }
  },
  watch: {
    mapStatus(newValue) {
      switch (newValue) {
        case "print":
          this.print();
          break;

        default:
          break;
      }
    }
  },
  methods: {
    onMapMounted() {
      // now ol.Map instance is ready and we can work with it directly
      this.$refs.map.$map.getControls().extend([
        new ScaleLine(),
        new FullScreen(),
        new OverviewMap({
          collapsed: true,
          collapsible: true,
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ]
        }),
        new ZoomSlider()
      ]);
    },
    filterF(feature, layer) {
      console.log(feature, layer);
      // if (layer.get("id") === this.selectedLayer) return true;
      return true;
    },
    print() {
      const map = this.$refs.map.$map;
      const size = map.getSize();
      const extent = map.getView().calculateExtent(size);
      map.once("rendercomplete", event => {
        const canvas = event.context.canvas;
        try {
          const data = canvas.toDataURL("image/jpeg");
          this.$emit("export:pdf", { data });
        } catch (error) {
          this.$emit("error", { msg: error });
        }

        map.setSize(size);
        map.getView().fit(extent, { size: size });
      });
      // Reset original map size

      // Set print size
      map.setSize(this.printSize);
      map.getView().fit(extent, { size: this.printSize });
    }
  }
};
</script>

<style lang="scss" scoped>
.mymap {
  height: 100%;
}
// ::v-deep .ol-control button {
//   width: 1em;
//   height: 1em;
//   font-size: 1em;
//   line-height: 1em;
// }
::v-deep .ol-overviewmap {
  bottom: auto;
  left: auto;
  right: 0.5em;
  top: 2.5em;
}
</style>
