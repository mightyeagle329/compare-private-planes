import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { GoogleMap, Circle, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import Slider from "@mui/material/Slider";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./styles/styles.module.scss";

const RangeMap = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main className={styles.main_range_map}>
        <Map
          max_pax={params.max_pax}
          rangeDecrease={params.range_decrease_per_passenger}
          aicraftRange={params.range_km}
        />
      </main>
    </section>
  );
};

export default RangeMap;

function Map({ rangeDecrease, aicraftRange, max_pax }) {
  const [latLng, setLatLong] = useState({ lat: 37.772, lng: -80 });
  const [address, setAddress] = useState("");
  const [nbPax, setNbPax] = useState(0);
  const [range, setRange] = useState(aicraftRange);

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLong(latLng))
      .catch((error) => console.error("Error", error));
  }

  var options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range * 1000,
    zIndex: 1,
  };

  const handlePaxChange = (e, newValue) => {
    setNbPax(newValue);
    if (newValue !== "") {
      setRange(aicraftRange - parseFloat(newValue) * parseFloat(rangeDecrease));
    }
  };

  return (
    <div>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyB7zRbK_udn4vYNr4neiaPd71SuyldNIg4"
        libraries={["places"]}
      >
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className={styles.range_configs}>
              <div className={styles.map_inputs}>
                <label htmlFor="startLocation">
                  Start location
                  <input
                    {...getInputProps({
                      placeholder: "Start location",
                      className: "location-search-input",
                    })}
                    id="startLocation"
                    className={styles.map_input}
                  />
                </label>
                <label htmlFor="paxNumber">
                  Pax number: {nbPax}
                  <Slider
                    aria-label="Volume"
                    value={nbPax}
                    max={max_pax}
                    onChange={handlePaxChange}
                  />
                </label>
              </div>
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
        <GoogleMap
          zoom={2}
          center={latLng}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
          mapContainerClassName="map-container"
          mapContainerStyle={{ height: 400 + "px" }}
        >
          <Circle center={latLng} options={options} />
          <Marker position={latLng} />
          <p>chadi</p>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
