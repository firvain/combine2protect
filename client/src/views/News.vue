<template>
  <v-content>
    <v-container grid-list-lg fluid fill-height>
      <v-layout row wrap align-start justify-start>
        <v-flex d-flex xs12 md8 order-xs2 order-md1>
          <v-layout row wrap pa-2>
            <v-flex d-flex xs12>
              <v-layout row wrap fill-height>
                <v-card>
                  <v-card-title
                    primary-title
                    class="primary white--text title "
                  >
                    {{ news[page - 1].title }}
                  </v-card-title>
                  <v-card-title
                    primary-title
                    class="subtitle font-weight-medium "
                  >
                    {{ news[page - 1].date }}
                  </v-card-title>
                  <v-card-text>
                    <div class="full">
                      {{ news[page - 1].text }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-layout>
            </v-flex>
            <v-flex d-flex xs12>
              <div class="text-xs-center">
                <v-pagination
                  v-model="page"
                  :length="news.length"
                ></v-pagination>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          d-flex
          xs12
          md4
          order-xs1
          order-md2
          :class="{ fullheight: this.$vuetify.breakpoint.smAndUp }"
        >
          <v-card>
            <v-toolbar color="cyan" dark>
              <v-toolbar-title>{{
                $t("pages[7].content[0].latest")
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-list>
              <template v-for="(item, index) in latest">
                <v-list-tile :key="index">
                  <v-list-tile-avatar>
                    <img :src="item.img" />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
export default {
  name: "news",
  components: {},
  data() {
    return {
      page: 1,
      news: [
        {
          title: "New 1",
          date: "01-01-0000",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          linκ: "https://ekloges.ypes.gr/current/v/home/",
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg"
        },
        {
          title: "New 2",
          date: "01-01-0000",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          linκ: "https://ekloges.ypes.gr/current/v/home/",
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg"
        },
        {
          title: "New 3",
          date: "01-01-0000",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          linκ: "https://ekloges.ypes.gr/current/v/home/",
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg"
        },
        {
          title: "New 4",
          date: "01-01-0000",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          linκ: "https://ekloges.ypes.gr/current/v/home/",
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg"
        },
        {
          title: "New 5",
          date: "01-01-0000",
          text: `quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis eu volutpat odio facilisis mauris sit amet massa vitae tortor condimentum lacinia quis vel eros donec ac odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et`,
          linκ: "https://ekloges.ypes.gr/current/v/home/",
          img:
            "https://res.cloudinary.com/firvain/image/upload/c_thumb,w_200,g_face/v1562350962/combine2protect/placeimg_640_480_nature2.jpg"
        }
      ]
    };
  },
  computed: {
    latest() {
      return this.news.slice(Math.max(this.news.length - 3, 1)).reverse();
    }
  }
};
</script>
<style lang="scss" scoped>
.full {
  text-align: justify;
  text-justify: inter-word;
}
.fullheight {
  height: 100%;
}
</style>
