<template>
  <v-layout row wrap align-center fill-height align-content-center pa-0>
    <v-flex xs12 d-flex fill-height pa-0 ma-0 class="mapWrapper">
      <vl-map
        id="mymap"
        ref="map"
        class="mymap"
        :load-tiles-while-animating="false"
        :load-tiles-while-interacting="false"
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
          projection="EPSG:4326"
        ></vl-view>

        <!-- BASE LAYERS -->
        <vl-layer-tile
          v-for="(layer, key) in baseLayers"
          :id="key"
          :key="layer.id"
          :visible="layer.visible"
          :preload="layer.preload"
          :z-index="layer.zIndex"
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
        <vl-layer-vector
          :id="utilityLayers[0].id"
          :ref="utilityLayers[0].ref"
          :visible="utilityLayers[0].visible"
          :z-index="utilityLayers[0].zIndex"
        >
          <vl-source-vector
            :ident="utilityLayers[0].source.ident"
            :features.sync="drawnFeatures"
          >
            <vl-style-box>
              <vl-style-fill :color="[255, 204, 51, 0.2]"></vl-style-fill>
              <vl-style-stroke color="#ffcc33" :width="2"></vl-style-stroke>
              <vl-style-circle :radius="4">
                <vl-style-fill :color="[255, 204, 51, 0.2]"></vl-style-fill>
                <vl-style-stroke color="#ffcc33" :width="2"></vl-style-stroke>
              </vl-style-circle>
            </vl-style-box>
          </vl-source-vector>
        </vl-layer-vector>

        <vl-layer-vector
          :id="utilityLayers[1].id"
          :ref="utilityLayers[1].ref"
          :visible="utilityLayers[1].visible"
          :z-index="utilityLayers[1].zIndex"
        >
          <vl-source-vector
            :ident="utilityLayers[1].source.ident"
            :features.sync="measuredFeatures"
          ></vl-source-vector>
        </vl-layer-vector>
        <!-- INFO POPOUP -->
        <!-- <vl-layer-vector
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
        </vl-layer-vector> -->

        <!-- DRAW INTERACTION -->
        <vl-interaction-draw
          v-if="mapStatus === 'draw'"
          ref="drawInteraction"
          source="draw-target"
          :type="drawType"
          :stop-click="true"
        >
          <vl-style-box>
            <vl-style-fill :color="[255, 255, 255, 0.2]"></vl-style-fill>
            <vl-style-stroke
              :color="[0, 0, 0, 0.5]"
              :width="2"
              :line-dash="[10, 10]"
            ></vl-style-stroke>
            <vl-style-circle :radius="4">
              <vl-style-fill :color="[255, 255, 255, 0.2]"></vl-style-fill>
              <vl-style-stroke
                color="[0, 0, 0, 0.7]"
                :width="2"
              ></vl-style-stroke>
            </vl-style-circle>
          </vl-style-box>
        </vl-interaction-draw>
        <!-- MEASURE INTERACTION -->
        <vl-interaction-draw
          v-if="mapStatus === 'measure' && measureType"
          ref="measureInteraction"
          source="measure-target"
          :type="measureType"
          :stop-click="true"
          @drawstart="measureDrawStart"
          @drawend="measureDrawEnd"
        ></vl-interaction-draw>

        <vl-geoloc
          v-if="mapStatus === 'geolocation'"
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
        <vl-layer-vector ref="featureInfo" key="10000" :z-index="100000">
          <vl-source-vector
            v-if="featureInfo.crs"
            :features="featureInfo.features"
            @update:features="onFeatureInfoUpdate"
          >
          </vl-source-vector>
        </vl-layer-vector>
      </vl-map>
      <div class="map-panel">
        <v-card class="mx-auto elevation-10" height="100%" width="300">
          <v-toolbar color="secondary darken-2 white--text" flat
            ><v-toolbar-title>{{ panelInfo.toUpperCase() }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
              <v-btn icon small @click="$emit('change:showpanel', !showPanel)"
                ><v-icon
                  color="white"
                  v-text="
                    `mdi-${
                      showPanel === false ? 'arrow-expand' : 'arrow-collapse'
                    }`
                  "
                ></v-icon
              ></v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <template v-if="showPanel">
            <template v-if="mapStatus === 'display'">
              <v-card-text class="full">
                {{ panelText.display }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small @click="panelButton">Click me</v-btn>
              </v-card-actions>
            </template>
            <template v-if="mapStatus === 'geolocation'">
              <v-card-text v-if="!deviceCoordinate" class="full">{{
                panelText.geolocation
              }}</v-card-text>
              <v-card-text v-else class="subheading text-xs-center">
                {{ Number(Math.round(deviceCoordinate[0] + "e3") + "e-3") }}
                {{ Number(Math.round(deviceCoordinate[1] + "e3") + "e-3") }}

                {{
                  this.$refs.map.$map
                    .getView()
                    .getProjection()
                    .getCode()
                }}</v-card-text
              >

              <v-card-actions
                ><v-spacer></v-spacer
                ><v-btn
                  v-if="deviceCoordinate"
                  small
                  flat
                  @click="clearGeolocation"
                  >cancel</v-btn
                >
              </v-card-actions>
            </template>
            <template v-if="mapStatus === 'info'">
              <v-card-text>
                <div
                  v-if="
                    Object.keys(featureInfo).length !== 0 &&
                      featureInfo.constructor === Object
                  "
                  class="overlayWrapper"
                >
                  <Strong>{{ featureInfo.features[0].id }}</Strong>

                  <ul>
                    <li
                      v-for="k in Object.keys(
                        featureInfo.features[0].properties
                      )"
                      :key="k"
                    >
                      {{ k }} : {{ featureInfo.features[0].properties[k] }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <div class="full">{{ panelText.info }}</div>
                  <v-select
                    v-model="selectedLayer"
                    :items="availableForSelectionLayers"
                    item-text="title"
                    item-value="id"
                    label="Select Layer to Query"
                    dense
                    flat
                  ></v-select>
                </div>
                <div
                  v-if="
                    Object.keys(featureInfo).length !== 0 &&
                      featureInfo.constructor === Object &&
                      featureInfo.crs
                  "
                >
                  <v-btn small depressed @click="downloadKml">
                    <v-icon left small>mdi-cloud-download-outline</v-icon>
                    kml</v-btn
                  >
                  <v-btn small flat @click="downloadGeojson">
                    <v-icon left small>mdi-cloud-download-outline</v-icon
                    >geojson
                  </v-btn>
                </div>
              </v-card-text>
              <v-card-actions
                ><v-spacer></v-spacer
                ><v-btn
                  v-if="
                    Object.keys(featureInfo).length !== 0 &&
                      featureInfo.constructor === Object
                  "
                  small
                  flat
                  @click="clearInfo"
                  >clear</v-btn
                >
                <v-btn small flat @click="cancelInfo">cancel</v-btn>
              </v-card-actions>
            </template>
            <template v-if="mapStatus === 'print'">
              <v-card-text>{{ panelText.print }}</v-card-text>
            </template>
            <template v-if="mapStatus === 'measure'">
              <v-card-actions>
                <v-btn
                  color="secondary"
                  flat
                  icon
                  @click="setMeasureType('LineString')"
                  ><v-icon>mdi-tape-measure</v-icon></v-btn
                >
                <v-btn
                  color="secondary"
                  flat
                  icon
                  @click="setMeasureType('Polygon')"
                  ><v-icon>mdi-texture-box</v-icon></v-btn
                >
                <v-btn
                  color="secondary"
                  flat
                  icon
                  @click="setMeasureType('Point')"
                  ><v-icon>mdi-target</v-icon></v-btn
                >
                <v-select
                  v-if="measureType === 'LineString'"
                  v-model="lengthUnit"
                  :items="lengthUnits"
                  label="Length Unit"
                  dense
                  flat
                ></v-select>
                <v-select
                  v-if="measureType === 'Polygon'"
                  v-model="areaUnit"
                  :items="areaUnits"
                  label="Area Unit"
                  dense
                  flat
                ></v-select>
              </v-card-actions>
              <v-card-text
                v-if="measureOutput !== '' && measureType === 'LineString'"
                class="subheading text-xs-center"
                ><p>
                  {{ measureOutput + " " + lengthUnit }}
                </p></v-card-text
              >
              <v-card-text
                v-if="measureOutput !== '' && measureType === 'Polygon'"
                class="subheading text-xs-center"
                ><p>
                  {{ measureOutput + " " + areaUnit }}
                </p></v-card-text
              >
              <v-card-text
                v-if="measureOutput !== '' && measureType === 'Point'"
                class="subheading text-xs-center"
                ><p>
                  {{ measureOutput[0] }} , {{ measureOutput[1] }}
                  {{
                    this.$refs.map.$map
                      .getView()
                      .getProjection()
                      .getCode()
                  }}
                </p></v-card-text
              >
              <v-card-actions v-if="measureOutput !== ''">
                <v-spacer></v-spacer>
                <v-btn small flat @click="clearMeasure">cancel</v-btn>
              </v-card-actions>
            </template>
            <template v-if="mapStatus === 'draw'">
              <v-card-text>
                <!-- <div class="full">{{ panelText.draw }}</div> -->
                <v-select
                  v-model="drawType"
                  :items="drawTypes"
                  item-text="label"
                  item-value="value"
                  :label="panelText.draw"
                  dense
                  flat
                ></v-select
              ></v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small flat @click="clearDraw">clear</v-btn>
                <v-btn small flat @click="cancelDraw">cancel</v-btn>
              </v-card-actions>
            </template>
          </template>
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
import { Polygon, LineString, Point } from "ol/geom.js";
// import { transform } from "ol/proj";
// import KML from "ol/format/KML";
import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
import * as olExt from "vuelayers/lib/ol-ext";
import { unByKey } from "ol/Observable";
import { createStringXY } from "ol/coordinate";
import KML from "ol/format/KML";
import {
  GeolocatioControl,
  InfoControl,
  PrintControl,
  MeasureControl,
  DrawControl
} from "../extra/index.js";

import { saveAs } from "file-saver";
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
    featureInfo: {
      type: Object,
      // required: true,
      default: () => {}
    },
    mapStatus: {
      type: String,
      default: "display"
    },
    activeTreeItem: {
      type: Number,
      default: null
    },
    showPanel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      center: [22.920227, 40.736851],
      minZoom: 5,
      zoom: 7,
      maxzoom: 15,
      rotation: 0,
      drawnFeatures: [],
      measuredFeatures: [],
      extent: [21.4, 39.5, 23.65, 41.8],
      printSize: [(297 * 72) / 25.4, (210 * 72) / 25.4],
      deviceCoordinate: undefined,
      measureType: undefined,
      drawType: "Point",
      drawTypes: [
        {
          id: 1,
          label: "Point",
          value: "Point"
        },
        {
          id: 2,
          label: "Line",
          value: "LineString"
        },
        {
          id: 3,
          label: "Polygon",
          value: "Polygon"
        }
      ],
      lengthUnit: "meters",
      lengthUnits: ["meters", "miles", "yards", "feet"],
      areaUnit: "sq. meters",
      areaUnits: ["sq. meters", "sq. miles", "sq. yards", "sq. feet"],
      convertLength: {
        meters: {
          meters: 1,
          miles: 0.000621371192,
          yards: 1.0936133,
          feet: 3.2808399
        },
        miles: {
          meters: 1609.344,
          miles: 1,
          yards: 1760,
          feet: 5280
        },
        yards: {
          meters: 0.9144,
          miles: 0.000568181818,
          yards: 1,
          feet: 3
        },
        feet: {
          meters: 0.3048,
          miles: 0.000189393939,
          yards: 0.333333333,
          feet: 1
        },
        "sq. meters": {
          "sq. meters": 1,
          "sq. miles": 3.8610215854781257e-7,
          "sq. yards": 1.19599005,
          "sq. feet": 10.7639104
        },
        "sq. miles": {
          "sq. meters": 2589988.11,
          "sq. miles": 1,
          "sq. yards": 3097600,
          "sq. feet": 27878400
        },
        "sq. yards": {
          "sq. meters": 0.83612736,
          "sq. miles": 3.22830579e-7,
          "sq. yards": 1,
          "sq. feet": 9
        },
        "sq. feet": {
          "sq. meters": 0.09290304,
          "sq. miles": 0.000000035870064279155,
          "sq. yards": 0.111111111,
          "sq. feet": 1
        }
      },
      measureOutput: "",
      panelText: {
        display: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.`,
        geolocation: `Please wait trying to locate.
        Be informed that geolocation is provided by your ISP.`,
        info: `First select a Layer and then Click on the map.`,
        print: `Please wait preparing map for print`,
        draw: `Please Select type of feature to draw`
      },
      evtKey: {},
      panelInfo: "general info",
      selectedLayer: null
    };
  },
  computed: {
    availableForSelectionLayers() {
      return this.vectorLayers.filter(x => {
        if (x.cmp === "vl-layer-tile" && x.quearable && x.visible) {
          return true;
        }
      });
    }
  },
  watch: {
    mapStatus(newValue) {
      switch (newValue) {
        case "print":
          this.panelInfo = "print map";
          // this.selectedLayer = null;
          this.print();
          break;
        case "info":
          // this.selectedLayer = null;
          this.panelInfo = "Get Fearure Info";
          this.info();
          break;
        case "geolocation":
          // this.selectedLayer = null;
          this.panelInfo = "geolocation";
          break;
        case "measure":
          // this.selectedLayer = null;
          this.panelInfo = "measure";
          break;
        case "draw":
          // this.selectedLayer = null;
          this.panelInfo = "Draw Features on map";
          break;
        default:
          // this.selectedLayer = null;
          unByKey(this.evtKey);
          this.panelInfo = "general info";
          break;
      }
    },
    lengthUnit: {
      handler: function(newValue, oldValue) {
        // alert(this.convertLength[oldValue][newValue]);
        if (oldValue === newValue) return;
        if (this.measureOutput === "") return;
        this.measureOutput =
          Math.round(
            +this.measureOutput * this.convertLength[oldValue][newValue] * 100
          ) / 100;
      },
      deep: true
    },
    areaUnit: {
      handler: function(newValue, oldValue) {
        // alert(this.convertLength[oldValue][newValue]);
        if (oldValue === newValue) return;
        if (this.measureOutput === "") return;
        this.measureOutput =
          Math.round(
            +this.measureOutput * this.convertLength[oldValue][newValue] * 100
          ) / 100;
      },
      deep: true
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
        new GeolocatioControl(),
        new InfoControl(),
        new PrintControl(),
        new MeasureControl(),
        new DrawControl()
      ]);
    },
    print() {
      unByKey(this.evtKey);
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

    formatLength(line) {
      const length = getLength(
        line.clone().transform("EPSG:4326", "EPSG:3857")
      );

      let output;
      output =
        Math.round(
          length * this.convertLength["meters"][this.lengthUnit] * 100
        ) / 100;

      this.measureOutput = output;
    },
    formatArea(polygon) {
      const area = getArea(polygon.clone().transform("EPSG:4326", "EPSG:3857"));
      // alert(area);
      let output;
      output =
        Math.round(
          area * this.convertLength["sq. meters"][this.areaUnit] * 100
        ) / 100;
      this.measureOutput = output;
    },
    formatCoords(point) {
      const coordinates = point.clone().getCoordinates();
      this.measureOutput = [
        Number(Math.round(coordinates[0] + "e3") + "e-3"),
        Number(Math.round(coordinates[1] + "e3") + "e-3")
      ];
    },
    measureDrawStart() {
      this.$refs.measure.getSource().clear();
    },
    measureDrawEnd(evt) {
      let geom = evt.feature.getGeometry();
      if (geom instanceof Polygon) {
        this.formatArea(geom);
      } else if (geom instanceof LineString) {
        this.formatLength(geom);
      } else if (geom instanceof Point) {
        this.formatCoords(geom);
      }
      return;
    },
    panelButton() {
      alert(
        "This Panel can be used for user/project information and general interaction"
      );
    },
    onUpdatePosition(coordinate) {
      // alert(coordinate);
      this.deviceCoordinate = coordinate;
      this.$refs.map.$map.getView().animate({
        center: coordinate,
        zoom: this.$refs.map.$map.getView().getZoom() + 2
      });
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
    },
    setMeasureType(type) {
      this.measureType = type;
      this.measureOutput = "";
    },
    clearGeolocation() {
      this.$emit("geolocation:clear");
      this.deviceCoordinate = undefined;
    },
    clearMeasure() {
      this.$emit("measure:clear");

      this.measureType = undefined;
      this.measureOutput = "";
    },
    info() {
      const map = this.$refs.map.$map;
      const evtKey = map.on("singleclick", evt => {
        const viewResolution = map.getView().getResolution();
        map.forEachLayerAtPixel(evt.pixel, layer => {
          if (
            layer instanceof TileLayer &&
            typeof layer.getSource().getParams === "function" &&
            layer.values_.id === this.selectedLayer
          ) {
            const url = layer
              .getSource()
              .getGetFeatureInfoUrl(
                evt.coordinate,
                viewResolution,
                map.getView().getProjection(),
                { INFO_FORMAT: "application/json" }
              );
            this.$emit("info:get", url);
          }
        });
      });
      // console.log(evtKey);
      this.evtKey = evtKey;
    },
    clearInfo() {
      this.$emit("info:clear");
    },
    cancelInfo() {
      this.$emit("info:cancel");
      this.selectedLayer = null;
    },
    onFeatureInfoUpdate(e) {
      if (e.length > 0) {
        const extent = this.$refs.featureInfo.getSource().getExtent();
        this.$refs.map.$map.getView().fit(extent);
      }

      // alert(extent);
    },
    clearDraw() {
      this.$refs.draw.getSource().clear();
    },
    cancelDraw() {
      this.$emit("draw:cancel");
      this.drawType = "Point";
      this.clearDraw();
    },
    downloadKml() {
      const source = this.$refs.featureInfo.getSource();
      if (source) {
        const features = source.getFeatures();
        if (features && features.length > 0) {
          console.log(features[0].getId());
          const writer = new KML();
          const kml = writer.writeFeatures(features, {
            featureProjection: "EPSG:4326"
          });
          const data = new Blob([kml], {
            type: "application/vnd.google-earth.kml+xml"
          });

          saveAs(data, "features");
        }
      }
    },
    downloadGeojson() {
      const source = this.$refs.featureInfo.getSource();
      if (source) {
        const features = source.getFeatures();
        if (features && features.length > 0) {
          console.log(features);
          const writer = source.getFormat();
          const geojson = writer.writeFeatures(features, {
            featureProjection: "EPSG:4326"
          });
          const data = new Blob([geojson], {
            type: "application/json"
          });
          saveAs(data, "features.json");
        }
      }
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
::v-deep .v-toolbar__title {
  font-size: 1em;
}
::v-deep .mouse-position {
  background-color: #454545;
  color: #fff;
  border-radius: 4px;
  top: 0.5em;
  left: 3em;
  position: absolute;
  padding: 4px;
  margin: 2px;
}

::v-deep .ol-overviewmap {
  bottom: auto;
  left: auto;
  right: 0.5em;
  top: 2.5em;
}
.overlayWrapper {
  background: #fff;
  padding: 2px;
  color: black;
  overflow: auto;
  max-height: 15em;
  // border-radius: 10px;
  // border: 1px solid #cccccc;
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
::v-deep .infobtn {
  top: 9.5em;
  left: 0.5em;
}
::v-deep .ol-touch .infobtn {
  top: 9.21em;
}
::v-deep .printBtn {
  top: 12em;
  left: 0.5em;
  .v-icon {
    line-height: 0.5em;
    width: 0.5em;
  }
}
::v-deep .ol-touch .printBtn {
  top: 11.21em;
}
::v-deep .measureBtn {
  top: 14.5em;
  left: 0.5em;
  .v-icon {
    line-height: 0.5em;
    width: 0.5em;
  }
}
::v-deep .ol-touch .measureBtn {
  top: 13.71em;
}
::v-deep .drawBtn {
  top: 17em;
  left: 0.5em;
  .v-icon {
    line-height: 0.5em;
    width: 0.5em;
  }
}
::v-deep .ol-touch .drawBtn {
  top: 15.71em;
}
.here {
  background-color: white;
  font-size: 1em;
  color: black;
  padding: 0.4em;
  border: 2px solid black;
  border-radius: 5px;
}
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
