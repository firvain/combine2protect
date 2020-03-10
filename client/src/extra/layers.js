import axios from "axios";
async function getLayers() {
  try {
    const response = await axios({
      // headers: {
      //   headers: { "Access-Control-Allow-Origin": "*" }
      // },
      method: "GET",
      url: `${process.env.VUE_APP_GEOSERVER_API}/workspaces/combine2protect//layers.json`
    });

    return response.data.layers.layer;
  } catch (error) {
    console.log(error);
  }
}

const layerConfig = {
  cmp: "vl-layer-tile",
  visible: false,
  quearable: true,
  opacity: 1
};
const sourceConfig = {
  cmp: "vl-source-wms",
  url: process.env.VUE_APP_GEOSERVER_URL,
  extParams: { TILED: true },
  serverType: "geoserver",
  crossOrigin: "anonymous",
  projection: "EPSG:4326"
};

let mapLayers = [
  {
    id: 200,
    title: "(A) Lime",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_A_Lime"
    },
    zIndex: 200
  },
  {
    id: 201,
    title: "(CL SCL,SiCL) Clay Loam, Sandy Clay Loam,Silty Clay Loam",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers:
        "combine2protect:1960_CL_SCL_SiCL_Clay_Loam_Sandy_Clay_Loam_Silty_Clay_Loam"
    },
    zIndex: 201
  },
  {
    id: 202,
    title: "(C) Clay",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_C_Clay"
    },
    zIndex: 202
  },
  {
    id: 203,
    title: "(LS) Loamy Sand",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_LS_Loamy_Sand"
    },
    zIndex: 203
  },
  {
    id: 204,
    title: "(L+SiL) Loam Silty Loam",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_L_SiL_Loam_Silty_Loam"
    },
    zIndex: 204
  },
  {
    id: 205,
    title: "Organic Soils",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_Organic_Soils"
    },
    zIndex: 205
  },
  {
    id: 206,
    title: "(SL) Sandy Loam",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_SL_Sandy_Loam"
    },
    zIndex: 206
  },
  {
    id: 207,
    title: "Study Area",
    ...layerConfig,
    group: "1960 Soil Study of Chimaditida",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1960_Study_Area"
    },
    zIndex: 207
  },
  {
    id: 208,
    title: " (CL) Clay Loam",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_CL_Clay_Loam"
    },
    zIndex: 208
  },
  {
    id: 209,
    title: " (C) Clay",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_C_Clay"
    },
    zIndex: 209
  },
  {
    id: 210,
    title: " (LS) Loamy Sand",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_LS_Loamy_Sand"
    },
    zIndex: 210
  },
  {
    id: 211,
    title: " (L) Loam",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_L_Loam"
    },
    zIndex: 211
  },
  {
    id: 212,
    title: " (SCL) Sandy Clay Loam",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_SCL_Sandy_Clay_Loam"
    },
    zIndex: 212
  },
  {
    id: 213,
    title: " (SC) Sandy Clay",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_SC_Sandy_Clay"
    },
    zIndex: 213
  },
  {
    id: 214,
    title: " (SL) Sandy Loam",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_SL_Sandy_Loam"
    },
    zIndex: 214
  },
  {
    id: 215,
    title: " (SiL) Silty Loam",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_SiL_Silty_Loam"
    },
    zIndex: 215
  },
  {
    id: 216,
    title: " Study Area",
    ...layerConfig,
    group: "1961 Soil Study of Florina Plain",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1961_Perimeter"
    },
    zIndex: 216
  },
  {
    id: 217,
    title: " Very Coarse Grained Soil",
    ...layerConfig,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1990_Very_Coarse_Grained_Soil"
    },
    zIndex: 217
  },
  {
    id: 218,
    title: " Coarse to Medium Fine Soil",
    ...layerConfig,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1990_Coarse_To_Medium_Fine_Soil"
    },
    zIndex: 218
  },
  {
    id: 219,
    title: " Fine Grained Soil",
    ...layerConfig,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1990_Fine_Grained_Soil"
    },
    zIndex: 219
  },
  {
    id: 220,
    title: " Old Alluvium Deposits",
    ...layerConfig,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1990_Old_Alluvium_Deposit"
    },
    zIndex: 220
  },
  {
    id: 221,
    title: " Organic Soil",
    ...layerConfig,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:1990_Organic_Soil"
    },
    zIndex: 221
  },
  {
    id: 222,
    title: "SPASCI",
    ...layerConfig,
    group: "Protected Areas",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:SPASCI"
    },
    zIndex: 222
  },
  {
    id: 223,
    title: "SPA",
    ...layerConfig,
    group: "Protected Areas",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:SPA"
    },
    zIndex: 223
  },
  {
    id: 224,
    title: "SCI",
    ...layerConfig,
    group: "Protected Areas",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:SCI"
    },
    zIndex: 224
  },
  {
    id: 225,
    title: "Unified Points",
    ...layerConfig,
    group: "Other",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:Unified"
    },
    zIndex: 225
  },
  {
    id: 226,
    title: "Cattle",
    ...layerConfig,
    group: "Other",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:cattle"
    },
    zIndex: 226
  },
  {
    id: 227,
    title: "Image Example (AUTH)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:Acip_brev",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 227
  },
  {
    id: 228,
    title: "Shapefile Example (AUTH)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:WDPA_cleaning"
    },
    zIndex: 228
  }
];
async function getMapLayers() {
  const geoserverLayers = await getLayers();
  mapLayers.map(l => {
    const found = geoserverLayers.find(
      e => `combine2protect:${e.name}` === l.source.layers
    );
    l["href"] = found.href;
  });
  return mapLayers;
}

export { getMapLayers };
