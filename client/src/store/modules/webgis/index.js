import { mapGettersFromStates } from "../../helpers";

const state = {};

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
