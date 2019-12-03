export const mapLayers = [
  {
    id: 200,
    title: "(A) Lime",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_A_Lime",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 200
  },
  {
    id: 201,
    title: "(CL SCL,SiCL) Clay Loam, Sandy Clay Loam,Silty Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers:
        "combine2protect:1960_CL_SCL_SiCL_Clay_Loam_Sandy_Clay_Loam_Silty_Clay_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 201
  },
  {
    id: 202,
    title: "(C) Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_C_Clay",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 202
  },
  {
    id: 203,
    title: "(LS) Loamy Sand",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_LS_Loamy_Sand",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 203
  },
  {
    id: 204,
    title: "(L+SiL) Loam Silty Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_L_SiL_Loam_Silty_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 204
  },
  {
    id: 205,
    title: "Organic Soils",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_Organic_Soils",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 205
  },
  {
    id: 206,
    title: "(SL) Sandy Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_SL_Sandy_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 206
  },
  {
    id: 207,
    title: "Study Area",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1960 Soil Study of Chimaditida",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_Study_Area",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 207
  },
  {
    id: 208,
    title: " (CL) Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_CL_Clay_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 208
  },
  {
    id: 209,
    title: " (C) Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_C_Clay",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 209
  },
  {
    id: 210,
    title: " (LS) Loamy Sand",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_LS_Loamy_Sand",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 210
  },
  {
    id: 211,
    title: " (L) Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_L_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 211
  },
  {
    id: 212,
    title: " (SCL) Sandy Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SCL_Sandy_Clay_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 212
  },
  {
    id: 213,
    title: " (SC) Sandy Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SC_Sandy_Clay",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 213
  },
  {
    id: 214,
    title: " (SL) Sandy Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SL_Sandy_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 214
  },
  {
    id: 215,
    title: " (SiL) Silty Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SiL_Silty_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 215
  },
  {
    id: 216,
    title: " Study Area",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1961 Soil Study of Florina Plain",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_Perimeter",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 216
  },
  {
    id: 217,
    title: " Very Coarse Grained Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Very_Coarse_Grained_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 217
  },
  {
    id: 218,
    title: " Coarse to Medium Fine Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Coarse_To_Medium_Fine_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 218
  },
  {
    id: 219,
    title: " Fine Grained Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Fine_Grained_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 219
  },
  {
    id: 220,
    title: " Old Alluvium Deposits",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Old_Alluvium_Deposit",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 220
  },
  {
    id: 221,
    title: " Organic Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "1990 Soil Study of Prespa Lake",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Organic_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 221
  },
  {
    id: 222,
    title: "SPASCI",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "Protected Areas",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:SPASCI",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 222
  },
  {
    id: 223,
    title: "SPA",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "Protected Areas",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:SPA",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 223
  },
  {
    id: 224,
    title: "SCI",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "Protected Areas",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:SCI",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 224
  },
  {
    id: 225,
    title: "Unified Points",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "Other",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:Unified",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 225
  },
  {
    id: 226,
    title: "Cattle",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "Other",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:cattle",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 226
  },
  {
    id: 227,
    title: "Image Example (AUTH)",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "AUTH",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
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
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    opacity: 1,
    group: "AUTH",
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:WDPA_cleaning",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 228
  }
];
