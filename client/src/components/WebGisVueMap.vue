<template>
  <v-flex xs12 d-flex fill-height pa-0>
    <vl-map
      id="mymap"
      ref="map"
      class="mymap"
      :load-tiles-while-animating="false"
      :load-tiles-while-interacting="false"
      :default-controls="{ attribution: true, rotate: false, zoom: true }"
      @mounted="onMapMounted"
      @postcompose="onMapPostCompose"
    >
      <vl-view
        :zoom.sync="zoom"
        :min-zoom="minZoom"
        :max-zoom="maxzoom"
        :center.sync="center"
        :rotation.sync="rotation"
        :extent="extent"
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
                <vl-style-fill v-if="st.fill" v-bind="st.fill"></vl-style-fill>
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
      <vl-layer-vector
        v-if="nomimatimResults.length > 0"
        :id="utilityLayers[2].id"
        :ref="utilityLayers[2].ref"
        :visible="utilityLayers[2].visible"
        :z-index="utilityLayers[2].zIndex"
      >
        <vl-source-vector
          :ident="utilityLayers[2].source.ident"
          :features.sync="nomimatimResults"
        >
          <vl-style-func :factory="nomimatimStyleFactory"> </vl-style-func>
        </vl-source-vector>
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
      <vl-layer-vector ref="featureInfo" key="9900001" :z-index="9900003">
        <vl-source-vector
          v-if="featureInfo.crs"
          :features="featureInfo.features"
          @update:features="onFeatureInfoUpdate"
        >
        </vl-source-vector>
      </vl-layer-vector>
      <vl-layer-vector
        ref="uploadedFeatures"
        render-mode="image"
        :z-index="lastZindex"
      >
        <vl-source-vector
          ref="uploadedFeaturesSource"
          :features.sync="uploadedFeatures"
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
              {{ $t("pages[4].content[0].panelText.display") }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                small
                href="https://res.cloudinary.com/firvain/image/upload/v1574936982/Combine2Protect_GIS_Platform_End-User_Manual_v1.1.0.pdf"
                target="_blank"
              >
                {{ $t("pages[4].content[1].labels.manual") }}</v-btn
              >
            </v-card-actions>
          </template>
          <template v-if="mapStatus === 'geolocation'">
            <v-card-text v-if="!deviceCoordinate" class="full">{{
              $t("pages[4].content[0].panelText.geolocation")
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
                :class="
                  $vuetify.breakpoint.xs === true
                    ? 'overlayWrapper-xs'
                    : 'overlayWrapper'
                "
              >
                <Strong>{{ featureInfo.features[0].id }}</Strong>

                <ul>
                  <li
                    v-for="k in Object.keys(featureInfo.features[0].properties)"
                    :key="k"
                  >
                    {{ k }} : {{ featureInfo.features[0].properties[k] }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <div class="full">
                  {{ $t("pages[4].content[0].panelText.info") }}
                </div>
                <v-select
                  v-model="selectedLayer"
                  :items="availableForSelectionLayers"
                  item-text="title"
                  item-value="id"
                  :label="$t('pages[4].content[1].labels.selectToQuety')"
                  dense
                  flat
                ></v-select>
              </div>
            </v-card-text>
            <v-divider
              v-if="
                Object.keys(featureInfo).length !== 0 &&
                  featureInfo.constructor === Object &&
                  featureInfo.crs
              "
            ></v-divider>
            <v-card-actions>
              <v-layout row wrap justify-center>
                <v-flex
                  v-if="
                    Object.keys(featureInfo).length !== 0 &&
                      featureInfo.constructor === Object &&
                      featureInfo.crs
                  "
                  d-flex
                  xs12
                >
                  <v-layout row wrap justify-center>
                    <v-flex d-flex xs12 md6>
                      <v-btn small flat @click="downloadKml">
                        <v-icon left small>mdi-cloud-download-outline</v-icon>
                        kml</v-btn
                      ></v-flex
                    >
                    <v-flex d-flex xs12 md6>
                      <v-btn small flat @click="downloadGeojson">
                        <v-icon left small>mdi-cloud-download-outline</v-icon
                        >geojson
                      </v-btn>
                    </v-flex>
                    <v-flex d-flex xs12 md6>
                      <v-btn small flat @click="downloadTopoJSON">
                        <v-icon left small>mdi-cloud-download-outline</v-icon
                        >topojson
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex d-flex xs6>
                  <v-btn
                    v-if="
                      Object.keys(featureInfo).length !== 0 &&
                        featureInfo.constructor === Object
                    "
                    small
                    flat
                    @click="clearInfo"
                    >{{ $t("pages[4].content[1].labels.clear") }}</v-btn
                  >
                </v-flex>
                <v-flex d-flex xs6>
                  <v-btn small flat @click="cancelInfo">{{
                    $t("pages[4].content[1].labels.cancel")
                  }}</v-btn>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </template>
          <template v-if="mapStatus === 'print'">
            <v-card-text>{{
              $t("pages[4].content[0].panelText.print")
            }}</v-card-text>
          </template>
          <template v-if="mapStatus === 'measure'">
            <v-card-actions>
              <v-btn
                flat
                icon
                :color="measureType === 'LineString' ? 'primary' : 'secondary'"
                @click="setMeasureType('LineString')"
                ><v-icon>mdi-tape-measure</v-icon></v-btn
              >
              <v-btn
                :color="measureType === 'Polygon' ? 'primary' : 'secondary'"
                flat
                icon
                @click="setMeasureType('Polygon')"
                ><v-icon>mdi-texture-box</v-icon></v-btn
              >
              <v-btn
                :color="measureType === 'Point' ? 'primary' : 'secondary'"
                flat
                icon
                @click="setMeasureType('Point')"
                ><v-icon>mdi-target</v-icon></v-btn
              >
              <v-select
                v-if="measureType === 'LineString'"
                v-model="lengthUnit"
                :items="lengthUnits"
                :label="$t('pages[4].content[1].labels.lengthUnit')"
                dense
                flat
              ></v-select>
              <v-select
                v-if="measureType === 'Polygon'"
                v-model="areaUnit"
                :items="areaUnits"
                :label="$t('pages[4].content[1].labels.areaUnit')"
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
              <v-btn small flat @click="clearMeasure">{{
                $t("pages[4].content[1].labels.cancel")
              }}</v-btn>
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
                :label="$t('pages[4].content[0].panelText.draw')"
                dense
                flat
              ></v-select
            ></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small flat @click="clearDraw">{{
                $t("pages[4].content[1].labels.clear")
              }}</v-btn>
              <v-btn small flat @click="cancelDraw">{{
                $t("pages[4].content[1].labels.cancel")
              }}</v-btn>
            </v-card-actions>
          </template>
          <template v-if="mapStatus === 'dragdrop'">
            <v-card-text
              v-if="
                Object.keys(selectedFeature).length === 0 &&
                  selectedFeature.constructor === Object
              "
            >
              {{ $t("pages[4].content[0].panelText.dragdrop") }}
            </v-card-text>
            <v-card-text v-else>
              <div v-if="selectedFeature.valid" class="overlayWrapper">
                <Strong>{{ selectedFeature.id }}</Strong>
                <ul>
                  <li
                    v-for="k in Object.keys(selectedFeature.properties)"
                    :key="k"
                  >
                    {{ k }} : {{ selectedFeature.properties[k] }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <p>{{ $t("pages[4].content[0].panelText.invalid") }}</p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small flat @click="clearUploaded">{{
                $t("pages[4].content[1].labels.clearUploaded")
              }}</v-btn>
              <v-btn small flat @click="cancelUploaded">{{
                $t("pages[4].content[1].labels.cancel")
              }}</v-btn>
            </v-card-actions>
          </template>
          <template v-if="mapStatus === 'nomimatim'">
            <v-card-text>
              <v-text-field
                v-model="nomimatimInput"
                label="Powered by Nomimatim"
                placeholder="e.g. Florina"
              ></v-text-field>
              <div
                v-if="nomimatimResults.length > 0 && nomimatimInput"
                class="overlayWrapper"
              >
                <v-list two-line dense>
                  <template v-for="(result, i) in nomimatimResults">
                    <v-list-tile
                      :key="i"
                      @click="
                        zoomToNomimatimResult(result.geometry.coordinates)
                      "
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{ i }} {{ result.properties.type.toUpperCase() }}
                        </v-list-tile-title>
                        <v-list-tile-sub-title>
                          {{
                            result.properties.display_name.trim()
                          }}</v-list-tile-sub-title
                        >
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider :key="result.id"></v-divider>
                  </template>
                </v-list>
                <!-- <ul>
                    <li
                      v-for="(result, i) in nomimatimResults"
                      :key="i"
                      class="nomimatimList"
                      @click="
                        zoomToNomimatimResult({
                          extent: result.boundingbox
                        })
                      "
                    >
                      {{ result.display_name.trim() }}
                    </li>
                  </ul> -->
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="nomimatimInput" small flat @click="searchNomimatim"
                >{{ $t("pages[4].content[1].labels.search") }}
              </v-btn>
              <v-btn small flat @click="cancelNomimatimSearch">
                {{ $t("pages[4].content[1].labels.cancel") }}
              </v-btn>
            </v-card-actions>
          </template>
        </template>
      </v-card>
    </div>
  </v-flex>
</template>
<script>
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import ZoomToExtent from "ol/control/ZoomToExtent";
import { getArea, getLength } from "ol/sphere.js";
import { unByKey } from "ol/Observable";
import { createStringXY } from "ol/coordinate";
import { DragAndDrop } from "ol/interaction.js";
import { GPX, GeoJSON, IGC, KML, TopoJSON, WMSCapabilities } from "ol/format";
import {
  GeolocatioControl,
  InfoControl,
  PrintControl,
  MeasureControl,
  DrawControl,
  DragAndDropControl
  // NomimatimControl
} from "../extra/ol-custom-controls.js";
import { Polygon, LineString, Point } from "ol/geom.js";

import { findPointOnSurface, createStyle } from "vuelayers/lib/ol-ext";

import { saveAs } from "file-saver";
import { omit } from "../extra/utils";

import { topology } from "topojson-server";

import axios from "axios";

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
      center: [22.525, 40.65],
      minZoom: 6,
      zoom: 8,
      maxzoom: 15,
      rotation: 0,
      drawnFeatures: [],
      measuredFeatures: [],
      uploadedFeatures: [],
      extent: [20, 38, 25, 44],
      printSize: [(297 * 72) / 25.4, (210 * 72) / 25.4],
      deviceCoordinate: undefined,
      measureType: undefined,
      drawType: "Point",
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
      evtKey: {},
      selectedLayer: null,
      selectedFeature: {},
      nomimatimInput: "",
      nomimatimResults: []
    };
  },
  computed: {
    availableForSelectionLayers() {
      return this.vectorLayers.filter(x => {
        if (x.cmp === "vl-layer-tile" && x.quearable && x.visible) {
          return true;
        }
      });
    },
    lastZindex() {
      return 200 + this.vectorLayers.length + 1;
    },
    panelInfo() {
      let msg;
      switch (this.mapStatus) {
        case "display":
          msg = this.$t("pages[4].content[1].labels.panelTitle.general");
          break;
        case "info":
          msg = this.$t("pages[4].content[1].labels.panelTitle.featureInfo");
          break;
        case "draw":
          msg = this.$t("pages[4].content[1].labels.panelTitle.draw");
          break;
        case "measure":
          msg = this.$t("pages[4].content[1].labels.panelTitle.measure");
          break;
        case "geolocation":
          msg = this.$t("pages[4].content[1].labels.panelTitle.geolocation");
          break;
        case "print":
          msg = this.$t("pages[4].content[1].labels.panelTitle.print");
          break;
        case "dragdrop":
          msg = this.$t("pages[4].content[1].labels.panelTitle.draganddrop");
          break;
        case "nomimatim":
          msg = this.$t("pages[4].content[1].labels.panelTitle.nomimatim");
          break;
        default:
          msg = this.$t("pages[4].content[1].labels.panelTitle.general");
          break;
      }
      return msg;
    },

    drawTypes() {
      return [
        {
          id: 1,
          label: this.$t("pages[4].content[1].labels.drawTypes.point"),
          value: "Point"
        },
        {
          id: 2,
          label: this.$t("pages[4].content[1].labels.drawTypes.linestring"),
          value: "LineString"
        },
        {
          id: 3,
          label: this.$t("pages[4].content[1].labels.drawTypes.polygon"),
          value: "Polygon"
        }
      ];
    }
  },
  watch: {
    mapStatus(newValue) {
      switch (newValue) {
        case "print":
          unByKey(this.evtKey);
          this.print();
          break;
        case "info":
          unByKey(this.evtKey);
          this.info();
          break;
        case "geolocation":
          unByKey(this.evtKey);
          break;
        case "measure":
          unByKey(this.evtKey);
          break;
        case "draw":
          unByKey(this.evtKey);
          break;
        case "dragdrop":
          unByKey(this.evtKey);
          this.dragAndDrop();
          break;
        case "nomimatim":
          unByKey(this.evtKey);
          break;
        default:
          unByKey(this.evtKey);
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
    },
    selectedLayer(newValue) {
      const map = this.$refs.map.$map;
      const parser = new WMSCapabilities();
      map.getLayers().forEach(l => {
        if (newValue === l.get("id")) {
          const selectedLayerName = l
            .getSource()
            .getParams()
            .LAYERS.split(":")[1];
          axios
            .get(
              process.env.VUE_APP_GEOSERVER_URL +
                "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities"
            )
            .then(r => {
              const result = parser.read(r.data);
              if (result) {
                const extent = result.Capability.Layer.Layer.find(
                  l => l.Name === selectedLayerName
                ).EX_GeographicBoundingBox;
                map.getView().fit(extent);
              }
            });
        }
      });

      // console.log(selectedExtent);
    }
  },
  mounted() {
    this.$emit("map:loading", true);
    const map = this.$refs.map.$map;
    if (map) {
      map.updateSize();
    }
  },

  methods: {
    waitFix() {
      setTimeout(() => {
        this.$refs.map.$map.updateSize();
        this.$emit("map:loading", false);
      }, 5000);
    },
    pointOnSurface: findPointOnSurface,
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
        new DrawControl(),
        new DragAndDropControl()
        // new NomimatimControl()
      ]);

      this.waitFix();
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
        createStyle({
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
      this.$refs.measure.getSource().clear();
      this.measureType = undefined;
      this.measureOutput = "";
    },
    info() {
      const map = this.$refs.map.$map;
      const evtKey = map.on("singleclick", evt => {
        const viewResolution = map.getView().getResolution();
        map.forEachLayerAtPixel(
          evt.pixel,
          layer => {
            const url = layer
              .getSource()
              .getGetFeatureInfoUrl(
                evt.coordinate,
                viewResolution,
                map.getView().getProjection(),
                { INFO_FORMAT: "application/json" }
              );
            this.$emit("info:get", url);
            // }
          },
          {
            layerFilter: layer => layer.values_.id === this.selectedLayer
          }
        );
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
          // console.log(features);
          const writer = source.getFormat();
          const geojson = writer.writeFeatures(features, {
            featureProjection: "EPSG:4326"
          });
          const data = new Blob([geojson], {
            type: "application/json"
          });
          saveAs(data, "features");
        }
      }
    },
    downloadTopoJSON() {
      const source = this.$refs.featureInfo.getSource();
      if (source) {
        const features = source.getFeatures();
        if (features && features.length > 0) {
          const writer = source.getFormat();
          const geojson = writer.writeFeaturesObject(features, {
            featureProjection: "EPSG:4326"
          });
          const topo = topology({ foo: geojson });
          const data = new Blob([JSON.stringify(topo)], {
            type: "application/json"
          });

          saveAs(data, "features");
        }
      }
    },
    dragAndDrop() {
      const map = this.$refs.map.$map;
      const dd = new DragAndDrop({
        formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON]
      });
      map.getInteractions().forEach(int => {
        if (int instanceof DragAndDrop) map.removeInteraction(int);
      });

      map.addInteraction(dd);
      dd.on("addfeatures", evt => {
        this.$refs.uploadedFeaturesSource.$source.clear();
        if (!evt.features) {
          this.selectedFeature = Object.assign(
            {},
            { id: null },
            { properties: {} },
            { valid: false }
          );
          return;
        }
        this.$refs.uploadedFeaturesSource.addFeatures(evt.features);
        const extent = this.$refs.uploadedFeaturesSource.$source.getExtent();
        map.getView().fit(extent);
        const file = evt.file;
        unByKey(this.evtKey);
        const evtKey = map.on("singleclick", evt => {
          map.forEachFeatureAtPixel(
            evt.pixel,
            feature => {
              const id = feature.getId();
              const featureProps = feature.getProperties();
              const realProps = omit(featureProps, ["geometry"]);
              if (file.type === "application/vnd.google-earth.kml+xml") {
                let filtered = {};
                if (realProps.description) {
                  realProps.description
                    .split("\n")
                    .filter(el => {
                      return el.includes("<li>");
                    })
                    .map(el => {
                      const line = el
                        .replace(/<[^>]*>/g, "")
                        .trim()
                        .split(":");
                      let k = line[0];
                      let v = line[1];
                      const object = { [k]: v };
                      filtered = { ...filtered, ...object };
                    });
                } else {
                  filtered = realProps;
                }
                this.selectedFeature = Object.assign(
                  {},
                  { id },
                  { properties: filtered },
                  { valid: true }
                );
              } else if (file.type === "application/json") {
                this.selectedFeature = Object.assign(
                  {},
                  { id },
                  { properties: realProps },
                  { valid: true }
                );
              }
            },
            {
              layerFilter: layer => layer === this.$refs.uploadedFeatures.$layer
            }
          );
        });
        this.evtKey = evtKey;
      });
    },
    clearUploaded() {
      this.$refs.uploadedFeaturesSource.clear();
      this.selectedFeature = {};
    },
    cancelUploaded() {
      this.$emit("upload:cancel");
      const map = this.$refs.map.$map;
      map.getInteractions().forEach(int => {
        if (int instanceof DragAndDrop) map.removeInteraction(int);
      });
      this.clearUploaded();
    },
    async searchNomimatim() {
      try {
        const response = await axios({
          type: "GET",
          url: "https://nominatim.openstreetmap.org/search",
          params: {
            q: this.nomimatimInput,
            format: "geojson",
            viewbox:
              this.extent[0] +
              "," +
              this.extent[1] +
              "," +
              this.extent[2] +
              "," +
              this.extent[3],
            bounded: 1,
            countrycodes: "gr,mk"
          },
          responseType: "json"
        });
        this.nomimatimResults = response.data.features;
      } catch (error) {
        console.log(error);
      }
    },
    zoomToNomimatimResult(coordinates) {
      //   parseFloat(extent[2]),
      //   parseFloat(extent[0]),
      //   parseFloat(extent[3]),
      //   parseFloat(extent[1])
      // ];
      // this.$refs.map.$map.getView().fit(e, this.$refs.map.$map.getSize());
      this.$refs.map.$map.getView().animate({
        center: coordinates,
        zoom: this.$refs.map.$map.getView().getZoom() + 12
      });
    },
    cancelNomimatimSearch() {
      this.nomimatimResults = [];
      this.nomimatimInput = "";
      this.$emit("nomimatim:cancel");
    },
    nomimatimStyleFactory() {
      return feature => {
        const graf = [
          createStyle({
            imageRadius: 10,
            strokeColor: "#fff",
            fillColor: "#3399cc"
          })
        ];

        if (feature && feature.getProperties().icon) {
          const icon = [
            createStyle({
              imageSrc: feature.getProperties().icon
            })
          ];
          return icon;
        }
        return graf;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.mapWrapper {
  position: relative;
}
.mymap {
  position: relative;
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
}
.overlayWrapper-xs {
  background: #fff;
  padding: 2px;
  color: black;
  overflow: auto;
  max-height: 5em;
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
  top: 7.21em;
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
  top: 13.21em;
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
::v-deep .dragAndDropBtn {
  top: 19.5em;
  left: 0.5em;
  .v-icon {
    line-height: 0.5em;
    width: 0.5em;
  }
}
::v-deep .ol-touch .dragAndDropBtn {
  top: 15.21em;
}

::v-deep .nomimatimBtn {
  top: 22em;
  left: 0.5em;
  .v-icon {
    line-height: 0.5em;
    width: 0.5em;
  }
}
::v-deep .ol-touch .dragAndDropBtn {
  top: 16.71em;
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
.nomimatimList:hover {
  background-color: #454545;
  color: white;
  cursor: zoom-in;
}
</style>
