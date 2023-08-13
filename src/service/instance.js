import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://studiorinternational.in/test/qrcodes/host/api",
});
const token = Cookies.get("token");
instance.defaults.headers.common["Authorization"] = token;

export default instance;
