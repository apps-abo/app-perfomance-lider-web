import { api } from "../api";

const url = "politica"

export const policyTerms = (slug: string) => {
    return api.get(`${url}/${slug}`,
    );
  };