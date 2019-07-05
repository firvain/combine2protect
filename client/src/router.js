import Vue from "vue";
import Router from "vue-router";
import Intro from "./views/Intro";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "intro",
      component: Intro,
      children: []
    },
    {
      path: "/home",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "HomeContent" */ "./views/Home.vue")
    },
    {
      path: "/specieshabitals",
      name: "specieshabitals",
      component: () =>
        import(
          /* webpackChunkName: "SpeciesHabitats" */ "./views/SpeciesHabitats.vue"
        )
    },
    {
      path: "/consvbio",
      name: "consvbio",
      component: () =>
        import(
          /* webpackChunkName: "ConservationBiodiversityEcosystems" */ "./views/ConservationBiodiversityEcosystems.vue"
        ),
      children: [
        {
          path: "",
          name: "consvbiomain",
          component: () =>
            import(
              /* webpackChunkName: "ConservationBiodiversityEcosystemsMain" */ "./components/ConservationBiodiversityEcosystemsMain.vue"
            )
        },
        {
          path: "/conservation",
          name: "conservation",
          component: () =>
            import(
              /* webpackChunkName: "conservation" */ "./components/ConservationBiodiversityEcosystemsConservation.vue"
            )
        },
        {
          path: "/biodiversity",
          name: "biodiversity",
          component: () =>
            import(
              /* webpackChunkName: "biodiversity" */ "./components/ConservationBiodiversityEcosystemsBiodiversity.vue"
            )
        },
        {
          path: "/ecosystems",
          name: "ecosystems",
          component: () =>
            import(
              /* webpackChunkName: "ecosystems" */ "./components/ConservationBiodiversityEcosystemsEcosystems.vue"
            )
        }
      ]
    },

    {
      path: "/promon",
      name: "promon",
      component: () =>
        import(
          /* webpackChunkName: "promon" */ "./views/ProtectionMonitoring.vue"
        )
    },
    {
      path: "/webgis",
      name: "webgis",
      component: () =>
        import(/* webpackChunkName: "webgis" */ "./views/WebGIS.vue")
    },
    {
      path: "/branding",
      name: "branding",
      component: () =>
        import(/* webpackChunkName: "branding" */ "./views/BrandAndAwards.vue"),
      children: [
        {
          path: "",
          name: "brandingmain",
          component: () =>
            import(
              /* webpackChunkName: "brandingmain" */ "./components/BrandingAndAwrardsMain.vue"
            )
        },
        {
          path: "/bsp",
          name: "bsp",
          component: () =>
            import(
              /* webpackChunkName: "bsp" */ "./components//BrandingAndAwrardsBSP.vue"
            )
        },
        {
          path: "/bss",
          name: "bss",
          component: () =>
            import(
              /* webpackChunkName: "bss" */ "./components//BrandingAndAwrardsBSS.vue"
            )
        },
        {
          path: "/dea",
          name: "dea",
          component: () =>
            import(
              /* webpackChunkName: "dea" */ "./components//BrandingAndAwrardsDEA.vue"
            )
        },
        {
          path: "/tgn",
          name: "tgn",
          component: () =>
            import(
              /* webpackChunkName: "tgn" */ "./components//BrandingAndAwrardsMainTGN.vue"
            )
        }
      ]
    }
  ]
});
