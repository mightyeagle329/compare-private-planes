import global from "../components/SingleAircraft/styles/global.module.scss";
import cn from "classnames";

import Header from "../components/common/header";
import KeyFacts from "../components/SingleAircraft/KeyFacts";
import BasicInfo from "../components/SingleAircraft/BasicInfo";
import PerformanceData from "../components/SingleAircraft/PerformanceData";
import OwnershipCosts from "../components/SingleAircraft/OwnershipCosts";
import Acquisition from "../components/SingleAircraft/Acquisition";
import HistoricalMarket from "../components/SingleAircraft/HistoricalMarket";
import FleetFlightHours from "../components/SingleAircraft/FleetFlightHours";
import RangeMap from "../components/SingleAircraft/RangeMap";
import Maintenance from "../components/SingleAircraft/Maintenance";
import Interior from "../components/SingleAircraft/Interior";
import Features from "../components/SingleAircraft/Features";
import Powerplant from "../components/SingleAircraft/Powerplant";
import Weights from "../components/SingleAircraft/Weights";
import Dimensions from "../components/SingleAircraft/Dimensions";
import AccidentData from "../components/SingleAircraft/AccidentData";
import Similar from "../components/SingleAircraft/Similar";

const SingleAircraftDetail = ({ aircraft }) => {
  return (
    <>
      <Header />
      <main className={cn(global.main)}>
        <KeyFacts />
        <BasicInfo />
        <PerformanceData />
        <OwnershipCosts />
        <Acquisition />
        <HistoricalMarket />
        <FleetFlightHours />
        <RangeMap />
        <Maintenance />
        <Interior />
        <Features />
        <Powerplant />
        <Weights />
        <Dimensions />
        {/* <AccidentData /> */}
        <Similar />
        <form className={cn(global.footer)}>
          <div className={cn(global.btns_container)}>
            <button className={cn(global.action_btn)}>
              Export Report as PDF
            </button>
            <button className={cn(global.action_btn)}>
              Add Aircraft to compare
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SingleAircraftDetail;
