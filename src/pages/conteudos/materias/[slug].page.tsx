import React, { FC, useEffect, useState } from "react";

import { Main, Text, Button, Image, ImagemFund, ImageLider } from "./style";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { buscarInformacoes } from "@/services/materias";

interface NavegarParaMateriasProps {
  slug: string,
  materia: {
    titulo: string,
    banner: string,
    categorias: string[],
  }
}

const NavegarParaMaterias: FC<NavegarParaMateriasProps> = ({slug, materia}) => {
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
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://materias?slug=${slug};package=br.com.performancelider.applider;end`;

      return;
    }
    var algo = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !algo.MSStream) {
      // alert(`app-ontopsicologia://${configRoute()}`)
      window.location.href = `mobile-app-lider://materias?slug=${slug}`;
      return;
    }
    setMessage("Você precisa estar em um dispositivo móvel para ter acesso!");
    console.log(userAgent);
  };
  
  return (
    <>
    <Head>
        <title>App Performance Líder - {materia.titulo} ({materia.categorias.join(", ")}) </title>
        <meta
          name="description"
          content="Acesse o link direto ao conteúdo!"
        />
       <meta property="og:image" content={materia.banner} />
       <meta property="og:title" content={`App Performance Líder - ${materia.titulo} (${materia.categorias.join(", ")})`}/>
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

export default NavegarParaMaterias;

export const getServerSideProps: GetServerSideProps = async ({  query }) => {
  const {data} = await buscarInformacoes(query.slug as string)
  console.log(data)
	return {
		props: {
			slug: query.slug,
      materia: data
		},
	};
};