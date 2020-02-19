<template>
  <v-layout row wrap align-center fill-height align-content-center justify-end>
    <v-flex xs1>v1.1.3</v-flex>
    <!-- <v-flex d-flex shrink>
      <v-btn
        icon
        :color="mapStatus === 'draw' ? 'red' : 'white'"
        @click="SET_MAP_STATUS('draw')"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
    </v-flex> -->
    <!-- <v-flex d-flex shrink>
      <v-btn
        icon
        :color="mapStatus === 'measure' ? 'red' : 'white'"
        @click="SET_MAP_STATUS('measure')"
      >
        <v-icon>mdi-tape-measure</v-icon>
      </v-btn>
    </v-flex> -->
    <!-- <v-flex d-flex shrink>
      <v-btn
        icon
        :color="mapStatus === 'info' ? 'red' : 'white'"
        @click="SET_MAP_STATUS('info')"
      >
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </v-flex> -->
    <!-- <v-flex d-flex shrink>
      <v-btn
        icon
        :color="mapStatus === 'print' ? 'red' : 'white'"
        @click="SET_MAP_STATUS('print')"
      >
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-flex> -->
    <!-- <v-flex
      v-if="mapStatus !== 'display'"
      d-flex
      grow
      class="module text-xs-center"
      fill-height
    >
      <v-layout row wrap align-center>
        <v-flex v-if="mapStatus === 'draw'" d-flex xs12 pl-1>
          <v-radio-group
            ref="drawTypeRadioPicker"
            v-model="radioGroupDraw"
            row
            hide-details
            dark
          >
            <v-radio
              v-for="item in radioGroupItems"
              :key="item.id"
              :label="item.label"
              :value="item.value"
              dark
            ></v-radio>
          </v-radio-group>
        </v-flex> -->
    <!-- <v-flex v-if="mapStatus === 'measure'" d-flex xs12 pl-1>
          <v-radio-group
            ref="drawTypeRadioPicker"
            v-model="radioGroupMeasure"
            row
            hide-details
            dark
          >
            <v-radio
              v-for="item in radioGroupItems.slice(1)"
              :key="item.id"
              :label="item.label"
              :value="item.value"
              dark
            ></v-radio>
          </v-radio-group>
        </v-flex> -->
    <!-- </v-layout>
    </v-flex> -->
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Maptools",
  data() {
    return {
      radioGroupItems: [
        {
          id: 1,
          label: "Point",
          value: "Point"
        },
        {
          id: 2,
          label: "LineString",
          value: "LineString"
        },
        {
          id: 3,
          label: "Polygon",
          value: "Polygon"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("webgis", ["mapStatus", "drawType", "measureType"]),
    radioGroupDraw: {
      get() {
        return this.drawType;
      },
      set(value) {
        // console.log(value);
        this.SET_DRAW_TYPE(value);
      }
    },
    radioGroupMeasure: {
      get() {
        return this.measureType;
      },
      set(value) {
        this.SET_MEASURE_TYPE(value);
      }
    }
  },
  methods: {
    // ...mapActions("webgis", ["updateMapStatus"]),
    ...mapMutations("webgis", [
      "SET_MAP_STATUS",
      "SET_DRAW_TYPE",
      "SET_MEASURE_TYPE"
    ])
  }
};
</script>
<style lang="scss" scoped>
.module {
  .v-input--selection-controls {
    padding: 0;
    margin: 0;
  }
}
</style>
