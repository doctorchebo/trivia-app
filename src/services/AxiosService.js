import axios from "axios";

class AxiosService {
  get() {
    return axios.get("https://opentdb.com/api.php?amount=5");
  }
}

export default new AxiosService();
