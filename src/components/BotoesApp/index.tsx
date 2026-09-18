import React from "react";

import { Plataforma, abrirPeloEsquema, urlDaLoja } from "@/utils/abrirApp";
import { Botao, BotaoSecundario, Botoes } from "./styles";

interface BotoesAppProps {
  plataforma: Plataforma | null;
  path: string;
}

/**
 * Botoes de acao das paginas de redirecionamento.
 * O toque do usuario e o que faz o Safari aceitar abrir o app pelo esquema
 * customizado, entao a acao manual e mais confiavel que o redirect automatico.
 */
const BotoesApp = ({ plataforma, path }: BotoesAppProps) => {
  if (!plataforma || plataforma === "desktop") return null;

  const loja = urlDaLoja(plataforma);

  return (
    <Botoes>
      <Botao type="button" onClick={() => abrirPeloEsquema(path)}>
        Abrir no app
      </Botao>
      {loja && (
        <BotaoSecundario href={loja}>Ainda nao tenho o app</BotaoSecundario>
      )}
    </Botoes>
  );
};

export default BotoesApp;
