import global from "../../components/styles/global.module.scss";
import pdf from "../../components/styles/pdf.module.scss";
import logo from "../../assets/logo.png";

import scopedStyles from "./styles.module.scss";
import cn from "classnames";

import Header from "../../components/common/header";
import KeyFacts from "../../components/SingleAircraft/KeyFacts";
import BasicInfo from "../../components/SingleAircraft/BasicInfo";
import PerformanceData from "../../components/SingleAircraft/PerformanceData";
import OwnershipCosts from "../../components/SingleAircraft/OwnershipCosts/OwnershipCosts";
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
import { searchService } from "../../utils/hooks/utils";
import styles from "./styles.module.scss";
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
} from "../../utils/constants/app-constants";
import Dropdown from "../../components/common/Dropdown";

export default function SingleAircraftDetails() {
  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftsData, setAircraftsData] = useState([]);
  const [accidentsData, setAccidentsData] = useState([]);
  const [nbAccidents, setNbAccidents] = useState(0);
  const [similarAircrafts, setSimilarAircrafts] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const [keys, setKeys] = useState([]);
  const [history, setHistory] = useState([]);

  const searchAircraft = async (cat) => {
    const res = await searchService(
      `/api/search?aircraft_name=&category=${cat}&in_production=&model=`
    );

    console.log(res);
    setSimilarAircrafts(res);

    const filtered = similarAircrafts.filter(
      (aircraft) => aircraft.aircraft_id !== aircraftData.aircraft_id
    );
    // setSimilarAircrafts(filtered);
  };

  const { id } = useParams();

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => searchAircraft(data[0].category));
  }, []);

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setAircraftData(data[0]));
  }, [id]);

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setKeys(JSON.parse(data[0].acquisition_values)));
  }, [id]);

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setHistory(JSON.parse(data[0].historical_data)));
  }, [id]);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);

  useEffect(() => {
    aircraftService
      .getAccidents()
      .then((data) => setAccidentsData(data.accidents))
      .then((data) => setNbAccidents(data.count));
  }, []);

  useEffect(() => {
    aircraftService.getAccidents().then((data) => setNbAccidents(data.count));
  }, []);

  const filteredAircrafts = aircraftsData.filter(
    (aircraft) => aircraft.aircraft_id !== aircraftData.aircraft_id
  );
  let selectedAircafts = [];
  selectedAircafts.push(aircraftData);
  const onSelect = (e, aircraft) => {
    if (selectedAircafts.includes(aircraft)) {
      e.target.checked = false;
      selectedAircafts.pop(aircraft);
      return;
    }
    if (selectedAircafts.length >= 3) {
      alert("Max 3");
      e.target.checked = false;
      return;
    }

    selectedAircafts.push(aircraft);
  };
  const navigate = useNavigate();

  const onCompare = () => {
    if (selectedAircafts.length < 2) {
      alert("Select at least 1 aircraft");
      return;
    }
    navigate("/compare", { state: selectedAircafts });
  };
  return (
    <>
      <Header />
      <div className={cn(pdf.for_pdf)}>
        <div className={pdf.first_page}>
          <div className={pdf.logo_container}>
            <img src={logo} alt="logo" />
          </div>
          <h3>Compare Private Planes</h3>
          <h1>{aircraftData.aircraft_name}</h1>
          <div className={cn(pdf.sample_aircrafts)}>
            <div className={cn(pdf.sample_aircraft)}>
              <div className={cn(pdf.image_container)}>
                <img src={aircraftData.image_name} alt="aircraft" />
              </div>
              <div className={cn(pdf.sample_aircraft_info)}>
                <p>{aircraftData.manufacturer}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={cn(pdf.second_page)}>
          <p>
            This report has been generated using Compare Private Planes premium
            service. Data is to be used for comparison purposes only and should
            not be used for flight planning. Costs are estimates only. For a
            full list of assumptions and the methodology of data collection,
            please visit compareprivateplanes.com Compare Private Planes is
            wholly owned and operated by Magic Lagoon Limited. This report has
            been generated by USER FIRST NAME OR EMAIL Options selected for this
            report are: Region: North America Currency: USD Units: Imperial
            Estimated Annual Flight Hours: 200
          </p>

          {/* <footer>
            <p>&#169; Magic Lagoon Limited</p>
            <p>{new Date().getFullYear()}</p>
          </footer> */}
        </div>
      </div>
      <main className={cn(global.wrapper)}>
        <div className={styles.sorting + " " + global.pdf_hidden}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={unit}
              setValue={(value) => onUnitChanged(value)}
              options={UNIT_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              value={country}
              setValue={(value) => onCountryChanged(value)}
              options={COUNTRY_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              value={currency}
              setValue={(value) => onCurrencyChanged(value)}
              options={CURRENCY_OPTIONS}
            />
          </div>
        </div>
        <KeyFacts
          params={aircraftData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <BasicInfo params={aircraftData} />
        <PerformanceData params={aircraftData} />
        <OwnershipCosts
          params={aircraftData}
          currency={currency}
          country={country}
        />
        <Acquisition params={aircraftData} acquisition={keys} />
        <HistoricalMarket params={aircraftData} historicalData={history} />
        <FleetFlightHours params={aircraftData} />
        <RangeMap params={aircraftData} />
        {aircraftData.a_check === 0 &&
        aircraftData.b_check === 0 &&
        aircraftData.c_check === 0 &&
        aircraftData.d_check === 0 ? (
          <div></div>
        ) : (
          <Maintenance params={aircraftData} />
        )}
        <Interior params={aircraftData} />
        <Features params={aircraftData} />
        <Powerplant params={aircraftData} />
        <Weights params={aircraftData} />
        <Dimensions params={aircraftData} />
        <AccidentData
          params={accidentsData}
          nbAccidents={nbAccidents}
          aircraftName={aircraftData.aircraft_name}
        />
        <Similar params={similarAircrafts} />
        <div className={cn(global.footer, global.pdf_hidden)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button
                className={cn(global.action_btn)}
                onClick={() => window.print()}
              >
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
          <div className={cn(global.pdf_hidden)}>
            <div className={cn(scopedStyles.options)}>
              {filteredAircrafts.map((aircraft) => {
                return (
                  <label
                    className={cn(scopedStyles.option)}
                    key={aircraft.aircraft_id}
                  >
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
              onClick={() => onCompare()}
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
