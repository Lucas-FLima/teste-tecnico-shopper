import {
    GoogleMap,
    Marker,
    Polyline,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";

type MapProps = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  polyline: string;
};

const containerStyle = {
  width: "100%",
  height: "400px",
};

export default function Map({ origin, destination, polyline }: MapProps) {
  const libraries: ("places" | "geometry")[] = ["geometry"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDKvpN-IBbRReysQDIoWVwXU9UDfkAHvd8",
    libraries,
  });

  const [mapReady, setMapReady] = useState(false);
  if (!isLoaded || !origin || !destination || !polyline) {
    return <div>Carregando...</div>;
  }

  const decodedPath = window.google.maps.geometry.encoding.decodePath(polyline);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: origin.latitude, lng: origin.longitude }}
      zoom={13}
      options={{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
      }}
      onBoundsChanged={() => {
        setMapReady(true);
      }}
    >
      {mapReady && (
        <>
          <Marker
            position={{ lat: origin.latitude, lng: origin.longitude }}
            title="Origem"
          />
          <Marker
            position={{ lat: destination.latitude, lng: destination.longitude }}
            title="Destino"
          />
          <Polyline
            path={decodedPath}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />
        </>
      )}
    </GoogleMap>
  );
}
