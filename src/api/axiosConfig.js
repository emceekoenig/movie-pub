import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export default axios.create({
  baseURL: baseURL,
  headers: { "Content-type": "application/json" },
});
