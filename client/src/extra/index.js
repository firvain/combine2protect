import { Control } from "ol/control";
// import { fromLonLat, transform } from "ol/proj";
import store from "../store";

export const RotateNorthControl = (function (Control) {
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

export const GeolocatioControl = (function (Control) {
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
    let count = 0;
    const counter = max => {
      count++;
      if (count > max) {
        document.getElementById("GeolocBtn").innerHTML = "◎";
        return;
      }
      document.getElementById("GeolocBtn").innerHTML = count;
      setTimeout(function () {
        counter(max);
      }, 1000);
    };
    const later = delay => {
      this.getMap().vm[0].$parent.$set(
        this.getMap().vm[0].$parent.$data,
        "showGeoloc",
        true
      );
      counter(6);
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(
            this.getMap().vm[0].$parent.$refs.geoloc.$geolocation.getPosition()
          );
        }, delay)
      );
    };

    later(6000).then(coords => {
      this.getMap()
        .getView()
        .setCenter(coords);
      this.getMap()
        .getView()
        .setZoom(11);
    });
  };

  return GeolocatioControl;
})(Control);

export const InfoControl = (function (Control) {
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
    store.dispatch("webgis/updateMapStatus", "info").then(() => {
      // this.getMap().on("singleclick", function (evt) {
      //   // console.log(evt.coordinate);

      //   // convert coordinate to EPSG-4326
      //   const coords = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
      //   console.log(coords);
      // });
      this.getMap().on("singleclick", evt => {
        const viewResolution = this.getMap()
          .getView()
          .getResolution();
        this.getMap().forEachLayerAtPixel(evt.pixel, layer => {
          if (typeof layer.getSource().getParams === "function") {
            const url = layer.getSource().getGetFeatureInfoUrl(
              evt.coordinate,
              viewResolution,
              this.getMap()
                .getView()
                .getProjection(),
              { INFO_FORMAT: "application/jsonp" }
            );
            store.dispatch("webgis/getFeatureInfo", {
              url
            });
            // const urlTable = layer.getSource().getGetFeatureInfoUrl(
            //   evt.coordinate,
            //   viewResolution,
            //   this.getMap()
            //     .getView()
            //     .getProjection(),
            //   { INFO_FORMAT: "text/html" }
            // );
            // // console.log(urlTable);
            // store.dispatch("webgis/getFeatureInfoTable", {
            //   urlTable
            // });
          }
        });
      });
    });

    // this.getMap()
    //   .getView()
    //   .setCenter(fromLonLat(coords, "EPSG:3857"));
    // this.getMap()
    //   .getView()
    //   .setZoom(11);
  };

  return InfoControl;
})(Control);


export const PrintControl = (function (Control) {
  function PrintControl(opt_options) {
    const options = opt_options || {};

    const button = document.createElement("button");
    button.innerHTML = "<i class='v-icon mdi mdi-printer'    aria-hidden='true'></i>";

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
    store.dispatch("webgis/updateMapStatus", "print")

  };

  return PrintControl;
})(Control);