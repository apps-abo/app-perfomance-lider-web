export interface INovaSenha {
	senha: string;
	verificacaosenha: string;
}

export interface IClienteResponse {
	token: string;
	usuario: {
		nome: string;
        sobrenome: string;
		email: string;
        celular: string;

	};
}
