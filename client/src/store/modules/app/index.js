import { mapGettersFromStates } from "../../helpers";

const state = {
  pages: [
    { title: "Home", route: "home", subpages: [] },
    {
      title: "Species Habitats Ecosystems",
      route: "specieshabitalsecosystems",
      subpages: []
    },
    {
      title: "Conservation Biodiversity Ecosystems",
      route: "consvbio",
      subpages: [
        { title: "Wetland", route: "conservation" },
        {
          title: "The South East Panning Region",
          route: "biodiversity"
        },
        { title: "The common Conservation Network", route: "ecosystems" }
      ]
    },
    { title: "Protection and Monitoring", route: "promon", subpages: [] },
    { title: "Gis Platform", route: "webgis", subpages: [] },
    {
      title: "Branding and Awards",
      route: "branding",
      subpages: [
        { title: "Branding Sheme Products", route: "bsp" },
        {
          title: "Branding Sheme Services",
          route: "bss"
        },
        { title: "Destination of Exellence Award", route: "dea" },
        { title: "The Green Network", route: "tgn" }
      ]
    },
    { title: "Capacity Building", route: "capacity", subpages: [] },
    { title: "News", route: "news", subpages: [] }
  ]
};

const getters = {
  ...mapGettersFromStates({
    states: state
  })
};

const mutations = {
  // updateValue: (state, payload) => {
  //   state.value = payload;
  // }
};

const actions = {
  // updateActionValue({ commit }) {
  //   commit("updateValue", payload);
  // }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
