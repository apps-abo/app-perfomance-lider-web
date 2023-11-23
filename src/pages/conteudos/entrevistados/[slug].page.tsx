import React, { FC, useEffect, useState } from "react";

import { Main, Text, Button, Image, ImagemFund, ImageLider } from "./style";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface NavegarParaEntrevistadosProps {
  slug: string
}

const NavegarParaEntrevistados: FC<NavegarParaEntrevistadosProps> = ({slug}) => {
  const [message, setMessage] = useState(
    "Você está sendo direcionado para o APP Ontopsicologia!"
  );

  useEffect(() => {
    click();
  }, []);


  const click = () => {
    console.log(slug)
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://entrevistados?slug=${slug};package=br.com.performancelider.applider;end`;
      return;
    }
    var algo = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !algo.MSStream) {
      // alert(`app-ontopsicologia://${configRoute()}`)
      window.location.href = `mobile-app-lider://entrevistados?slug=${slug}`;
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

export default NavegarParaEntrevistados;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

	return {
		props: {
			slug: query.slug
		},
	};
};