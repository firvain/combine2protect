<template>
  <v-layout row wrap align-center fill-height align-content-center pa-0>
    <v-flex xs12 d-flex fill-height pa-0 ma-0 class="mapWrapper">
      <vl-map
        id="mymap"
        ref="map"
        class="mymap"
        :load-tiles-while-animating="false"
        :load-tiles-while-interacting="false"
        data-projection="EPSG:4326"
        :style="mapStyle"
        :default-controls="{ attribution: true, rotate: false, zoom: true }"
        extent="extent"
        @mounted="onMapMounted"
        @postcompose="onMapPostCompose"
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
          :key="layer.id"
          :visible="layer.visible"
          :preload="layer.preload"
        >
          <component :is="'vl-source-' + layer.name" v-bind="layer"></component>
        </vl-layer-tile>

        <!-- VECTOR LAYERS -->
        <component
          :is="layer.cmp"
          v-for="(layer, index) in vectorLayers"
          :id="layer.id"
          :key="index"
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
          >
          </component>
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
        <!-- INFO POPOUP -->
        <vl-layer-vector
          v-if="mapStatus === 'info' && selectedFeatures !== 'undefined'"
        >
          <vl-source-vector ref="infoVectorSource">
            <vl-feature
              v-for="feature in selectedFeatures"
              :id="feature.id"
              :key="feature.id"
              :properties="feature.properties"
            >
              <vl-overlay
                :position="pointOnSurface(feature.geometry)"
                positioning="center-left"
                auto-pan
                stop-event
                :insert-first="false"
              >
                <div class="overlayWrapper">
                  <ul>
                    <li v-for="k in Object.keys(feature.properties)" :key="k">
                      {{ k }} : {{ feature.properties[k] }}
                    </li>
                  </ul>
                </div>
              </vl-overlay>
            </vl-feature>
          </vl-source-vector>
        </vl-layer-vector>
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
          @drawstart="measureDrawStart"
          @drawend="measureDrawEnd"
        ></vl-interaction-draw>

        <!-- SELECT INTERACTION -->
        <vl-interaction-select
          v-if="mapStatus === 'info'"
          :features.sync="selectedFeatures"
          :multi="false"
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
        <vl-geoloc
          v-if="showGeoloc"
          ref="geoloc"
          @update:position="onUpdatePosition"
        >
          <template slot-scope="geoloc">
            <vl-feature
              v-if="geoloc.position"
              id="marker"
              ref="marker"
              :properties="{ start: Date.now(), duration: 2500 }"
            >
              <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
              <vl-style-box>
                <vl-style-circle :radius="4">
                  <vl-style-fill color="red"></vl-style-fill>
                  <vl-style-stroke :color="[234, 53, 53]"></vl-style-stroke>
                </vl-style-circle>
              </vl-style-box>
            </vl-feature>
          </template>
        </vl-geoloc>
      </vl-map>
      <div class="map-panel">
        <v-card class="mx-auto elevation-10" height="100%" width="300">
          <v-toolbar color="secondary darken-2 white--text" flat
            >PANEL</v-toolbar
          >
          <v-card-text
            ><strong>Lorem Ipsum</strong> is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small @click="panelButton">Click me</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
