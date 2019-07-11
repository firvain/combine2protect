import { mapGettersFromStates } from "../../helpers";
import i18n from "../../../plugins/i18n";
console.log(i18n.t("pages[2].subpages[0].title"));
import { SET_LANGUAGE, SET_LOADING, SET_PAGES } from "../../mutation-types";
import axios from "axios";

let url;
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3000/api";
} else {
  url = process.env.VUE_APP_API_URL;
}
axios.defaults.baseURL = url;

import { getPages } from "../../../services/api.js";

const state = {
  pages: [],
  loading: false
};

const getters = {
  ...mapGettersFromStates({
    states: state
  })
};

const mutations = {
  [SET_LANGUAGE]: (state, payload) => {
    state.value = payload;
  },
  [SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SET_PAGES]: (state, payload) => {
    state.pages = payload;
  }
};

const actions = {
  async fetchPages({ commit }) {
    try {
      commit("SET_LOADING", true);
      const pages = await getPages();
      // const response = await axios.get("/pages");
      // console.log(response.data);
      commit("SET_PAGES", pages);
    } catch (error) {
      console.log(error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  updateLoading({ commit }, payload) {
    commit("SET_LOADING", payload);
  },
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
