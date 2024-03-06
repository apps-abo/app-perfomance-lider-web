import { api } from "../api";
import { ICriarAssinatura} from "./interface";

const url = "pagamento";

export const criarAssinatura = (data: ICriarAssinatura) => {
  return api.post(`${url}/iugu`,data);
};
