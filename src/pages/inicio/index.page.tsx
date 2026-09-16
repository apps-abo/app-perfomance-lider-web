import { useEffect, useState } from "react";
import Head from "next/head";
import { abrirApp, APP_STORE_ID } from "@/utils/abrirApp";

import { Icon, IconWrapper, Main, Message } from "./styles";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir, voce sera direcionado para a loja para instala-lo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

export default function Inicio() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const plataforma = abrirApp("inicio");
    setMessage(plataforma === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-itunes-app" content={`app-id=${APP_STORE_ID}`} />
        <title>Inicio - App Performance Lider</title>
        <meta name="description" content="Acesse o app Performance Lider pela home." />
        <meta property="og:image" content="/images/Favico-AppLider2023.png" />
        <meta property="og:title" content="Inicio - App Performance Lider" />
        <meta property="og:description" content="Acesse o app Performance Lider pela home." />
      </Head>

      <Main>
        <IconWrapper>
          <Icon src="/images/Favico-AppLider2023.png" alt="Icone App Performance Lider" />
        </IconWrapper>

        <Message>{message}</Message>
      </Main>
    </>
  );
}
