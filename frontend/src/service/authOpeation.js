import { endpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import { setUser, setToken } from "../slices/userSlice";
import toast from "react-hot-toast";

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    const response = await apiConnector(
      "POST",
      endpoints.login,
      data,
      null,
      null
    ).catch((err) => {
      toast.error("Error logging in");
      toast.dismiss(toastId);
    });
    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    toast.success("Successfully Logged in");
    toast.dismiss(toastId);
    navigate("/");
  };
}

export function signUp(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    const response = await apiConnector(
      "POST",
      endpoints.signup,
      data,
      null,
      null
    ).catch((err) => {
      toast.error("Error signing up");
      toast.dismiss(toastId);
    });
    toast.success("Successfully Signed up");
    toast.dismiss(toastId);
    navigate("/login");
  };
}