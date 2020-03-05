// import jsonp from "jsonp";
import axios from "axios";
import { saveAs } from "file-saver";
export async function fetchFeatureInfo({ url }) {
  console.log(url);
  const info = await axios({
    method: "get",
    url
  });
  return new Promise(resolve => resolve(info.data));
}
export async function fetchLayerKml({ layerName, baseUrl }) {
  const info = await axios({
    method: "get",
    url: `${baseUrl}?layers=${layerName}&mode=download`,
    responseType: "blob"
  });
  // const url = `${baseUrl}?layers=${layerName}`
  // console.log(url);
  saveAs(
    new Blob([info.data], { type: "application/vnd.google-earth.kml+xml" }),
    layerName
  );
}
// export function fetchFeatureInfo({ url }) {
//   return new Promise(resolve => {
//     jsonp(url, { name: "parseResponse", prefix: "" }, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//         resolve(data);
//       }
//     });
//   });

// return new Promise(resolve => resolve(info.data));
