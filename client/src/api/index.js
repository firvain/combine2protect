import axios from "axios";

export async function fetchFeatureInfo({ url }) {
  const info = await axios({
    method: "get",
    url
  });
  return new Promise(resolve => resolve(info.data));
}
