import axios from "axios";

// Backend API base URL
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,  
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


const refreshAccessToken = async () => {
  try {
    console.log("Attempting token refresh...");


    const res = await axios.post("http://localhost:8080/api/newAccessToken", {}, {
      withCredentials: true, 
    });

    console.log("New token response:", res);

    if (res.status === 200) {
      const { accessToken } = res.data;
      
 
      localStorage.setItem("accessToken", accessToken);


      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      return accessToken;
    }
  } catch (error) {
    console.log("Refresh token expired or invalid:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};


api.interceptors.response.use(
  (response) => {

    console.log("from response:",response);
    
    return response},
  async (error) => {

    console.log("from error:",error);

    const originalRequest = error.config; //url header 

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

