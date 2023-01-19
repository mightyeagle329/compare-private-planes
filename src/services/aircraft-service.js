import axios from "axios";

const API_URL = "/api/";

class AircraftService {
  async getAircrafts() {
    console.log("strated");
    const response = await axios.get(API_URL + "aircraft-items/");

    if (response.data != null) {
      console.log("response");
      console.log(response.data.aircrafts);
      return response.data.aircrafts;
    } else {
      console.log("failed");
      return null;
    }
  }
}

export default new AircraftService();
