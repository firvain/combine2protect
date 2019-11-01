import { Control } from "ol/control";
import { fromLonLat } from "ol/proj";
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
      console.log(count, max);
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

    later(6000).then(
      coords => {
        this.getMap()
          .getView()
          .setCenter(fromLonLat(coords, "EPSG:3857"));
        this.getMap()
          .getView()
          .setZoom(11);
      }
      // this.getMap().vm[0].$parent.$refs.geoloc.$geolocation.getPosition()
    );
    // setTimeout(() => {
    //   console.log(
    //     this.getMap().vm[0].$parent.$refs.geoloc.$geolocation.getPosition()
    //   );
    // }, 3000);
    // this.getMap()
    //   .getView()
    //   .centerOn(this.getPosition(), this.map.getSize());
  };

  return GeolocatioControl;
})(Control);
