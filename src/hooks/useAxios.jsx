import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://smart-deals-server-10.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
