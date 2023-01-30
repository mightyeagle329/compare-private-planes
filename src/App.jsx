import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
// import SingleAircraftDetails from "./views/singleAircraft/SingleAircraftDetails";
import Header from "./components/common/header/index";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route
          path="/aircrafts/:id"
          exact
          element={<SingleAircraftDetails />}
        /> */}
      </Routes>
    </>
  );
}
export default App;
