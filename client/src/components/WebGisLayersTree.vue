<template>
  <v-layout class="layersTree" fill-height>
    <v-card class="mx-auto" width="100%">
      <v-sheet class="pa-3 secondary">
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
    mapLayers() {
      return [
        {
          id: 1,
          title: "Base Layers",
          children: this.baseLayers
        },
        {
          id: 2,
          title: "Vector Layers",
          children: this.vectorLayers
        }
      ];
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    }
  },
  methods: {
    changeVisibility(item) {
      console.log(item);
      const { id, visible } = item;
      this.$emit("change:visible", { id, visible: !visible });
    }
  }
};
</script>
<style lang="scss" scoped></style>
