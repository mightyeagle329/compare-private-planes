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

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const RangeMap = ({ params }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB7zRbK_udn4vYNr4neiaPd71SuyldNIg4",
    libraries: ["places"],
  });

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
  const [lat1, setLat1] = useState(0);
  const [lng1, setLng1] = useState(0);
  const [address, setAddress] = useState("");

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  }

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
      setLat1(autocomplete.location.lat());
      setLng1(autocomplete.location.lng());
      console.log("here");
      console.log(lat1);
      console.log(lng1);
      console.log(autocomplete);
    } else {
      console.log("autocomplete is null");
    }
  };

  const position = {
    lat: 37.772,
    lng: -80,
  };

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {/* <Marker position={position} /> */}

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        mapContainerStyle={{ height: 400 + "px" }}
      >
        <Circle center={center} options={options} />
        <p>chadi</p>
      </GoogleMap>
    </div>
  );
}
