import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import customBinMarker from '../../assets/garbage-bin.png';
import 'leaflet/dist/leaflet.css';
import './style.css';
import RoutingMachine from "./RoutingMachine";

const RouteCollection = ({ handleMapClick, binMetaData }) => {
    const mapOptions = {
        center: [8.47088860952853, 124.65405985548048],
        zoom: 15,
        doubleClickZoom: false
    };

    const customIcon = new L.Icon({
        iconUrl: customBinMarker,
        iconRetinaUrl: customBinMarker,
        iconSize: [50, 50],
        popupAnchor:  [3, -12]
    });
    
    return (
        <div className="leaflet-container rounded-md p-1 bg-white shadow">
            <MapContainer
                {...mapOptions}
                whenCreated={(map) => {
                    map.createPane('customPane');
                    map.getPane('customPane').style.zIndex = 400;
                    map.zoomControl.getContainer().style.zIndex = 500;
                }}
            >
                <TileLayer 
                    attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MapEventsHandler handleMapClick={handleMapClick} />
                {binMetaData && <RoutingMachine data={binMetaData} customIcon={customIcon} />}
            </MapContainer>
        </div>
    );
}
const MapEventsHandler = ({ handleMapClick }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return null;
};

export default RouteCollection;