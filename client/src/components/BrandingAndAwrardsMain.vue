<template>
  <v-container fluid grid-list-lg fill-height>
    <v-layout row wrap align-start justify-center>
      <v-flex xs12>
        <v-card elevetion="0">
          <v-card-text primary-title>
            <div class="full">{{ $t(`pages[5].content[0].msg`) }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-container fluid
          ><v-layout row wrap align-center justify-center>
            <v-flex xs12 md4>
              <v-card height="300">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="250px"
                ></v-img>
                <v-card-actions d-flex style="justify-content: center;">
                  <v-btn small color="primary" flat to="/BSP" class="text-none">
                    {{ $t(`pages[5].subpages[0].title`) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card height="300">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="250px"
                ></v-img>
                <v-card-actions d-flex style="justify-content: center;">
                  <v-btn small color="primary" flat to="/BSS" class="text-none">
                    {{ $t(`pages[5].subpages[1].title`) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card height="300">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="250px"
                ></v-img>
                <v-card-actions d-flex style="justify-content: center;">
                  <v-btn small color="primary" flat to="/DEA" class="text-none">
                    {{ $t(`pages[5].subpages[2].title`) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card height="300">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                  height="250px"
                ></v-img>
                <v-card-actions d-flex style="justify-content: center;">
                  <v-btn small color="primary" flat to="/TGN" class="text-none">
                    {{ $t(`pages[5].subpages[3].title`) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "BrandingAndAwardsMain",
  data() {
    return {
      cardText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Senectus et netus et malesuada fames ac turpis egestas sed. Facilisis leo vel fringilla est ullamcorper eget nulla. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Condimentum id venenatis a condimentum vitae sapien pellentesque. Sit amet purus gravida quis blandit turpis cursus in hac. Sit amet facilisis magna etiam tempor. Fringilla ut morbi tincidunt augue interdum velit euismod. Arcu dui vivamus arcu felis bibendum ut tristique et. Consequat semper viverra nam libero justo laoreet. Ut sem viverra aliquet eget sit. Varius morbi enim nunc faucibus a pellentesque. Orci a scelerisque purus semper eget duis at.
Et netus et malesuada fames ac turpis. Maecenas ultricies mi eget mauris pharetra et ultrices. Eget aliquet nibh praesent tristique. Ultrices in iaculis nunc sed augue lacus viverra vitae. Turpis in eu mi bibendum neque egestas congue. Vitae elementum curabitur vitae nunc. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Rhoncus mattis rhoncus urna neque viverra justo. Ornare suspendisse sed nisi lacus sed viverra. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Lectus nulla at volutpat diam ut venenatis. Purus gravida quis blandit turpis cursus in hac habitasse. Mauris augue neque gravida in fermentum et sollicitudin ac. Scelerisque fermentum dui faucibus in ornare quam viverra.
Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Tellus at urna condimentum mattis pellentesque id nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada. Lorem ipsum dolor sit amet consectetur adipiscing elit duis tristique. Viverra tellus in hac habitasse platea dictumst vestibulum. Viverra accumsan in nisl nisi scelerisque eu. Turpis egestas maecenas pharetra convallis posuere morbi. Vitae suscipit tellus mauris a diam maecenas. Quis risus sed vulputate odio. Fames ac turpis egestas integer. Id diam maecenas ultricies mi eget mauris. Adipiscing elit duis tristique sollicitudin nibh sit amet commodo.
Netus et malesuada fames ac turpis egestas maecenas pharetra. Sagittis id consectetur purus ut. Ac auctor augue mauris augue neque gravida in. Ullamcorper eget nulla facilisi etiam dignissim diam quis. Commodo ullamcorper a lacus vestibulum sed. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Arcu non sodales neque sodales ut etiam sit amet. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Sit amet mattis vulputate enim nulla aliquet porttitor. Amet nulla facilisi morbi tempus. Fames ac turpis egestas maecenas. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Mi tempus imperdiet nulla malesuada pellentesque.
Id consectetur purus ut faucibus. Sed odio morbi quis commodo odio. Ipsum dolor sit amet consectetur adipiscing elit ut. Dictum varius duis at consectetur. Morbi tristique senectus et netus et malesuada fames ac. Dictumst quisque sagittis purus sit amet volutpat. Molestie ac feugiat sed lectus. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Rhoncus dolor purus non enim praesent elementum facilisis. Nullam ac tortor vitae purus.`
    };
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
