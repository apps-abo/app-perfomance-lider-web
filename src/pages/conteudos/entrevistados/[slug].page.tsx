import React, { FC, useEffect, useState } from "react";

import { Main, Text, Button, Image, ImagemFund, ImageLider } from "./style";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { buscarInformacoes } from "@/services/entrevistados";
import Head from "next/head";

interface NavegarParaEntrevistadosProps {
  slug: string,
  entrevistado: {
    titulo: string,
    banner: string,
    categorias: string[],
  }
}

const NavegarParaEntrevistados: FC<NavegarParaEntrevistadosProps> = ({slug, entrevistado}) => {
  const [message, setMessage] = useState(
    "Você está sendo direcionado para o App Performance Líder!"
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
   <>
    <Head>
        <title>App Performance Líder - {entrevistado.titulo} ({entrevistado.categorias.join(", ")}) </title>
        <meta
          name="description"
          content="Acesse o link direto ao conteúdo!"
        />
       <meta property="og:image" content={entrevistado.banner} />
       <meta property="og:title" content={`App Performance Líder - ${entrevistado.titulo} (${entrevistado.categorias.join(", ")})`}/>
       <meta property="og:description" 
          content="Acesse o link direto ao conteúdo!" />
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

export default NavegarParaEntrevistados;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const {data} = await buscarInformacoes(query.slug as string)
	return {
		props: {
			slug: query.slug,
      entrevistado: data
		},
	};
};