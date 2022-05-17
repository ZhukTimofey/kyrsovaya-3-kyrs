import axios from "axios";
import history from "./historyObject";

export function axiosMiddleware() {
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response.status === 401 &&
        history.location.pathname !== "/login"
      ) {
        history.replace("/login");
      }
      return Promise.reject(error);
    }
  );
}
