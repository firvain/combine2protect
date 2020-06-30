<template>
  <v-layout class="layersTree" pa-0 ma-0>
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
              v-if="hasTable(item)"
              small
              color="green"
              @click="fetchTable(item)"
            >
              mdi-table
            </v-icon>
            <v-icon
              v-if="hasInfo(item)"
              small
              color="purple"
              @click="showInfo(item)"
            >
              mdi-information
            </v-icon>
            <v-icon
              v-if="showOpacity(item)"
              small
              :color="item.opacity === 1 ? 'primary' : 'secondary'"
              @click="changeOpacity(item)"
            >
              mdi-opacity
            </v-icon>
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
      open: [2],
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
      let i = 10000;
      Object.keys(mapGroups).map(k => {
        const child = {
          id: i,
          title: k + " (" + mapGroups[k].length + ")",
          children: mapGroups[k]
        };
        subgroups.push(child);
        i = i + 1000;
      });
      // console.log(subgroups);
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
      // console.log(this.mapLayers);
      return this.caseSensitive
        ? (item, search, textKey) => {
            return item[textKey].indexOf(search) > -1;
          }
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
    // const height1 = document.getElementById("mycard").clientHeight;
    // const height2 = document.getElementById("mysearch").clientHeight;
    // document.getElementById("mylayers").style.height =
    //   height1 - height2 - 92 + "px";
  },
  methods: {
    ...mapActions("webgis", ["downloadLayer", "getTableData"]),
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
      } else if (!item.children) {
        return this.mapLayers[1].children.some(e => {
          const first = e.children.findIndex(c => c.id === item.id);
          // const last = e.children[e.children.length - 1].id === item.id;
          // if (last) console.log(item.title);
          if (first > 0) return true;
          // if (last) return true;
          return false;
        });
      }
    },

    showDown(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (!item.children) {
        const a = this.mapLayers[1].children;
        let b;
        for (let element of a) {
          const last = element.children[element.children.length - 1].id;
          if (last === item.id) {
            b = last === item.id;
            break;
          }
        }
        if (b) {
          return false;
        } else return true;
      }
      // const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      // if (isBaselayer > -1) {
      //   return false;
      // } else if (
      //   !item.children &&
      //   item.id !== this.mapLayers[this.mapLayers.length - 1].id
      // )
      //   return true;
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
    },
    showOpacity(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (!item.children && item.visible) {
        return true;
      }
    },
    hasInfo(item) {
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (!item.children && item.visible && item.group === "AUTH") {
        return true;
      }
    },
    async fetchTable(item) {
      let url;
      if (item.source && item.source.layers) {
        url = `https://raw.githubusercontent.com/firvain/c2b_data/master/${item.source.layers.replace(
          "combine2protect:",
          ""
        )}.csv`;
      }

      try {
        await this.getTableData(url);
        // let routeData = this.$router.resolve({ name: "table" });
        this.$router.push("/table");
      } catch (error) {
        console.log(error);
      }
    },
    hasTable(item) {
      let gitID;
      if (item.source && item.source.layers) {
        gitID = item.source.layers.replace("combine2protect:", "").slice(0, 2);
      }
      const isBaselayer = this.baseLayers.findIndex(x => x.id === item.id);
      if (isBaselayer > -1) {
        return false;
      } else if (
        !item.children &&
        item.visible &&
        item.group === "AUTH" &&
        this.isShapeFile(gitID)
      ) {
        return true;
      }
    },
    isShapeFile(id) {
      const shapeFiles = ["01", "02", "03", "04", "05", "07", "11", "14", "15"];
      if (shapeFiles.includes(id)) return true;
      return false;
    },
    showInfo(item) {
      window.open(
        `https://res.cloudinary.com/firvain/image/upload/combine2protect/references/${item.source.layers
          .replace("combine2protect:", "")
          .substring(0, 2)}.jpg`,
        "_blank"
      );
    },

    changeOpacity(item) {
      if (item.opacity === 1) {
        item.opacity = 0.3;
      } else {
        item.opacity = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.layersTree {
  height: 100%;
}
/* fix for overflowing text in v-treeview */
.scroll {
  overflow-y: auto;
  height: calc(100% - 164px);
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
