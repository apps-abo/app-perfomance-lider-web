import React, { FC, useEffect } from "react";

import { Main, Image, ImageLider } from "./style";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { buscarInformacoes } from "@/services/materias";

interface NavegarParaMateriasProps {
  slug: string;
  materia: {
    titulo: string;
    banner: string;
    categorias: string[];
  };
}

const NavegarParaMaterias: FC<NavegarParaMateriasProps> = ({ slug, materia }) => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://materias?slug=${slug};package=br.com.performancelider.applider;end`;
      return;
    }

    const browserWindow = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream) {
      window.location.href = `mobile-app-lider://materias?slug=${slug}`;
    }
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
