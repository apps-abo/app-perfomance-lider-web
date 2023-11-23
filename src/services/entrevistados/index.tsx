import { api } from "../api";

const url = "/entrevistados";

export const buscarInformacoes = (slug: string) => {
  return api.get(`${url}/buscar-compartilhar/${slug}`);
};

