import axios, { AxiosError } from "axios"

import { get } from "lodash"

export type ErroResponse = Error | AxiosError

export const tratarResponse = (e: ErroResponse) => {
	if (axios.isAxiosError(e) && e.response?.status && e.response.status != 500) {
		const status = e.response.status
		if (status == 422) {
			return {
				message: "Dados inconscientes",
				errosValidacao: (e.response.data as { erro: string }[]).map(({ erro }) => erro)
			}
		}
		const erro = get(e, "response.data.error", null)
		if (erro) {
			return {
				message: erro
			}
		}
		return {
			message: "Erro inesperado"
		}
	} else {
		return {
			message: "Erro inesperado"
		}
	}
}
