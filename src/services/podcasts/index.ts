import { api } from "../api";

const url = "/podcast";

export const buscarInformacoes = (slug: string) => {
  return api.get(`${url}/buscar-compartilhar/${slug}`);
};
