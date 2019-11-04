import axios from "axios";

export async function fetchFeatureInfo({ url }) {
  const info = await axios({
    method: "get",
    url,
    responseType: "application/javascript"
  });
  return new Promise(resolve => resolve(info.data));
}
