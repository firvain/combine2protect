<template>
  <v-app>
    <!-- <Ribbon
      text="Site is in BETA Version"
      color="#009688"
      fixed
      position="left-top"
    ></Ribbon> -->
    <!-- <ToolBar :show="showToolbar"></ToolBar> -->
    <TheLoader></TheLoader>
    <cookie-consent
      message="This website might use cookies to ensure you get the best experience. If you continue we assume that you agree with that."
      href="https://en.pdm.gov.gr/privacy-policy/"
    ></cookie-consent>
    <v-content>
      <router-view :pages="pages"></router-view>
    </v-content>
  </v-app>
</template>
<script>
// import Ribbon from "vue-ribbon";
import CookieConsent from "vue-cookieconsent-component";
import TheLoader from "@/components/TheLoader.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    // Ribbon,
    TheLoader,
    CookieConsent
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("app", ["loading", "pages"])
  },
  async created() {
    await this.fetchPagesLocal();
  },
  methods: {
    ...mapActions("app", ["fetchPagesLocal"])
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  background-color: transparent;
}
.cookie-consent section {
  display: inline-block;
}
.cookie-consent-message {
  padding-right: 1em;
}
.cookie-consent-compliance {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
