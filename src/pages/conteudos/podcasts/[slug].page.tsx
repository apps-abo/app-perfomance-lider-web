import React, { FC, useEffect, useState } from "react";

import { Main, Text, Image, ImageLider } from "../materias/style";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { buscarInformacoes } from "@/services/podcasts";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const IOS_MESSAGE =
  "No iPhone/iPad, abra este link a partir do compartilhamento original para abrir o conteudo no app.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

interface NavegarParaPodcastsProps {
  slug: string;
  podcast: {
    titulo: string;
    thumb: string;
  };
}

const NavegarParaPodcasts: FC<NavegarParaPodcastsProps> = ({ slug, podcast }) => {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href = `intent:#Intent;scheme=mobile-app-lider://conteudos/podcasts/${slug};package=br.com.performancelider.applider;end`;
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
        <title>App Performance Lider - {podcast.titulo}</title>
        <meta name="description" content="Acesse o link direto ao conteudo!" />
        <meta property="og:image" content={podcast.thumb} />
        <meta property="og:title" content={`App Performance Lider - ${podcast.titulo}`} />
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

export default NavegarParaPodcasts;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await buscarInformacoes(query.slug as string);

  return {
    props: {
      slug: query.slug,
      podcast: data,
    },
  };
};
