<template>
  <div>
    <SiteToolBar></SiteToolBar>
    <v-content>
      <v-container grid-list-xl fluid>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex d-flex xs12>
            <v-card>
              <v-card-text>
                <read-more
                  more-str="read more"
                  :text="lorem"
                  link="#"
                  less-str="read less"
                  :max-chars="1200"
                  class="full"
                ></read-more>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 d-flex class="text-xs-center display-2">
            <div>Workshops</div>
          </v-flex>
          <v-flex
            d-flex
            xs12
            v-for="workshop in workshops"
            :key="workshop.title"
          >
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-layout row wrap>
                  <v-flex d-flex xs12 class="text-xs-center headline accent">
                    <div class="white--text">{{ workshop.title }}</div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex xs4 class="full">
                <div>{{ workshop.text }}</div>
              </v-flex>
              <v-flex d-flex xs4>
                <v-img height="120" width="120" contain :src="workshop.img">
                </v-img>
              </v-flex>
              <v-flex d-flex xs4>
                <v-layout row wrap>
                  <v-flex xs4 v-for="i in 5" :key="i">
                    <v-btn
                      color="primary"
                      flat
                      :href="workshop.link"
                      target="_blank"
                      >Link</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 d-flex class="text-xs-center display-2"
            ><div>Training Seminars</div>
          </v-flex>

          <v-flex
            d-flex
            xs12
            v-for="(seminar, idx) in trainingSeminars"
            :key="idx"
          >
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-layout row wrap>
                  <v-flex d-flex xs12 class="text-xs-center headline accent">
                    <div class="white--text">{{ seminar.title }}</div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex xs4 class="full">
                <div>{{ seminar.text }}</div>
              </v-flex>
              <v-flex d-flex xs4>
                <v-img height="120" width="120" contain :src="seminar.img">
                </v-img>
              </v-flex>
              <v-flex d-flex xs4>
                <v-layout row wrap>
                  <v-flex xs4 v-for="i in 5" :key="i">
                    <v-btn
                      color="primary"
                      flat
                      :href="seminar.link"
                      target="_blank"
                      >Link</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 d-flex>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 d-flex class="text-xs-center display-2"
            ><div>Experience Exchange</div>
          </v-flex>
          <v-flex
            d-flex
            xs12
            v-for="experience in experiences"
            :key="experience.title"
          >
            <v-layout row wrap>
              <v-flex d-flex xs12>
                <v-layout row wrap>
                  <v-flex d-flex xs12 class="text-xs-center headline accent">
                    <div class="white--text">{{ experience.title }}</div>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex d-flex xs4 class="full">
                <div>{{ experience.text }}</div>
              </v-flex>
              <v-flex d-flex xs4>
                <v-img height="120" width="120" contain :src="experience.img">
                </v-img>
              </v-flex>
              <v-flex d-flex xs4>
                <v-layout row wrap>
                  <v-flex xs4 v-for="i in 5" :key="i">
                    <v-btn
                      color="primary"
                      flat
                      :href="experience.link"
                      target="_blank"
                      >Link</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
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
  name: "capacity",
  components: {
    SiteToolBar,
    TheFooter
  },
  data() {
    return {
      lorem: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisi cras fermentum odio eu feugiat. Adipiscing at in tellus integer. Magna sit amet purus gravida quis blandit turpis cursus. Sit amet facilisis magna etiam tempor. Lacus viverra vitae congue eu consequat. Egestas dui id ornare arcu odio ut sem nulla. Id eu nisl nunc mi. Varius quam quisque id diam vel quam elementum pulvinar etiam. Egestas sed sed risus pretium quam. Vitae elementum curabitur vitae nunc. Sed arcu non odio euismod lacinia at quis risus.
Aliquet lectus proin nibh nisl. Amet mauris commodo quis imperdiet massa. Tempor commodo ullamcorper a lacus vestibulum sed. Vestibulum morbi blandit cursus risus at. Tempor orci dapibus ultrices in. Nunc consequat interdum varius sit amet mattis. Consectetur a erat nam at lectus urna duis. Sit amet volutpat consequat mauris nunc congue nisi. Nunc id cursus metus aliquam eleifend mi in nulla. Porttitor leo a diam sollicitudin. Scelerisque in dictum non consectetur a. Nulla pharetra diam sit amet nisl suscipit. Tortor consequat id porta nibh.
Urna nunc id cursus metus aliquam eleifend mi in nulla. Non tellus orci ac auctor augue. Viverra aliquet eget sit amet tellus cras adipiscing enim eu. Amet est placerat in egestas erat imperdiet sed. Eget gravida cum sociis natoque. Nunc eget lorem dolor sed viverra ipsum. Et leo duis ut diam quam nulla porttitor massa. Faucibus interdum posuere lorem ipsum dolor sit amet. Mus mauris vitae ultricies leo. Morbi blandit cursus risus at ultrices mi. Habitasse platea dictumst quisque sagittis purus sit. Enim eu turpis egestas pretium aenean pharetra magna. Ut sem viverra aliquet eget sit amet tellus cras. Sagittis aliquam malesuada bibendum arcu vitae elementum. Vulputate sapien nec sagittis aliquam malesuada bibendum. Gravida quis blandit turpis cursus. Sed blandit libero volutpat sed cras. Sem viverra aliquet eget sit amet tellus cras. Mauris rhoncus aenean vel elit scelerisque.
Elit pellentesque habitant morbi tristique senectus et netus. Ornare arcu odio ut sem nulla pharetra diam sit. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Platea dictumst quisque sagittis purus. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. In nibh mauris cursus mattis molestie a. Convallis aenean et tortor at risus. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Tempus imperdiet nulla malesuada pellentesque. Mauris cursus mattis molestie a. Tellus orci ac auctor augue mauris augue. Aenean et tortor at risus viverra adipiscing at in. Ultrices tincidunt arcu non sodales neque. Volutpat sed cras ornare arcu. Elementum eu facilisis sed odio morbi quis. Sit amet consectetur adipiscing elit pellentesque. Turpis cursus in hac habitasse. Pellentesque elit eget gravida cum.
Non consectetur a erat nam at lectus urna duis convallis. Tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Et leo duis ut diam quam nulla porttitor. Vitae congue mauris rhoncus aenean vel. Magna fermentum iaculis eu non diam phasellus. Turpis in eu mi bibendum neque egestas congue quisque. Massa tempor nec feugiat nisl pretium fusce id velit ut. Quis risus sed vulputate odio ut enim. Mattis rhoncus urna neque viverra justo. Odio morbi quis commodo odio. Massa id neque aliquam vestibulum morbi. Auctor eu augue ut lectus. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Velit laoreet id donec ultrices tincidunt arcu non. Sit amet consectetur adipiscing elit pellentesque habitant. Vitae proin sagittis nisl rhoncus mattis rhoncus urna.`,
      workshops: [
        {
          title: "Workshop 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Workshop 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Workshop 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        }
      ],
      trainingSeminars: [
        {
          title: "Training Seminar 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Training Seminar 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Training Seminar 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        }
      ],
      experiences: [
        {
          title: "Training Seminar 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Training Seminar 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        },
        {
          title: "Training Seminar 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1322261/pdf/bmj33101540.pdf"
        }
      ]
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
