import global from "../../components/styles/global.module.scss";
import pdf from "../../components/styles/pdf.module.scss";
import cn from "classnames";

import logo from "../../assets/logo.png";
import scopedStyles from "./styles.module.scss";

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
import { useState, useEffect } from "react";
import { searchService } from "../../utils/hooks/utils";

import styles from "./styles.module.scss";
import Dropdown from "../../components/common/Dropdown";
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
} from "../../utils/constants/app-constants";
import Modal from "../../components/common/modal/Modal";
import aircraftService from "../../services/aircraft-service";
import Footer from "../../components/common/footer";

const CompareAircrafts = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const aircrafts = location.state;
  const [aircraftsData, setAircraftsData] = useState(aircrafts);
  const [allaircraftsData, setAllAircraftsData] = useState([]);
  const [filteredAircrafts, setFilteredAircrafts] = useState([]);

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  useEffect(() => {
    const tmp = allaircraftsData.filter(
      (aircraft) =>
        aircraft.aircraft_id !== aircraftsData[0].aircraft_id &&
        aircraft.aircraft_id !== aircraftsData[1].aircraft_id
    );
    setFilteredAircrafts(tmp);
  }, []);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAllAircraftsData(data));
  }, []);

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };

  const onRemoveAircraft = (data) => {
    setAircraftsData(data);
  };
  let selectedAircafts = aircraftsData;

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

  const onCompare = () => {
    if (selectedAircafts.length > 3) {
      alert("You can add only one aircraft");
      return;
    }
    setAircraftsData(selectedAircafts);
    setOpenModal(!openModal);
  };

  const handleSearchChanged = async (value) => {
    const res = await searchService(
      `aircraft_name=${value}&category=&in_production=&aircraft_manufacturer=&max_pax=120&max_pax_min=0&range_NM_min=0&range_NM=8000&high_cruise_knots_min=0&high_cruise_knots=12312&max_altitude_feet_min=0&max_altitude_feet=60000&hourly_fuel_burn_GPH_min=0&hourly_fuel_burn_GPH=50000&baggage_capacity_CF_min=0&baggage_capacity_CF=10000&TO_distance_feet_min=0&TO_distance_feet=10000&landing_distance_feet_min=0&landing_distance_feet=10000&annual_cost_min=0&annual_cost=9000000&estimated_hourly_charter_min=0&estimated_hourly_charter=1000000&new_purchase_min=0&new_purchase=100000000&average_pre_owned_min=0&average_pre_owned=100000000`
    );
    setFilteredAircrafts(res);
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
          <h1>Aircraft Comparison Report</h1>
          <div className={cn(pdf.sample_aircrafts)}>
            {aircraftsData.map((aircraft, index) => {
              return (
                <div className={cn(pdf.sample_aircraft)} key={index}>
                  <div className={cn(pdf.image_container)}>
                    <img src={aircraft.image_name} alt="aircraft" />
                  </div>
                  <div className={cn(pdf.sample_aircraft_info)}>
                    <h4>{aircraft.aircraft_name}</h4>
                    <p>{aircraft.manufacturer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <main className={cn(global.wrapper)}>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={unit}
              setValue={(value) => onUnitChanged(value)}
              options={UNIT_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={country}
              setValue={(value) => onCountryChanged(value)}
              options={COUNTRY_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={currency}
              setValue={(value) => onCurrencyChanged(value)}
              options={CURRENCY_OPTIONS}
            />
            {aircraftsData.length === 2 ? (
              <input
                type="button"
                className={styles.header_btn}
                value="Add aircraft to compare"
                onClick={() => setOpenModal(!openModal)}
              />
            ) : (
              <div></div>
            )}
            <input
              type="button"
              className={styles.header_btn}
              value="Export Report"
              onClick={() => window.print()}
            />{" "}
          </div>
        </div>
        <KeyFacts data={aircraftsData} onRemoveAircraft={onRemoveAircraft} />
        <BascInfo data={aircraftsData} />
        <Performance
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <OwnershipCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <AquisitionCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        {/* <HistoricalMarket params={aircraftsData} /> */}
        <Range params={aircraftsData} />
        <Maintenance
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Interior
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Features
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Powerplant
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Weights
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Dimensions
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <div className={cn(global.footer)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button
                className={cn(global.action_btn, global.pdf_hidden)}
                onClick={() => window.print()}
              >
                Export Report as PDF
              </button>
            </div>
          </div>
        </div>
        <Modal title={`Add another aircraft to compare`} toggler={openModal}>
          <div className={cn(global.pdf_hidden)}>
            <div className={styles.form}>
              <form className={styles.search} action="">
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Search for aircrafts"
                  onChange={(value) => handleSearchChanged(value)}
                />
              </form>
            </div>
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
              Add Aircraft
            </button>
          </div>
        </Modal>
      </main>
      <Footer />
    </>
  );
};

export default CompareAircrafts;
