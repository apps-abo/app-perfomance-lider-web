import React, { FC, useEffect, useState } from "react";

import { Main, Text, Button, Image, ImagemFund, ImageLider } from "./style";
import { GetServerSideProps } from "next";



const NavegarParaPlanos= () => {
  const [message, setMessage] = useState(
    "Você está sendo direcionado para o APP Ontopsicologia!"
  );

  useEffect(() => {
    click();
  }, []);


  const click = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=br.com.performancelider.applider://planos;package=br.com.performancelider.applider;end`;
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
        "Você está sendo direcionado para o APP Ontopsicologia!" ? (
          <Button onClick={click}>Acessar conteúdo</Button>
        ) : (
          <div />
        )}
      </Main>
    </div>
  );
};

export default NavegarParaPlanos;
