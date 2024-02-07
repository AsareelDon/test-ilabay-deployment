import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ data, customIcon }) => {
  const instance = L.Routing.control({
    waypoints: data?.map(point => L.latLng(point.latitude, point.longitude)),

    createMarker: function(index, wp, nWps) {
      return L.marker(wp.latLng, { 
        draggable: false,
        icon: customIcon,
        }).bindPopup(`
            Name: ${data[index].binName} <br>
            Address: ${data[index].address} <br>
            Status: ${data[index].Bin_Status.status} <br>
        `).openPopup();
    },

    lineOptions: {
        styles: [
          {
            color: "#498349",
            weight: 4
          }
        ]
    },

    show: true,
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: false,
    showAlternatives: true,
    routeWhileDragging: true,
    
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;