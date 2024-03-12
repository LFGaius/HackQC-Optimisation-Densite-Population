
import React from 'react';
import { GoogleMap, MarkerF, useLoadScript, PolygonF } from '@react-google-maps/api';
import buildIcon from '../../assets/images/build.png';
import houseIcon from '../../assets/images/house.png';
import parkIcon from '../../assets/images/park.png';
import storeIcon from '../../assets/images/store.png';
const containerStyle = {
  width: '50%',
  height: '50vh'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const mapTypeId = {
  HYBRID: 'hybrid',
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain'
};

const polygonCoords = [
  { lat: -3.845, lng: -38.523 },
  { lat: -3.845, lng: -38.623 },
  { lat: -3.945, lng: -38.723 }, // Add as many points as required to shape your polygon
  { lat: -4.205, lng: -38.723 }, 
  { lat: -3.945, lng: -38.523 },
];

const markers = [
  {
    position: { lat: -3.745, lng: -38.523 },
    icon: parkIcon
  },
  {
    position: { lat: -3.745, lng: -38.623 },
    icon: buildIcon
  },
  {
    position: { lat: -3.845, lng: -38.523 },
    icon: houseIcon
  },
  {
    position: { lat: -3.845, lng: -38.623 },
    icon: storeIcon
  },
  // Add more markers as needed
];

const MapComponent = () => { 
  // Use `useLoadScript` to ensure Google Maps API script is loaded
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (  
    <GoogleMap
      mapTypeId = {mapTypeId.HYBRID}
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker.position}
            icon={{
              url:marker.icon,
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
      ))}
      <PolygonF
        key={456}
        paths={polygonCoords}
        options={{
          fillColor: "yellow",
          fillOpacity: 0.3,
          strokeColor: "yellow",
          strokeOpacity: 0.3,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
}

export default MapComponent;
