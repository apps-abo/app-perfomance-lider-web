import { useEffect, useState } from "react";
import Head from "next/head";
import { abrirApp, APP_STORE_ID, type Plataforma } from "@/utils/abrirApp";
import BotoesApp from "@/components/BotoesApp";

import { Icon, IconWrapper, Main, Message } from "./styles";

const INITIAL_MESSAGE = "Voce esta sendo direcionado para o App Performance Lider!";
const STORE_MESSAGE =
  "Se o app nao abrir sozinho, use o botao abaixo.";
const DESKTOP_MESSAGE = "Voce precisa estar em um dispositivo movel para abrir o app.";

export default function Inicio() {
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [plataforma, setPlataforma] = useState<Plataforma | null>(null);
  const [caminho, setCaminho] = useState("");

  useEffect(() => {
    const alvo = "inicio";
    setCaminho(alvo);
    const detectada = abrirApp(alvo);
    setPlataforma(detectada);
    setMessage(detectada === "desktop" ? DESKTOP_MESSAGE : STORE_MESSAGE);
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
        <BotoesApp plataforma={plataforma} path={caminho} />
      </Main>
    </>
  );
}
