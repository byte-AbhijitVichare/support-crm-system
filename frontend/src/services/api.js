import axios from "axios";

const API = axios.create({
  baseURL: "https://support-crm-system-mzed.onrender.com"
});

export default API;
