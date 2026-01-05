import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://smart-deals-server-10.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  const { user, signOutUser } = useAuth();
  useEffect(() => {
    //! request intercepters -------------------------
    const requestIntercepter = instance.interceptors.request.use((config) => {
      //console.log("Config: ", config);
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });
    //! respons intercepters -------------------------
    const responsIntercepter = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        //console.log("error intercepter: ", error);
        const status = error.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            //console.log("logg");
            navigate("/login");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestIntercepter);
      instance.interceptors.response.eject(responsIntercepter);
    };
  }, []);
  return instance;
};

export default useAxiosSecure;
