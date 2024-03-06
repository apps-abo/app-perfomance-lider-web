import { useState } from "react";
import Image from "next/image";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { DivLinkValid, TextDev, MainPage, FlexWrap, Card } from "./styles";
import TrocaImagensAutomatica from "@/components/SliderImage";
import Seo from "@/components/Seo";

interface ITokenProps {
  token: string;
}

export default function NovaSenha({ token }: ITokenProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {<Seo title="Perfomance Líder" description="Seja Bem Vindo!" />}
      <MainPage>
        <TrocaImagensAutomatica />
        <Card>
          <FlexWrap>
            <Image
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "10px" }}
            />
            <DivLinkValid>
              <h1 style={{ color: "green" }}>Seja Bem Vindo</h1>
              <p>
                Aqui você encontra os melhores conteudos relacionados a
                liderança no Brasil!
              </p>
              <p>
                Mais informações entre em contato via{" "}
                <a href="https://api.whatsapp.com/send?phone=555599136380&text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20suporte%20do%20aplicativo%20L%C3%ADder.">
                  WhatsApp.
                </a>
              </p>
            </DivLinkValid>
          </FlexWrap>
          <TextDev>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de
              Ontopsicologia
            </p>
          </TextDev>
        </Card>
      </MainPage>
    </>
  );
}
export const getServerSideProps: GetServerSideProps<ITokenProps> = async ({
  query,
}) => {
  const token = query.token ? String(query.token) : "";

  return {
    props: {
      token,
    },
  };
};
