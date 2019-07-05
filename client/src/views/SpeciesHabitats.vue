<template>
  <div>
    <SiteToolBar></SiteToolBar>

    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row wrap justify-start align-start fill-height>
          <v-flex xs12>
            <v-container fluid grid-list-md>
              <v-layout row wrap justify-center align-start fill-height>
                <v-flex xs10>
                  <v-card elevetion="0">
                    <v-card-title primary-title>
                      <div>{{ cardText }}</div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs2>
                  <v-img
                    src="https://via.placeholder.com/120x90/0000FF/808080/?text=BookBanner"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                aspect-ratio="2.75"
              ></v-img>
              <v-card-title primary-title>
                <div>info</div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <TheFooter> </TheFooter>
  </div>
</template>
<script>
import SiteToolBar from "@/components/SiteToolBar.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "habitats",
  components: {
    SiteToolBar,
    TheFooter
  },
  data() {
    return {
      cardText:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat."
    };
  }
};
</script>
<style lang="scss" scoped></style>
