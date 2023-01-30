import global from "../../components/styles/global.module.scss";
import scopedStyles from "./styles.module.scss";
import cn from "classnames";

import Header from "../../components/common/header";
import KeyFacts from "../../components/SingleAircraft/KeyFacts";
import BasicInfo from "../../components/SingleAircraft/BasicInfo";
import PerformanceData from "../../components/SingleAircraft/PerformanceData";
import OwnershipCosts from "../../components/SingleAircraft/OwnershipCosts";
import Acquisition from "../../components/SingleAircraft/Acquisition";
import HistoricalMarket from "../../components/SingleAircraft/HistoricalMarket";
import FleetFlightHours from "../../components/SingleAircraft/FleetFlightHours";
import RangeMap from "../../components/SingleAircraft/RangeMap";
import Maintenance from "../../components/SingleAircraft/Maintenance";
import Interior from "../../components/SingleAircraft/Interior";
import Features from "../../components/SingleAircraft/Features";
import Powerplant from "../../components/SingleAircraft/Powerplant";
import Weights from "../../components/SingleAircraft/Weights";
import Dimensions from "../../components/SingleAircraft/Dimensions";
import AccidentData from "../../components/SingleAircraft/AccidentData";
import Similar from "../../components/SingleAircraft/Similar";
import Modal from "../../components/common/modal/Modal";

import aircraftService from "../../services/aircraft-service";

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function SingleAircraftDetails() {
  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftsData, setAircraftsData] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setAircraftData(data[0]));
  }, [id]);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);
  const [openModal, setOpenModal] = useState(false);
  let selectedAircafts = [];

  // const filteredAircrafts = aircraftsData.filter((aircraft) => aircraft.aircraft_id !== aircraftData.aircraft_id)
  const onSelect = (e, aircraft) => {
    if (selectedAircafts.includes(aircraft)) {
      selectedAircafts.pop(aircraft);
      return;
    }
    if (selectedAircafts.length === 2) {
      alert("max 3");
      e.target.checked = false;
      return;
    }

    selectedAircafts.push(aircraft);
  };
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className={cn(global.wrapper)}>
        <KeyFacts params={aircraftData} />
        <BasicInfo params={aircraftData} />
        <PerformanceData params={aircraftData} />
        <OwnershipCosts params={aircraftData} />
        <Acquisition params={aircraftData} />
        <HistoricalMarket params={aircraftData} />
        <FleetFlightHours params={aircraftData} />
        <RangeMap params={aircraftData} />
        <Maintenance params={aircraftData} />
        <Interior params={aircraftData} />
        <Features params={aircraftData} />
        <Powerplant params={aircraftData} />
        <Weights params={aircraftData} />
        <Dimensions params={aircraftData} />
        <AccidentData params={aircraftData} />

        <Similar params={aircraftsData} />

        <div className={cn(global.footer)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button className={cn(global.action_btn)}>
                Export Report as PDF
              </button>
              <button
                className={cn(global.action_btn)}
                onClick={() => setOpenModal(!openModal)}
              >
                Add Aircraft to compare
              </button>
            </div>
          </div>
        </div>
        <Modal
          title={`Compare ${aircraftData.aircraft_name} with other aircrafts`}
          notice="You can compare up to 3 aircrafts"
          toggler={openModal}
        >
          <div>
            <div className={cn(scopedStyles.options)}>
              {aircraftsData.map((aircraft) => {
                return (
                  <label className={cn(scopedStyles.option)} key={aircraft.aircraft_id}>
                    <span>{aircraft.aircraft_name}</span>
                    <input
                      type="checkbox"
                      value={aircraft.aircraft_id}
                      name="aircraft"
                      // pass aircraft_id as param to onSelect
                      onClick={(e) => onSelect(e, aircraft)}
                    />
                    <i
                      className={
                        "fa-solid fa-check " + cn(scopedStyles.checkmark)
                      }
                    ></i>
                    <img src={aircraft.image_name} alt="" />
                  </label>
                );
              })}
            </div>
            <button
              onClick={() =>
                navigate("/compare", { state: { selectedAircafts } })
              }
              className={scopedStyles.compare_btn}
            >
              Compare
            </button>
          </div>
        </Modal>
      </main>
    </>
  );
}
