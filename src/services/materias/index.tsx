import { api } from "../api";

const url = "/materias";

export const buscarInformacoes = (slug: string) => {
  return api.get(`${url}/buscar-compartilhar/${slug}`);
};

