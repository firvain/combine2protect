import Vue from "vue";
import Router from "vue-router";
import Intro from "./views/Intro";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      component: () => import(/* webpackChunkName: "404" */ "./views/404.vue")
    },
    {
      path: "/",
      name: "intro",
      component: Intro,
      children: []
    },

    {
      path: "/thelayout",
      name: "layout",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./views/TheLayout.vue"),
      children: [
        {
          path: "/home",
          name: "Home",
          component: () =>
            import(/* webpackChunkName: "HomeContent" */ "./views/Home.vue")
        },
        {
          path: "/specieshabitalsecosystems",
          name: "specieshabitals",
          component: () =>
            import(
              /* webpackChunkName: "SpeciesHabitatsEcosystems" */ "./views/SpeciesHabitatsEcosystems.vue"
            )
        },
        {
          path: "/consvbio",
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
            },
            {
              path: "/farming",
              name: "farming",
              component: () =>
                import(
                  /* webpackChunkName: "ecosystems" */ "./components/ConservationBiodiversityEcosystemsFarming.vue"
                )
            },
            {
              path: "/ias",
              name: "ias",
              component: () =>
                import(
                  /* webpackChunkName: "ecosystems" */ "./components/ConservationBiodiversityEcosystemsIAS.vue"
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
          component: () =>
            import(
              /* webpackChunkName: "branding" */ "./views/BrandAndAwards.vue"
            ),
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
              path: "/quiz",
              name: "quiz",
              component: () =>
                import(
                  /* webpackChunkName: "tgn" */ "./components//BrandingAndAwrardsMainQUIZ.vue"
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
        },
        {
          path: "/capacity",
          name: "capacity",
          component: () =>
            import(/* webpackChunkName: "capacity" */ "./views/Capacity.vue")
        },
        {
          path: "/news",
          name: "news",
          component: () =>
            import(/* webpackChunkName: "news" */ "./views/News.vue")
        },
        {
          path: "/table",
          name: "table",
          component: () =>
            import(/* webpackChunkName: "table" */ "./views/Table.vue")
        }
      ]
    }
  ]
});
