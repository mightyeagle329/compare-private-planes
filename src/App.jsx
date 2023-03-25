import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import Header from "./components/common/header/index";
import Footer from "./components/common/footer";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (location.state !== null) {
      if (
        location.state.prevRoute === "check" &&
        token === "enabled"
      ) {
        console.log(location.state.prevRoute);
        return;
      }
    }
    if (token === null) {  
      navigate("not-found");
    }
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
