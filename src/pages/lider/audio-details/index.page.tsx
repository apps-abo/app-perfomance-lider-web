import React, { useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "../../conteudos/materias/style";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { abrirApp, APP_STORE_ID, type Plataforma } from "@/utils/abrirApp";
import BotoesApp from "@/components/BotoesApp";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir sozinho, use o botao abaixo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

interface NavegarParaAudioProps {
  id: string;
  type: string;
}

const NavegarParaAudio = ({ id, type }: NavegarParaAudioProps) => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [caminho, setCaminho] = useState("");

  useEffect(() => {
    const query = new URLSearchParams({ id, ...(type ? { type } : {}) }).toString();
    const alvo = `lider/audio-details?${query}`;
    setCaminho(alvo);
    const detectada = abrirApp(alvo);
    setPlataforma(detectada);
    setMessage(detectada === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
  }, [id, type]);

  return (
    <>
      <Head>
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        <title>Audio - App Performance Lider</title>
        <meta name="description" content="Acesse o link direto ao conteudo!" />
        <meta property="og:image" content="/images/Favico-AppLider2023.png" />
        <meta property="og:title" content="App Performance Lider" />
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

export default NavegarParaAudio;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = typeof query.id === "string" ? query.id : "";
  const type = typeof query.type === "string" && query.type !== "undefined" ? query.type : "";

  if (!id || id === "undefined") {
    return { redirect: { destination: "/inicio", permanent: false } };
  }

  return { props: { id, type } };
};
