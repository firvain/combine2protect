import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api";

export const getPages = async () => {
  try {
    const response = await axios.get("/pages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
