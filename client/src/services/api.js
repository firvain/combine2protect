import store from "../store/index";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.interceptors.request.use(
  config => {
    store.commit("app/SET_LOADING", true);
    return config;
  },
  error => {
    store.commit("app/SET_LOADING", false);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response => {
    store.commit("app/SET_LOADING", false);
    return response;
  },
  error => {
    store.commit("app/SET_LOADING", false);
    return Promise.reject(error);
  }
);

export const getPages = async () => {
  try {
    const response = await axios.get("/pages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export function loaderFactory() {
  return async extent => {
    // let url = vm.$source.getUrl();
    const url =
      process.env.VUE_APP_API_URL +
      "/layers/WDPA_cleaning/" +
      extent[0] +
      "/" +
      extent[1] +
      "/" +
      extent[2] +
      "/" +
      extent[3];
    try {
      const response = await axios.get(url, {
        timeout: 30000
      });
      const text = response.data;
      return this.$source.getFormat().readFeatures(text, {
        featureProjection: this.viewProjection,
        dataProjection: this.resolvedDataProjection
      });
    } catch (error) {
      console.log(error);
      const e = {
        msg: error,
        id: this.$parent.$props.id
      };
      this.$emit("error", e);
    }
  };
}
