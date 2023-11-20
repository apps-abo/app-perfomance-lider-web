import { api } from "../api";
import { INovaSenha, IClienteResponse } from "./interface";

const url = "auth";

export const novaSenha = (data: INovaSenha, token: string) => {
  return api.patch<IClienteResponse>(`${url}/renewal-password?token=${token}`, data);
};

export const validarToken = (token: string) => {
  return api.get(`${url}/validate-token?token=${token}`);
};
