<template>
  <v-footer app color="primary" height="60">
    <v-container fluid pa-0 ma-0>
      <v-layout row wrap justify-center align-center>
        <v-flex xs6 class="text-xs-center white--text">
          <v-layout row wrap>
            <v-flex xs4>
              <span>Name</span>
            </v-flex>
            <v-flex xs4>
              <span>Address</span>
            </v-flex>
            <v-flex xs4>
              <span>email@email.com</span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs2 class="text-xs-center">
          <img
            src="https://res.cloudinary.com/firvain/image/upload/v1582102708/combine2protect/43146029_550959865361662_1546593418069671936_o.png.png"
            height="40"
            contain
            alt="COMBINE2PROTECT logo"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  name: "TheFooter",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
