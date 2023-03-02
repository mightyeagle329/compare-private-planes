import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { GoogleMap, Circle, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./styles/styles.module.scss";

const Range = ({ params }) => {
  var rangesDec = [];
  var rangesAircrafts = [];
  const [maxPax, setMaxPax] = useState(params[0].max_pax);

  useEffect(() => {
    for (var i = 0; i < 2; i++) {
      rangesDec.push(params[i].range_decrease_per_passenger);
      rangesAircrafts.push(params[i].range_km);
    }
  }, []);

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main className={styles.main_range_map}>
        <Map
          max_pax={maxPax}
          rangesDecrease={rangesDec}
          aicraftsRange={rangesAircrafts}
        />
      </main>
    </section>
  );
};

export default Range;

function Map({ rangesDecrease, aicraftsRange, max_pax }) {
  const [latLng, setLatLong] = useState({ lat: 37.772, lng: -80 });
  const [address, setAddress] = useState("");
  const [nbPax, setNbPax] = useState(0);
  const [range0, setRange0] = useState(aicraftsRange[0]);
  const [range1, setRange1] = useState(aicraftsRange[1]);
  // const [range2, setRange2] = useState(aicraftsRange[2]);
  const [rangeDecrease0, setrangeDecrease0] = useState(rangesDecrease[0]);
  const [rangeDecrease1, setrangeDecrease1] = useState(rangesDecrease[1]);
  // const [rangeDecrease2, setrangeDecrease2] = useState(rangesDecrease[2]);

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLong(latLng))
      .catch((error) => console.error("Error", error));
  }

  var options0 = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range0 * 1000,
    zIndex: 1,
  };

  var options1 = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: range1 * 1000,
    zIndex: 1,
  };

  const handlePaxChange = (e, newValue) => {
    setNbPax(newValue);
    if (newValue !== "") {
      setRange1(range0 - parseFloat(newValue) * parseFloat(rangeDecrease0));
      setRange1(range1 - parseFloat(newValue) * parseFloat(rangeDecrease1));
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
                <label htmlFor="paxNumber" className={styles.pax_slider}>
                  Pax number
                  <Slider
                    valueLabelDisplay="auto"
                    aria-label="Volume"
                    value={nbPax}
                    max={max_pax}
                    onChange={handlePaxChange}
                  />
                </label>
                <label htmlFor="startLocation">
                  <TextField
                    {...getInputProps({
                      placeholder: "Start location",
                      className: "location-search-input",
                    })}
                    id="startLocation"
                    label="Start Location"
                    variant="standard"
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
          <Circle center={latLng} options={options0} />
          <Circle center={latLng} options={options1} />
          <Marker position={latLng} />
          <p>chadi</p>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
