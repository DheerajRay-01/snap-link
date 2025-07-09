import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});



axiosInstance.interceptors.response.use(
  function (response) {
    // ✅ Return the response if no error
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      console.log(originalRequest);
      console.log("🔁 Access token expired. Attempting refresh...");

      originalRequest._retry = true; // Prevent infinite loop

      try {

        await axiosInstance.get("/user/refresh-token");

   
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token failed", refreshError);
        // Optionally logout user here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);



export default axiosInstance;
