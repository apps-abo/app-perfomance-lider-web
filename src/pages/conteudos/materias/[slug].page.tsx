import React, { FC, useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "./style";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { buscarInformacoes } from "@/services/materias";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const IOS_MESSAGE =
  "No iPhone/iPad, abra este link a partir do compartilhamento original para abrir o conteudo no app.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

interface NavegarParaMateriasProps {
  slug: string;
  materia: {
    titulo: string;
    banner: string;
    categorias: string[];
  };
}

const NavegarParaMaterias: FC<NavegarParaMateriasProps> = ({ slug, materia }) => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://materias?slug=${slug};package=br.com.performancelider.applider;end`;
      return;
    }

    const browserWindow = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream) {
      setMessage(IOS_MESSAGE);
      return;
    }

    setMessage(DESKTOP_MESSAGE);
  }, [slug]);

  return (
    <>
      <Head>
        <title>
          App Performance Lider - {materia.titulo} ({materia.categorias.join(", ")})
        </title>
        <meta name="description" content="Acesse o link direto ao conteudo!" />
        <meta property="og:image" content={materia.banner} />
        <meta
          property="og:title"
          content={`App Performance Lider - ${materia.titulo} (${materia.categorias.join(
            ", "
          )})`}
        />
        <meta property="og:description" content="Acesse o link direto ao conteudo!" />
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

export default NavegarParaMaterias;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await buscarInformacoes(query.slug as string);

  return {
    props: {
      slug: query.slug,
      materia: data,
    },
  };
};
