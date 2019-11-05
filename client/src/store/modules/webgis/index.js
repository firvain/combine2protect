import { mapGettersFromStates } from "../../helpers";
import {
  SET_MAP_STATUS,
  SET_DRAW_TYPE,
  SET_MEASURE_TYPE,
  SET_FEATURE_INFO,
  SET_SHOWPANEL
} from "../../mutation-types";
import { fetchFeatureInfo } from "../../../api";
const state = {
  mapStatus: "display",
  drawType: "Point",
  measureType: "LineString",
  featureInfo: {},
  featureInfoTable: "",
  showPanel: true
};
const getters = {
  ...mapGettersFromStates({
    states: state
  })
};
const mutations = {
  [SET_MAP_STATUS]: (state, payload) => {
    state.mapStatus = payload;
  },
  [SET_DRAW_TYPE]: (state, payload) => {
    state.drawType = payload;
  },
  [SET_MEASURE_TYPE]: (state, payload) => {
    state.measureType = payload;
  },
  [SET_FEATURE_INFO]: (state, payload) => {
    state.featureInfo = payload;
  },

  [SET_SHOWPANEL]: (state, payload) => {
    state.showPanel = payload;
  }
};

const actions = {
  updateMapStatus({ commit }, payload) {
    commit("SET_MAP_STATUS", payload);
  },
  updateMeasureType({ commit }, payload) {
    commit("SET_MEASURE_TYPE", payload);
    commit("SET_SHOWPANEL", true);
  },
  getFeatureInfo({ commit }, payload) {
    commit("SET_FEATURE_INFO", {});
    // const { coordinate, resolution, projection, params, source } = payload;
    fetchFeatureInfo(payload).then(info => {
      console.log(info);
      commit("SET_FEATURE_INFO", info);
      commit("SET_SHOWPANEL", true);
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
