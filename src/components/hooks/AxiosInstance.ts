import axios, { AxiosError } from "axios";
import { error } from "console";
import React from "react";
import { toast } from "react-toastify";


const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use( async config => {
  const token = localStorage.getItem('access_token')
  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = (data as { message?: string }).message;
      switch (status) {
        case 400:
          toast.error(errorMessage || "Bad Request");
          break;

        case 401:
          toast.error(errorMessage || "Unauthorized Request");
          break;

        case 403:
          toast.error(errorMessage || "Forbidden");
          break;

        case 404:
          toast.error(errorMessage || "Not found");
          break;

        case 500:
          toast.error(errorMessage || "Internal Server Error");
          break;

        default:
          toast.error(errorMessage || "An error Occured");
          break;
      }
    } else if (error.request) {
      toast.error("No response recieved from the server ");
    } else {
      toast.error("Error in setting up the Request");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
