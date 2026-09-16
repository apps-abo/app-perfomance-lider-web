import React, { useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "./style";
import Head from "next/head";
import { abrirApp, APP_STORE_ID } from "@/utils/abrirApp";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir, voce sera direcionado para a loja para instala-lo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

const NavegarParaPlanos = () => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const plataforma = abrirApp("planos");
    setMessage(plataforma === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        <title>Planos - App Performance Lider</title>
        <meta name="description" content="Selecao de plano do App Performance Lider." />
        <meta property="og:image" content="/images/Favico-AppLider2023.png" />
        <meta property="og:title" content="App Performance Lider" />
        <meta
          property="og:description"
          content="Selecao de plano do App Performance Lider."
        />
      </Head>
      <div>
        <Main>
          <Image>
            <ImageLider src="/images/Favico-AppLider2023.png" alt="Icone do App Lider" />
          </Image>
          <Text>{message}</Text>
        </Main>
      </div>
    </>
  );
};

export default NavegarParaPlanos;
