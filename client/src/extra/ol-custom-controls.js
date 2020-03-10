import { Control } from "ol/control";
// import { fromLonLat, transform } from "ol/proj";
import store from "../store";

export const RotateNorthControl = (function(Control) {
  function RotateNorthControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "N";

    const element = document.createElement("div");
    element.className = "rotate-north ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener("click", this.handleRotateNorth.bind(this), false);
  }

  if (Control) RotateNorthControl.__proto__ = Control;
  RotateNorthControl.prototype = Object.create(Control && Control.prototype);
  RotateNorthControl.prototype.constructor = RotateNorthControl;

  RotateNorthControl.prototype.handleRotateNorth = function handleRotateNorth() {
    this.getMap()
      .getView()
      .setRotation(0);
  };

  return RotateNorthControl;
})(Control);

export const GeolocatioControl = (function(Control) {
  function GeolocatioControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "◎";
    button.setAttribute("id", "GeolocBtn");
    const element = document.createElement("div");
    element.className = "geolocation ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener("click", this.handleGeoloacation.bind(this), false);
  }

  if (Control) GeolocatioControl.__proto__ = Control;
  GeolocatioControl.prototype = Object.create(Control && Control.prototype);
  GeolocatioControl.prototype.constructor = GeolocatioControl;

  GeolocatioControl.prototype.handleGeoloacation = function handleGeoloacation() {
    // let count = 0;
    // const counter = max => {
    //   count++;
    //   if (count > max) {
    //     document.getElementById("GeolocBtn").innerHTML = "◎";
    //     return;
    //   }
    //   document.getElementById("GeolocBtn").innerHTML = count;
    //   setTimeout(function () {
    //     counter(max);
    //   }, 1000);
    // };
    document.getElementById("GeolocBtn").innerHTML = "◎";
    store.dispatch("webgis/updateMapStatus", "geolocation");
    // const later = delay => {
    //   this.getMap().vm[0].$parent.$set(
    //     this.getMap().vm[0].$parent.$data,
    //     "showGeoloc",
    //     true
    //   );
    //   counter(6);
    //   return new Promise(resolve =>
    //     setTimeout(() => {
    //       resolve(
    //         this.getMap().vm[0].$parent.$refs.geoloc.$geolocation.getPosition()
    //       );
    //     }, delay)
    //   );
    // };

    // later(6000).then(coords => {
    //   this.getMap()
    //     .getView()
    //     .setCenter(coords);
    //   this.getMap()
    //     .getView()
    //     .setZoom(11);
    // });
  };

  return GeolocatioControl;
})(Control);

export const InfoControl = (function(Control) {
  function InfoControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "i";
    button.setAttribute("id", "InfoBtn");
    const element = document.createElement("div");
    element.className = "infobtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener("click", this.handleInfoControl.bind(this), false);
  }

  if (Control) InfoControl.__proto__ = Control;
  InfoControl.prototype = Object.create(Control && Control.prototype);
  InfoControl.prototype.constructor = InfoControl;

  InfoControl.prototype.handleInfoControl = function handleInfoControl() {
    store.dispatch("webgis/updateMapStatus", "info");
    // .then(() => {
    //   this.getMap().on("singleclick", evt => {
    //     const viewResolution = this.getMap()
    //       .getView()
    //       .getResolution();
    //     this.getMap().forEachLayerAtPixel(evt.pixel, layer => {
    //       if (typeof layer.getSource().getParams === "function") {
    //         const url = layer.getSource().getGetFeatureInfoUrl(
    //           evt.coordinate,
    //           viewResolution,
    //           this.getMap()
    //             .getView()
    //             .getProjection(),
    //           { INFO_FORMAT: "application/json" }
    //         );
    //         store.dispatch("webgis/getFeatureInfo", {
    //           url
    //         });

    //       }
    //     });
    //   });
    // });
  };

  return InfoControl;
})(Control);

export const PrintControl = (function(Control) {
  function PrintControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML =
      "<i class='v-icon mdi mdi-printer'    aria-hidden='true'></i>";

    const element = document.createElement("div");
    element.className = "printBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener("click", this.handlePrintControl.bind(this), false);
  }

  if (Control) PrintControl.__proto__ = Control;
  PrintControl.prototype = Object.create(Control && Control.prototype);
  PrintControl.prototype.constructor = PrintControl;

  PrintControl.prototype.handlePrintControl = function handlePrintControl() {
    store.dispatch("webgis/updateMapStatus", "print");
  };

  return PrintControl;
})(Control);

