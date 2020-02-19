<template>
  <v-container grid-list-xl fluid fill-height>
    <v-layout row wrap align-center justify-center>
      <v-flex d-flex xs12>
        <v-card>
          <v-card-text>
            <read-more
              :more-str="$t(`comps.readmore.more`)"
              :text="$t(`pages[6].content[0].msg`)"
              link="#"
              :less-str="$t('comps.readmore.less')"
              :max-chars="1200"
              class="full"
            ></read-more>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 d-flex class="text-xs-center headline font-weight-medium">
          <div>Workshops</div>
        </v-flex>
        <v-flex v-for="workshop in workshops" :key="workshop.title" d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12 class="text-xs-center title">
              <div>{{ workshop.title }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4 class="full">
              <div>{{ workshop.text }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-img max-height="250" contain :src="workshop.img"> </v-img>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-layout row wrap>
                <v-flex v-for="i in 6" :key="i" xs4>
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
            <v-flex xs12 d-flex>
              <b class="hr"></b>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-flex xs12 d-flex>
        <v-divider></v-divider>
      </v-flex>

      <v-layout row wrap>
        <v-flex xs12 d-flex class="text-xs-center headline font-weight-medium">
          <div>Seminars</div>
        </v-flex>
        <v-flex v-for="seminar in seminars" :key="seminar.title" d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12 class="text-xs-center title">
              <div>{{ seminar.title }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4 class="full">
              <div>{{ seminar.text }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-img max-height="250" contain :src="seminar.img"> </v-img>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-layout row wrap>
                <v-flex v-for="i in 6" :key="i" xs4>
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
      </v-layout>

      <v-flex xs12 d-flex>
        <v-divider></v-divider>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12 d-flex class="text-xs-center headline font-weight-medium">
          <div>Experience Exchange</div>
        </v-flex>
        <v-flex
          v-for="experience in experiences"
          :key="experience.title"
          d-flex
          xs12
        >
          <v-layout row wrap>
            <v-flex d-flex xs12 class="text-xs-center title">
              <div>{{ experience.title }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4 class="full">
              <div>{{ experience.text }}</div>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-img max-height="250" contain :src="experience.img"> </v-img>
            </v-flex>
            <v-flex d-flex xs12 md4>
              <v-layout row wrap>
                <v-flex v-for="i in 6" :key="i" xs4>
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
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Capacity",
  components: {},
  data() {
    return {
      workshops: [
        {
          title: "Workshop 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Workshop 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Workshop 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350958/combine2protect/placeimg_640_480_nature3.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        }
      ],
      seminars: [
        {
          title: "Training Seminar 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Training Seminar 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Training Seminar 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562351216/combine2protect/placeimg_640_480_nature1.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        }
      ],
      experiences: [
        {
          title: "Experience 1",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Experience 2",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        },
        {
          title: "Experience 3",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg",
          link:
            "https://res.cloudinary.com/firvain/image/upload/v1582107143/placeholder.pdf"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
$bg: #10111f;
$barsize: 15px;
.full {
  text-align: justify;
  text-justify: inter-word;
}
</style>
