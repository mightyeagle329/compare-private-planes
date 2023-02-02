import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";

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

  const center = {
    lat: 44,
    lng: -80,
  };

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName="map-container"
    >
      <Circle center={center} options={options} />
      <p>chadi</p>
    </GoogleMap>
  );
}
