import global from "../../components/styles/global.module.scss";
import cn from "classnames";

import Header from "../../components/common/header";
import AquisitionCost from "../../components/CompareAircrafts/AquisitionCost";
import BascInfo from "../../components/CompareAircrafts/BasicInfo";
import Dimensions from "../../components/CompareAircrafts/Dimensions";
import Features from "../../components/CompareAircrafts/Features";
import HistoricalMarket from "../../components/CompareAircrafts/HistoricalMarket";
import Interior from "../../components/CompareAircrafts/Interior";
import KeyFacts from "../../components/CompareAircrafts/KeyFacts";
import Maintenance from "../../components/CompareAircrafts/Maintenance";
import OwnershipCost from "../../components/CompareAircrafts/OwnershipCost";
import Performance from "../../components/CompareAircrafts/Performance";
import Powerplant from "../../components/CompareAircrafts/Powerplant";
import Range from "../../components/CompareAircrafts/Range";
import Weights from "../../components/CompareAircrafts/Weight";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const CompareAircrafts = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // location.state.selectedAircrfts is an array of selected aircraft IDs,
  // which you can use to fetch the data for the selected aircrafts
  // and pass them as props
  const location = useLocation();
  const aircrafts = location.state;
  const [aircraftsData, setAircraftsData] = useState(aircrafts);
  const onRemoveAircraft = (data) => {
    setAircraftsData(data);
  };
  return (
    <>
      <Header />
      <main className={cn(global.wrapper)}>
        <KeyFacts data={aircraftsData} onRemoveAircraft={onRemoveAircraft} />
        <BascInfo data={aircraftsData} />
        <Performance data={aircraftsData} />
        <OwnershipCost data={aircraftsData} />
        <AquisitionCost data={aircraftsData} />
        <HistoricalMarket data={aircraftsData} />
        <Range data={aircraftsData} />
        <Maintenance data={aircraftsData} />
        <Interior data={aircraftsData} />
        <Features data={aircraftsData} />
        <Powerplant data={aircraftsData} />
        <Weights data={aircraftsData} />
        <Dimensions data={aircraftsData} />
        <div className={cn(global.footer)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button className={cn(global.action_btn)}>
                Export Report as PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompareAircrafts;
