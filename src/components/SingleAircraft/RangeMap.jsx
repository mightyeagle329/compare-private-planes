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
import { useEffect, useMemo, useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "../../styles/Search.module.scss";

const RangeMap = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main>
        <Map rangeDecrease={params.range_decrease_per_passenger} />
      </main>
    </section>
  );
};

export default RangeMap;

function Map({ rangeDecrease }) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [lat1, setLat1] = useState(0);
  const [lng1, setLng1] = useState(0);
  const [address, setAddress] = useState("");
  const [nbPax, setNbPax] = useState(0);
  const [range, setRange] = useState(0);

  function handleChange(address) {
    setAddress(address);
  }

  function handleSelect(address) {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
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

  const calculateRange = () => {
    var decrease = parseFloat(nbPax) + parseFloat(rangeDecrease);
    setRange(decrease);
  };

  const handlePaxChanged = (e) => {
    setNbPax(e.target.value);
    if (e.target.value != "") {
      setRange(parseFloat(e.target.value) + parseFloat(rangeDecrease));
    }
  };

  const position = {
    lat: 37.772,
    lng: -80,
  };

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <div>
      {range}
      <br></br>
      {rangeDecrease}
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
            <div>
              <center>
                <input
                  {...getInputProps({
                    placeholder: "Please type a start location",
                    className: "location-search-input",
                  })}
                />
              </center>
              <center>
                <input
                  className={styles.input}
                  type="text"
                  value={nbPax}
                  onChange={(e) => handlePaxChanged(e)}
                  name="search"
                  placeholder="Please type the pax number"
                  required
                />
              </center>
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
      </LoadScript>
    </div>
  );
}
