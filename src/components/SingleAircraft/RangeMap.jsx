import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import {
  GoogleMap,
  Circle,
  useLoadScript,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

const RangeMap = ({ params }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB7zRbK_udn4vYNr4neiaPd71SuyldNIg4",
  });

  if (!isLoaded) return <div>Loading ..</div>;

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main>
        <Map />
      </main>
    </section>
  );
};

export default RangeMap;

function Map() {
  const [autocomplete, setAutocomplete] = useState(null);

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      autocomplete.getPlace();
    }
  };

  const position = {
    lat: 37.772,
    lng: -80,
  };

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyB7zRbK_udn4vYNr4neiaPd71SuyldNIg4"
      libraries={["places"]}
    >
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        mapContainerStyle={{ height: 400 + "px" }}
      >
        <Marker position={position} />
        <StandaloneSearchBox onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
            }}
          />
        </StandaloneSearchBox>
        <Circle center={center} options={options} />
        <p>chadi</p>
      </GoogleMap>
    </LoadScript>
  );
}
