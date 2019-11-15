export const mapLayers = [
  {
    id: 200,
    title: "1960 Study Area",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_Study_Area",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 200
  },
  {
    id: 201,
    title: "1960 (A) Lime",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_A_Lime",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 201
  },
  {
    id: 202,
    title: "1960 (CL SCL,SiCL) Clay Loam, Sandy Clay Loam,Silty Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
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
    zIndex: 202
  },
  {
    id: 203,
    title: "1960 (C) Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_C_Clay",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 203
  },
  {
    id: 204,
    title: "1960 (LS) Loamy Sand",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_LS_Loamy_Sand",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 204
  },
  {
    id: 205,
    title: "1960 (L+SiL) Loam Silty Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_L_SiL_Loam_Silty_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 205
  },
  {
    id: 206,
    title: "1960 Organic Soils",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_Organic_Soils",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 206
  },
  {
    id: 207,
    title: "1960 (SL) Sandy Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1960_SL_Sandy_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 207
  },
  {
    id: 208,
    title: "1961 (CL) Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
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
    title: "1961 (C) Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
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
    title: "1961 (LS) Loamy Sand",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
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
    title: "1961 (L) Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
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
    title: "1961 Study Area",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_Perimeter",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 212
  },

  {
    id: 213,
    title: "1961 (SCL) Sandy Clay Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SCL_Sandy_Clay_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 213
  },
  {
    id: 214,
    title: "1961 (SC) Sandy Clay",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SC_Sandy_Clay",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 214
  },
  {
    id: 215,
    title: "1961 (SL) Sandy Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SL_Sandy_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 215
  },
  {
    id: 216,
    title: "1961 (SiL) Silty Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SiL_Silty_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 216
  },
  {
    id: 217,
    title: "1961 (SiL) Silty Loam",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1961_SiL_Silty_Loam",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 217
  },
  {
    id: 218,
    title: "1990 Very Coarse Grained Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Very_Coarse_Grained_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 218
  },
  {
    id: 219,
    title: "1990 Coarse to Medium Fine Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Coarse_To_Medium_Fine_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 219
  },
  {
    id: 220,
    title: "1990 Fine Grained Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Fine_Grained_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 220
  },
  {
    id: 221,
    title: "1990 Old Alluvium Deposits",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Old_Alluvium_Deposit",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 221
  },
  {
    id: 222,
    title: "1990 Organic Soil",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:1990_Organic_Soil",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 222
  },
  {
    id: 223,
    title: "Image Example (AUTH)",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:Acip_brev",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous"
    },
    zIndex: 223
  },
  {
    id: 224,
    title: "Shapefile Example (AUTH)",
    cmp: "vl-layer-tile",
    visible: false,
    quearable: true,
    source: {
      cmp: "vl-source-wms",
      url: process.env.VUE_APP_GEOSERVER_URL,
      layers: "combine2protect:WDPA_cleaning",
      extParams: { TILED: true },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      projection: "EPSG:4326"
    },
    zIndex: 224
  },
];
