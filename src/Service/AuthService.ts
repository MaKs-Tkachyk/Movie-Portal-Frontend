import axios, { AxiosResponse } from "axios";
import $api, { API_URL } from "../http/api";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/login", { email, password });
  }
  static async registration(
    email: string,
    password: string,
    userName: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/registration", { email, password, userName });
  }
  static async logout(): Promise<void> {
    return axios.post(`${API_URL}/logout`, {
      withCredentials: true,
    });
  }
}
