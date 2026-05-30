import { api } from "../api";

const url = "/podcasts";

export const buscarInformacoes = (slug: string) => {
  return api.get(`${url}/buscar-compartilhar/${slug}`);
};
