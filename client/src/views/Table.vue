<template>
  <v-layout row wrap justify-center>
    <v-flex xs8 pt-4>
      <v-card mx-auto>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <v-btn color="primary" flat dark @click="$router.go(-1)">
            {{ $t("comps.back") }}
          </v-btn>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="tableItems"
          :item-key="itemKey"
          dense
          class="elevation-4 pl-2 pr-2"
        >
          <template v-slot:items="props">
            <td v-for="(p, i) in props.item" :key="i" class="text-xs-left">
              {{ p }}
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
// import { mapGetters } from "vuex";

export default {
  name: "Table",
  data: () => ({
    selected: []
  }),
  computed: {
    ...mapGetters("webgis", ["tableHeaders", "tableItems"]),
    headers() {
      return this.tableHeaders.map(e => {
        return { text: e, value: e };
      });
      // return [
      //   {
      //     text: "Dessert (100g serving)",
      //     align: "left",
      //     value: "name"
      //   },
      //   { text: "Calories", value: "calories" },
      //   { text: "Fat (g)", value: "fat" },
      //   { text: "Carbs (g)", value: "carbs" },
      //   { text: "Protein (g)", value: "protein" },
      //   { text: "Iron (%)", value: "iron" }
      // ];
    },
    desserts() {
      // return this.tableItems.map(e => {
      //   return
      // })
      return [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ];
    },
    itemKey() {
      return this.tableHeaders[0];
    }
  },

  methods: {}
};
</script>

<style></style>
