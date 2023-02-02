import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

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
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName="map-container"
    >
      <p>chadi</p>
    </GoogleMap>
  );
}
