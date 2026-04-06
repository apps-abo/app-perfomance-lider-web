import React, { useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "./style";
import Head from "next/head";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const IOS_MESSAGE =
  "No iPhone/iPad, abra este link a partir do compartilhamento original para abrir o app.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

const NavegarParaPlanos = () => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent:#Intent;scheme=mobile-app-lider://planos;package=br.com.performancelider.applider;end";
      return;
    }

    const browserWindow = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream) {
      setMessage(IOS_MESSAGE);
      return;
    }

    setMessage(DESKTOP_MESSAGE);
  }, []);

  return (
    <>
      <Head>
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
