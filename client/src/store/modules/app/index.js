import { mapGettersFromStates } from "../../helpers";
import i18n from "../../../plugins/i18n";
console.log(i18n.t("pages[2].subpages[0].title"));
import { SET_LANGUAGE } from "../../mutation-types";

const state = {
  pages: [
    {
      title: i18n.t("pages[0].title"),
      route: "home",
      subpages: []
    },
    {
      title: i18n.t("pages[1].title"),
      route: "specieshabitalsecosystems",
      subpages: []
    },
    {
      title: i18n.t("pages[2].title"),
      route: "consvbio",
      subpages: [
        {
          title: i18n.t("pages[2].subpages[0].title"),
          route: "conservation"
        },
        {
          title: i18n.t("pages[2].subpages[1].title"),
          route: "biodiversity"
        },
        {
          title: i18n.t("pages[2].subpages[2].title"),
          route: "ecosystems"
        }
      ]
    },
    {
      title: i18n.t("pages[3].title"),
      route: "promon",
      subpages: []
    },
    {
      title: i18n.t("pages[4].title"),
      route: "webgis",
      subpages: []
    },
    {
      title: i18n.t("pages[5].title"),
      route: "branding",
      subpages: [
        {
          title: i18n.t("pages[5].subpages[0].title"),
          route: "bsp"
        },
        {
          title: i18n.t("pages[5].subpages[1].title"),
          route: "bss"
        },
        {
          title: i18n.t("pages[5].subpages[2].title"),
          route: "dea"
        },
        {
          title: i18n.t("pages[5].subpages[3].title"),
          route: "tgn"
        }
      ]
    },
    {
      title: i18n.t("pages[6].title"),
      route: "capacity",
      subpages: []
    },
    {
      title: i18n.t("pages[7].title"),
      route: "news",
      subpages: []
    }
  ]
};

const getters = {
  ...mapGettersFromStates({
    states: state
  })
};

const mutations = {
  [SET_LANGUAGE]: (state, payload) => {
    state.value = payload;
  }
};

const actions = {
  updateActionLanguage({ commit }, payload) {
    commit("SET_LANGUAGE", payload);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
