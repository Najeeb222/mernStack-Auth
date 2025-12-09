import { LoginPayload, RegisterPayload } from "types";
import api from "./api";


export const registerUser = async (userData: RegisterPayload) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData: LoginPayload) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
