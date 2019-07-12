import axios from "axios";

let url;
if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3000/api";
} else {
  url = process.env.VUE_APP_API_URL;
}
axios.defaults.baseURL = url;

export const getPages = async () => {
  try {
    const response = await axios.get("/pages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
