// import jsonp from "jsonp";
import axios from "axios";
export async function fetchFeatureInfo({ url }) {
  const info = await axios({
    method: "get",
    url
  });
  return new Promise(resolve => resolve(info.data));
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
