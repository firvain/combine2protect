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
        @mounted="onMapMounted"
      >
        <vl-view
          :zoom.sync="zoom"
          :minZoom="minZoom"
          :maxZoom="maxzoom"
          :center.sync="center"
          :rotation.sync="rotation"
        ></vl-view>
        <vl-layer-tile
          v-for="(layer, key) in baseLayers"
          :key="key"
          :id="key"
          :visible="layer.visible"
          :preload="layer.preload"
        >
          <component :is="'vl-source-' + layer.name" v-bind="layer"></component>
        </vl-layer-tile>
        <component
          v-for="layer in vectorLayers"
          :is="layer.cmp"
          :visible="layer.visible"
          :key="layer.id"
          :id="layer.id"
          v-bind="layer"
        >
          <!-- add vl-source-* -->
          <component :is="layer.source.cmp" v-bind="layer.source"> </component>
          <!--// vl-source-* -->

          <!-- add style components if provided -->
          <!-- create vl-style-box or vl-style-func -->
          <div v-if="layer.style">
            <component
              v-for="(style, i) in layer.style"
              :key="i"
              :is="style.cmp"
              v-bind="style"
            >
              <!-- create inner style components: vl-style-circle, vl-style-icon, vl-style-fill, vl-style-stroke & etc -->
              <div v-if="style.styles">
                <component
                  v-for="(st, cmp) in style.styles"
                  :key="cmp"
                  :is="cmp"
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
      </vl-map>
    </v-flex>
  </v-layout>
</template>
<script>
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
  name: "map",
  props: {
    baseLayers: {
      type: Array,
      required: true
    },
    vectorLayers: {
      type: Array,
      required: true
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
      drawnFeatures: []
    };
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
