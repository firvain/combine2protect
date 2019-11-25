<template>
  <v-layout class="layersTree" fill-height>
    <v-card id="mycard" class="mx-auto" width="100%">
      <v-sheet class="pa-3 secondary darken-2">
        <v-text-field
          id="mysearch"
          v-model="search"
          label="search"
          dark
          flat
          solo-inverted
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
        <v-checkbox
          v-model="caseSensitive"
          dark
          hide-details
          label="case sensitive"
        ></v-checkbox>
      </v-sheet>
      <v-card-text id="mylayers" class="scroll">
        <v-treeview
          :active.sync="activeTreeItem"
          :items="mapLayers"
          item-text="title"
          item-id="id"
          :search="search"
          :filter="filter"
          :open.sync="open"
          activatable
          active-class="accent lighten-4 accent--text"
          selected-color="accent"
          open-on-click
          :open-all="true"
        >
          <template v-slot:prepend="{ item, activeTreeItem }">
            <v-icon
              v-if="!item.children"
              :color="activeTreeItem ? 'accent' : ''"
              @click="changeVisibility(item)"
              v-text="
                `mdi-${
                  item.visible === true ? 'eye-outline' : 'eye-off-outline'
                }`
              "
            ></v-icon
          ></template>
          <template v-slot:append="{ item, activeTreeItem }">
            <v-icon
              v-if="!item.children && item.quearable"
              @click="downloadKml(item)"
            >
              mdi-download
            </v-icon>
          </template>
          <!-- <template v-slot:append="{ item, activeTreeItem }">
            <v-icon
              v-if="showDown(item)"
              small
              :color="activeTreeItem ? 'accent' : ''"
              @click="moveDown(item.id)"
            >
              mdi-arrow-down
            </v-icon>
            <v-icon
              v-if="showUp(item)"
              small
              :color="activeTreeItem ? 'accent' : ''"
              @click="moveUp(item.id)"
            >
              mdi-arrow-up
            </v-icon>
          </template> -->
        </v-treeview>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LayersTree",
  props: {
    baseLayers: {
      type: Array,
      default: () => []
    },
    vectorLayers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: [],
      search: null,
      caseSensitive: false,
      activeTreeItem: []
    };
  },
  computed: {
    vectorLayersReversed() {
      return [...this.vectorLayers].reverse();
    },
    mapLayers() {
      const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result;
        }, {}); // empty object is the initial value for result object
      };
      const mapGroups = groupBy(this.vectorLayersReversed, "group");
      const subgroups = [];
      let i = 1;
      Object.keys(mapGroups).map(k => {
        const child = {
          id: i,
          title: k + " (" + mapGroups[k].length + ")",
          children: mapGroups[k]
        };
        subgroups.push(child);
        i++;
      });
      return [
        {
          id: 1,
          title: "Base Layers",
          children: this.baseLayers
        },
        {
          id: 2,
          title: "Map Layers (" + this.vectorLayersReversed.length + ")",
          children: subgroups
        }
      ];
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  watch: {
    activeTreeItem(newValue) {
      if (newValue && newValue.length > 0) {
        this.$emit("change:activeTreeItem", newValue);
      } else this.$emit("change:activeTreeItem", null);
    }
  },
  mounted() {
    const height1 = document.getElementById("mycard").clientHeight;
    const height2 = document.getElementById("mysearch").clientHeight;
    document.getElementById("mylayers").style.height =
      height1 - height2 - 92 + "px";
  },
  methods: {
    ...mapActions("webgis", ["downloadLayer"]),
    changeVisibility(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer !== -1) {
        this.baseLayers.map(x => {
          if (x.id === item.id) {
            this.$emit("change:visible", { id, visible: !visible });
          } else {
            this.$emit("change:visible", { id: x.id, visible: !!visible });
          }
        });
      }

      const { id, visible } = item;
      this.$emit("change:visible", { id, visible: !visible });
    },
    showUp(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (
        !item.children &&
        item.id !== this.vectorLayersReversed[0].id
      ) {
        return true;
      }
    },
    showDown(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (
        !item.children &&
        item.id !==
          this.vectorLayersReversed[this.vectorLayersReversed.length - 1].id
      )
        return true;
    },
    moveUp(id) {
      this.$emit("change:moveUp", id);
    },
    moveDown(id) {
      this.$emit("change:moveDown", id);
    },
    async downloadKml(item) {
      const layerName = item.source.layers;
      const baseUrl = process.env.VUE_APP_GEOSERVER_URL + "/kml";
      this.downloadLayer({
        type: "kml",
        layerName: layerName,
        baseUrl: baseUrl
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/* fix for overflowing text in v-treeview */
.scroll {
  overflow-y: auto;
  // height: 500px;
}
::v-deep
  .v-treeview-node--leaf
  > .v-treeview-node__root
  > .v-treeview-node__content
  > .v-treeview-node__label {
  flex-shrink: 1;
  font-size: 0.9em;
}
::v-deep .v-treeview-node--leaf {
  margin-left: 0em;
}
::v-deep .v-treeview-node {
  margin-left: 0.5em;
}
::v-deep .v-treeview-node__root {
  height: auto !important;
}
::v-deep .v-treeview-v-treeview-node__content {
  font-weight: 500;
}
</style>
