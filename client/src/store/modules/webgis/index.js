import { mapGettersFromStates } from "../../helpers";
import {
  SET_MAP_STATUS,
  SET_DRAW_TYPE,
  SET_MEASURE_TYPE
} from "../../mutation-types";
const state = {
  mapStatus: "display",
  drawType: "Point",
  measureType: "LineString"
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
  }
};

const actions = {
  updateMapStatus({ commit }, payload) {
    commit("SET_MAP_STATUS", payload);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