// import { mapGetters } from "vuex";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
// import FullScreen from "ol/control/FullScreen";
// import OverviewMap from "ol/control/OverviewMap";
// import ZoomSlider from "ol/control/ZoomSlider";
import ZoomToExtent from "ol/control/ZoomToExtent";
import { getArea, getLength } from "ol/sphere.js";
import { Polygon } from "ol/geom.js";
// import KML from "ol/format/KML";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
import * as olExt from "vuelayers/lib/ol-ext";
import { createStringXY } from "ol/coordinate";
import { GeolocatioControl } from "../extra/index.js";
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
    },
    activeTreeItem: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      center: [22.920227, 40.736851],
      minZoom: 5,
      zoom: 7,
      maxzoom: 13,
      rotation: 0,
      selectedFeatures: [],
      drawnFeatures: [],
      extent: [2400000, 4800000, 2640000, 5120000],
      printSize: [(297 * 72) / 25.4, (210 * 72) / 25.4],
      deviceCoordinate: undefined,
      showGeoloc: false
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
        case "info":
          this.info();
          break;
        default:
          break;
      }
    }
  },

  methods: {
    pointOnSurface: olExt.findPointOnSurface,
    onMapMounted() {
      // now ol.Map instance is ready and we can work with it directly
      this.$refs.map.$map.getControls().extend([
        new ScaleLine(),
        new ZoomToExtent({
          extent: this.extent
        }),
        new MousePosition({
          className: "mouse-position",
          coordinateFormat: createStringXY(3),
          projection: "EPSG:4326",
          undefinedHTML: ""
        }),
        new GeolocatioControl()
        // new RotateNorthControl()
        // new FullScreen(),
        // new OverviewMap({
        //   collapsed: true,
        //   collapsible: true,
        //   layers: [
        //     new TileLayer({
        //       source: new OSM()
        //     })
        //   ]
        // })
      ]);
    },
    filterF(feature, layer) {
      if (layer.get("id") === this.activeTreeItem) return true;
      return false;
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
    },
    info() {
      if (!this.activeTreeItem) alert("Please select a layer from the tree");
    },
    formatLength(line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },
    formatArea(polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + " " + "km2";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m2";
      }
      return output;
    },
    measureDrawStart() {
      console.log(this.$refs);
      this.$refs.draw.getSource().clear();
    },
    measureDrawEnd(evt) {
      let geom = evt.feature.getGeometry();
      if (geom instanceof Polygon) {
        alert("Area is: " + this.formatArea(geom));
      } else {
        alert("Length is: " + this.formatLength(geom));
      }
    },
    panelButton() {
      alert("This Panel can be used for user information and interaction");
    },
    onUpdatePosition(coordinate) {
      this.deviceCoordinate = coordinate;
    },
    onMapPostCompose({ vectorContext, frameState }) {
      const easeInOut = t => 1 - Math.pow(1 - t, 3);

      if (!this.$refs.marker || !this.$refs.marker.$feature) return;
      const feature = this.$refs.marker.$feature;
      if (!feature.getGeometry() || !feature.getStyle()) return;
      const flashGeom = feature.getGeometry().clone();
      const duration = feature.get("duration");
      const elapsed = frameState.time - feature.get("start");
      const elapsedRatio = elapsed / duration;
      const radius = easeInOut(elapsedRatio) * 35 + 5;
      const opacity = easeInOut(1 - elapsedRatio);
      const fillOpacity = easeInOut(0.5 - elapsedRatio);
      vectorContext.setStyle(
        olExt.createStyle({
          imageRadius: radius,
          fillColor: [119, 170, 203, fillOpacity],
          strokeColor: [119, 170, 203, opacity],
          strokeWidth: 2 + opacity
        })
      );
      vectorContext.drawGeometry(flashGeom);
      vectorContext.setStyle(feature.getStyle()(feature)[0]);
      vectorContext.drawGeometry(feature.getGeometry());
      if (elapsed > duration) {
        feature.set("start", Date.now());
      }
      this.$refs.map.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.mapWrapper {
  position: relative;
}
.mymap {
  position: absolute;
  top: 0em;
  right: 0em;
  height: 100%;
}
.map-panel {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
::v-deep .mouse-position {
  background: #454545;
  border-radius: 4px;
  bottom: 8px;
  left: 15em;
  position: absolute;
  font-size: 12px;
  padding: 2px;
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
.overlayWrapper {
  background: #fff;
  padding: 8px;
  color: black;
  overflow: auto;
  max-height: 10em;
  border-radius: 10px;
  border: 1px solid #cccccc;
}
::v-deep .ol-control button {
  background-color: #454545;
}
::v-deep .ol-scale-line {
  background-color: #454545;
}
::v-deep .ol-scale-line .ol-touch {
  background-color: #454545;
}
::v-deep .rotate-north {
  top: 7em;
  left: 0.5em;
}
::v-deep .ol-touch .rotate-north {
  top: 5.71em;
}
::v-deep .geolocation {
  top: 7em;
  left: 0.5em;
}
::v-deep .ol-touch .geolocation {
  top: 5.71em;
}
.here {
  background-color: white;
  font-size: 1em;
  color: black;
  padding: 0.4em;
  border: 2px solid black;
  border-radius: 5px;
}
</style>
