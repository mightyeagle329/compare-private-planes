import axios from "axios";

const API_URL = "/api/";

class AircraftService {
  async getAircrafts() {
    const response = await axios.get(API_URL + "aircraft-items/");
    if (response.data == null) return;
    return response.data.aircrafts;
  }
}

export default new AircraftService();