export const MeasureControl = (function(Control) {
  function MeasureControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML =
      "<i class='v-icon mdi mdi-ruler' aria-hidden='true'></i>";

    const element = document.createElement("div");
    element.className = "measureBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener(
      "click",
      this.handleMeasureControl.bind(this),
      false
    );
  }

  if (Control) MeasureControl.__proto__ = Control;
  MeasureControl.prototype = Object.create(Control && Control.prototype);
  MeasureControl.prototype.constructor = MeasureControl;

  MeasureControl.prototype.handleMeasureControl = function handleMeasureControl() {
    store.dispatch("webgis/updateMapStatus", "measure").then(() => {
      this.getMap().vm[0].$parent.$set(
        this.getMap().vm[0].$parent.$data,
        "measureOutput",
        ""
      );
      this.getMap().vm[0].$parent.$set(
        this.getMap().vm[0].$parent.$data,
        "lengthUnit",
        "meters"
      );
      this.getMap().vm[0].$parent.$set(
        this.getMap().vm[0].$parent.$data,
        "areaUnit",
        "sq. meters"
      );
    });
  };

  return MeasureControl;
})(Control);

export const DrawControl = (function(Control) {
  function DrawControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "<i class='mdi mdi-square-edit-outline' i>";

    const element = document.createElement("div");
    element.className = "drawBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener("click", this.handleDrawControl.bind(this), false);
  }

  if (Control) DrawControl.__proto__ = Control;
  DrawControl.prototype = Object.create(Control && Control.prototype);
  DrawControl.prototype.constructor = DrawControl;

  DrawControl.prototype.handleDrawControl = function handleDrawControl() {
    store.dispatch("webgis/updateMapStatus", "draw");
  };

  return DrawControl;
})(Control);

export const DragAndDropControl = (function(Control) {
  function DragAndDropControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "<i class='mdi mdi-file-code-outline' i>";

    const element = document.createElement("div");
    element.className = "dragAndDropBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener(
      "click",
      this.handleDragAndDropControl.bind(this),
      false
    );
  }

  if (Control) DragAndDropControl.__proto__ = Control;
  DragAndDropControl.prototype = Object.create(Control && Control.prototype);
  DragAndDropControl.prototype.constructor = DragAndDropControl;

  DragAndDropControl.prototype.handleDragAndDropControl = function handleDragAndDropControl() {
    store.dispatch("webgis/updateMapStatus", "dragdrop");
  };

  return DragAndDropControl;
})(Control);

export const NomimatimControl = (function(Control) {
  function NomimatimControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "<i class='mdi mdi-globe-model' i>";

    const element = document.createElement("div");
    element.className = "nomimatimBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener(
      "click",
      this.handleNomimatimControl.bind(this),
      false
    );
  }

  if (Control) NomimatimControl.__proto__ = Control;
  NomimatimControl.prototype = Object.create(Control && Control.prototype);
  NomimatimControl.prototype.constructor = NomimatimControl;

  NomimatimControl.prototype.handleNomimatimControl = function handleNomimatimControl() {
    store.dispatch("webgis/updateMapStatus", "nomimatim");
  };

  return NomimatimControl;
})(Control);

export const SeachDataControl = (function(Control) {
  function SeachDataControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "<i class='mdi mdi-map-search' i>";

    const element = document.createElement("div");
    element.className = "searchDataBtn ol-unselectable ol-control";
    element.appendChild(button);

    Control.call(this, {
      element: element,
      target: options.target
    });

    button.addEventListener(
      "click",
      this.handleSeachDataControl.bind(this),
      false
    );
  }

  if (Control) SeachDataControl.__proto__ = Control;
  SeachDataControl.prototype = Object.create(Control && Control.prototype);
  SeachDataControl.prototype.constructor = SeachDataControl;

  SeachDataControl.prototype.handleSeachDataControl = function handleSeachDataControl() {
    store.dispatch("webgis/updateMapStatus", "searchData");
  };

  return SeachDataControl;
})(Control);
