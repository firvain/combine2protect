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

export const mapLayers = [
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
    title: "Coarse to Medium Fine Soil",
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
    title: "Fine Grained Soil",
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
    title: "Old Alluvium Deposits",
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
    title: "Organic Soil",
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
    title: "Flood Hazard 500y",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:35_Flood_Hazard_500y",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 227
  },
  {
    id: 228,
    title: "Flood Hazard 200y",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:34_Flood_Hazard_200y",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 228
  },
  {
    id: 229,
    title: "Flood Hazard 50y",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:33_Flood_Hazard_50y",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 229
  },
  {
    id: 230,
    title: "Flood Hazard 20y",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:32_Flood_Hazard_20y",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 230
  },
  {
    id: 231,
    title: "Flood Hazard 10y",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:31_Flood_Hazard_10y",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 231
  },
  {
    id: 232,
    title: "Precipitation Seasonality_BIO15(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:30_Precipitation Seasonality_BIO15_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 232
  },
  {
    id: 233,
    title: "Precipitation Seasonality BIO15(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:29_Precipitation Seasonality_BIO15_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 233
  },
  {
    id: 234,
    title: "Annual Precipitation-BIO12(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:28_Annual Precipitation-BIO12_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 234
  },
  {
    id: 235,
    title: "Annual Precipitation-BIO12(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:27_Annual Precipitation-BIO12_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 235
  },
  {
    id: 236,
    title: "Min Temperature of Coldest Month–BIO6(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers:
        "combine2protect:26_Minimum Temperature of Coldest Month–BIO6_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 236
  },
  {
    id: 237,
    title: "Min Temperature of Coldest Month–BIO6(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers:
        "combine2protect:25_Minimum Temperature of Coldest Month–BIO6_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 237
  },
  {
    id: 238,
    title: "Max Temperature of Warmest Month-BIO5(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers:
        "combine2protect:24_Maximum Temperature of Warmest Month-BIO5_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 238
  },
  {
    id: 239,
    title: "Max Temperature of Warmest Month-BIO5(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers:
        "combine2protect:23_Maximum Temperature of Warmest Month-BIO5_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 239
  },
  {
    id: 240,
    title: "Mean Diurnal Range-BIO2(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:22_Mean Diurnal Range-BIO2_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 240
  },
  {
    id: 241,
    title: "Mean Diurnal Range-BIO2(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:21_Mean Diurnal Range-BIO2_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 241
  },
  {
    id: 242,
    title: "Annual Mean Temperature-BIO1(future)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:20_Annual Mean Temperature-BIO1_future",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 242
  },
  {
    id: 243,
    title: "Annual Mean Temperature-BIO1(current)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:19_Annual Mean Temperature-BIO1_current",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 243
  },
  {
    id: 244,
    title: "Nightlights",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:18_Nightlights",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 244
  },
  {
    id: 245,
    title: "CORINE Land Cover 2018",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:13_CORINE_Land_Cover_2018",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 245
  },
  {
    id: 246,
    title: "Ecosystem types",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:12_Ecosystem_types",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 246
  },
  {
    id: 247,
    title: "Administrative Statistical Units(NUTS)",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:01_Administrative_Statistical_Units_NUTS"
    },
    zIndex: 247
  },

  {
    id: 248,
    title: "Roads",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:02_Roads"
    },
    zIndex: 248
  },
  {
    id: 249,
    title: "Railways",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:03_Railways"
    },
    zIndex: 249
  },
  {
    id: 250,
    title: "Waterways",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:04_Waterways"
    },
    zIndex: 250
  },
  {
    id: 251,
    title: "Lakes",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:05_Lakes"
    },
    zIndex: 251
  },
  {
    id: 252,
    title: "River Catchments",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:07_River_Catchments"
    },
    zIndex: 252
  },
  {
    id: 253,
    title: "Natura 2000 network",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:11_Natura_2000_network"
    },
    zIndex: 253
  },
  {
    id: 254,
    title: "CORINE Land Cover Change 2012-2018",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:14_CORINE_Land_Cover_Change_2012_2018"
    },
    zIndex: 254
  },
  {
    id: 255,
    title: "Land Cover - Land Use riparian zone",
    ...layerConfig,
    group: "AUTH",
    source: {
      url: process.env.VUE_APP_GEOSERVER_URL,
      ...sourceConfig,
      layers: "combine2protect:15_Land_Cover_Land_Use_riparian_zones"
    },
    zIndex: 255
  }
];
