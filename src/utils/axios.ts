import axios from "axios";

export const axiosInit = () => {
  // move these keys to some sort of appsettings, take a look at GitHub secrets
  axios.defaults.baseURL = process.env.REACT_APP_SUPABASE_URL!;
  axios.defaults.headers.common["apikey"] =
    process.env.REACT_APP_SUPABASE_ANON_KEY!;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Prefer"] = "return=representation";

  // configure interceptors: pick auth header from session storage - add it to all requests
  axios.interceptors.request.use(function (config) {
    let authorizationHeader = getAuthorizationHeader();

    if (config.headers != undefined) {
      config.headers.Authorization = authorizationHeader;
    }
    return config;
  });

  function getAuthorizationHeader() {
    let auththorizationHeader = "";
    let session = localStorage.getItem(
      process.env.REACT_APP_SUPABASE_SESSION_KEY!
    );
    if (session !== null) {
      let sessionObject = JSON.parse(session);
      auththorizationHeader = "Bearer " + sessionObject["access_token"];
    }
    return auththorizationHeader;
  }

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let errorMessage = error.response.data.message;
      window.location.href = `/error/${errorMessage}`;
      return Promise.reject(error);
    }
  );
};
export default axiosInit;
