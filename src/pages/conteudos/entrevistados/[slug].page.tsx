import React, { FC, useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "./style";
import { GetServerSideProps } from "next";
import { buscarInformacoes } from "@/services/entrevistados";
import Head from "next/head";
import { abrirApp, APP_STORE_ID, type Plataforma } from "@/utils/abrirApp";
import BotoesApp from "@/components/BotoesApp";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir sozinho, use o botao abaixo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

interface NavegarParaEntrevistadosProps {
  slug: string;
  entrevistado: {
    titulo: string;
    banner: string;
    categorias: string[];
  };
}

const NavegarParaEntrevistados: FC<NavegarParaEntrevistadosProps> = ({
  slug,
  entrevistado,
}) => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [caminho, setCaminho] = useState("");

  useEffect(() => {
    const alvo = `conteudos/entrevistados/${slug}`;
    setCaminho(alvo);
    const detectada = abrirApp(alvo);
    setPlataforma(detectada);
    setMessage(detectada === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
  }, [slug]);

  return (
    <>
      <Head>
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        <title>
          App Performance Lider - {entrevistado.titulo} (
          {entrevistado.categorias.join(", ")})
        </title>
        <meta name="description" content="Acesse o link direto ao conteudo!" />
        <meta property="og:image" content={entrevistado.banner} />
        <meta
          property="og:title"
          content={`App Performance Lider - ${entrevistado.titulo} (${entrevistado.categorias.join(
            ", "
          )})`}
        />
        <meta property="og:description" content="Acesse o link direto ao conteudo!" />
      </Head>
      <div>
        <Main>
          <Image>
            <ImageLider src="/images/Favico-AppLider2023.png" alt="Icone do App Lider" />
          </Image>
          <Text>{message}</Text>
          <BotoesApp plataforma={plataforma} path={caminho} />
        </Main>
      </div>
    </>
  );
};

export default NavegarParaEntrevistados;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await buscarInformacoes(query.slug as string);

  return {
    props: {
      slug: query.slug,
      entrevistado: data,
    },
  };
};
