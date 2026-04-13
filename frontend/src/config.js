// backend deployed on Render
const url_production = "https://doctor-backend-0wvd.onrender.com";

// backend running locally
const url_local = "http://localhost:5000";

// automatically use production backend
export const BASE_URL = url_production;

// get login token from browser storage
export const token = localStorage.getItem("token");
