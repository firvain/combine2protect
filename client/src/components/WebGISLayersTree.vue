<template>
  <v-layout class="layersTree" fill-height>
    <v-card class="mx-auto" width="100%">
      <v-sheet class="pa-3 secondary darken-2">
        <v-text-field
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
      <v-card-text>
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
          class="text-no-wrap"
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
      return [
        {
          id: 1,
          title: "Base Layers",
          children: this.baseLayers
        },
        {
          id: 2,
          title: "Map Layers",
          children: this.vectorLayersReversed
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
  methods: {
    changeVisibility(item) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
/* fix for overflowing text in v-treeview */

.v-treeview-node__content,
::v-deep .v-treeview-node__label {
  flex-shrink: 1;
  font-size: 1em;
}
::v-deep .v-treeview-node--leaf {
  margin-left: 1em;
}
::v-deep .v-treeview-node__root {
  height: auto !important;
}
::v-deep .v-treeview-v-treeview-node__content {
  font-weight: 500;
}
</style>
