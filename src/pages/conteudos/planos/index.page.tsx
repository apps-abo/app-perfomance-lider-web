import React, { useEffect } from "react";

import { Main, Image, ImageLider } from "./style";
import Head from "next/head";

const NavegarParaPlanos = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent:#Intent;scheme=mobile-app-lider://planos;package=br.com.performancelider.applider;end";
      return;
    }

    const browserWindow = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream) {
      window.location.href = "mobile-app-lider://planos";
    }
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
        </Main>
      </div>
    </>
  );
};

export default NavegarParaPlanos;
