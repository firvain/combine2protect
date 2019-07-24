<template>
  <v-card flat>
    <v-footer :value="show" fixed height="64" color="white">
      <v-layout justify-center align-center row wrap>
        <v-menu open-on-hover offset-y top>
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
              <flag :iso="activeLocale" :squared="false" />
            </v-btn>
          </template>

          <v-list dense nav>
            <v-list-tile
              v-for="lang in langs"
              :key="lang.iso"
              href="#"
              :class="{ smallLettersList: $vuetify.breakpoint.lgAndDown }"
            >
              <v-list-tile-action @click="changeLocal(lang.iso)">
                <flag :iso="lang.iso" :title="lang.title" :squared="false" />
              </v-list-tile-action>
              <v-list-tile-title>{{
                lang.iso.toUpperCase()
              }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <!-- <v-menu open-on-hover top offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="accent" dark v-on="on">
              Data
            </v-btn>
          </template>

          <v-list>
            <v-list-tile
              v-for="(item, index) in home"
              :key="index"
              @click="gotoText"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu> -->
        <v-btn color="accent" to="/home">
          {{ $t("pages[0].content[0].title") }}
        </v-btn>
        <v-btn color="accent" to="/home">
          {{ $t("pages[0].content[1].title") }}
        </v-btn>
        <v-btn color="accent" to="/home">
          {{ $t("pages[0].content[2].title") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-2" fab small to="/home">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-card>
</template>
<script>
export default {
  name: "BottomNav",
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      langs: [
        { iso: "gb", title: "English" },
        { iso: "gr", title: "Ελληνικά" },
        { iso: "mk", title: "македонски јазик" }
      ],
      home: [
        { title: "DataSet1" },
        { title: "DataSet2" },
        { title: "DataSet3" },
        { title: "DataSet4" }
      ]
    };
  },
  computed: {
    activeLocale() {
      return this.$i18n.locale;
    }
  },
  methods: {
    changeLocal(e) {
      this.$i18n.locale = e;
    }
  }
};
</script>
<style lang="sass" scoped></style>
