import React, { useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "./style";
import Head from "next/head";
import { abrirApp, APP_STORE_ID, type Plataforma } from "@/utils/abrirApp";
import BotoesApp from "@/components/BotoesApp";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir sozinho, use o botao abaixo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

const NavegarParaPlanos = () => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [caminho, setCaminho] = useState("");

  useEffect(() => {
    const alvo = "planos";
    setCaminho(alvo);
    const detectada = abrirApp(alvo);
    setPlataforma(detectada);
    setMessage(detectada === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
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
          <BotoesApp plataforma={plataforma} path={caminho} />
        </Main>
      </div>
    </>
  );
};

export default NavegarParaPlanos;
