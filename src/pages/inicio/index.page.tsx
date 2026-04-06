import { useEffect, useState } from "react";
import Head from "next/head";

import { Icon, IconWrapper, Main, Message } from "./styles";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const IOS_MESSAGE =
  "No iPhone/iPad, abra este link a partir do compartilhamento original para abrir o app.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

export default function Inicio() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "intent:#Intent;scheme=mobile-app-lider://inicio;package=br.com.performancelider.applider;end";
      return;
    }

    const browserWindow = window as any;
    if (/iPad|iPhone|iPod/.test(userAgent) && !browserWindow.MSStream) {
      setMessage(IOS_MESSAGE);
      return;
    }

    setMessage(DESKTOP_MESSAGE);
  }, []);

  return (
    <>
      <Head>
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
