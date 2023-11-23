import React, { FC, useEffect, useState } from "react";

import { Main, Text, Button, Image, ImagemFund, ImageLider } from "./style";
import { GetServerSideProps } from "next";
import Head from "next/head";



const NavegarParaPlanos= () => {
  const [message, setMessage] = useState(
    "Você está sendo direcionado para o App Performance Líder!"
  );

  useEffect(() => {
    click();
  }, []);


  const click = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://planos;package=br.com.performancelider.applider;end`;

      return;
    }
    var algo = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !algo.MSStream) {
      // alert(`app-ontopsicologia://${configRoute()}`)
      window.location.href = `mobile-app-lider://planos`;
      return;
    }
    setMessage("Você precisa estar em um dispositivo móvel para ter acesso!");
    console.log(userAgent);
  };
  
  return (
    <>
      <Head>
        <title>Planos - App Performance Líder</title>
        <meta
          name="description"
          content="Seleção de plano do App Perfomance Líder."
        />
       <meta property="og:image" content="/images/Favico-AppLider2023.png" />
       <meta property="og:title" content="App Performance Líder"/>
       <meta property="og:description" 
          content="Seleção de plano do App Perfomance Líder." />
      </Head>
      <div>
        <Main>
          <Image>
            <ImageLider
              src="/images/Favico-AppLider2023.png"
              alt="Minha Imagem"
            />
          </Image>
          {/* <ImagemFund src={logo} /> */}
          {/* <Text>{message}</Text> */}
          {message ===
          "Você está sendo direcionado para o App Performance Líder!" ? (
            <Button onClick={click}>Acessar conteúdo</Button>
          ) : (
            <div />
          )}
        </Main>
      </div>
    </>
  );
};

export default NavegarParaPlanos;
