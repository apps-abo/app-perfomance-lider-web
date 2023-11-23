import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { validarToken } from "@/services/recuperar-senha";

import {
  DivLinkValid,
  DivTextLogin,
  TextDev,
  MainPage,
  FlexWrap,
  Card,
} from "../styles";
import TrocaImagensAutomatica from "@/components/SliderImage";
import Seo from "@/components/Seo";

interface ITokenProps {
  token: string;
}

export default function NovaSenha({ token }: ITokenProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const validatorTokenfunction = useCallback(async () => {
    try {
      setLoading(true);
      if (token) {
        const response = await validarToken(token);
        if (response.status === 200) {
          setChecked(true);
          router.push(`/recuperar-senha/alterar-senha?token=${token}`);
        }
        if (response.status === 400) {
          return (
            <>
              {
                <Seo
                  title="Redefinição de Senha"
                  description="Pagina para realizar redefinição de senha  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
                />
              }
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
                      <h1>Link de Recuperação de Senha Inválido</h1>
                      <p>Gere um novo link por favor!</p>
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
        } else {
          setChecked(false);
        }
      }
    } catch (error) {
      setChecked(false);
    } finally {
      setLoading(false);
    }
  }, [router, token]);

  useEffect(() => {
    validatorTokenfunction();
  }, [token, validatorTokenfunction]);

  if (loading) {
    return (
      <>
        {
          <Seo
            title="Redefinição de Senha"
            description="Pagina para realizar redefinição de senha  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
          />
        }
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
                <h1>Validando Link!</h1>
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
  if (!checked) {
    return (
      <>
        {
          <Seo
            title="Redefinição de Senha"
            description="Pagina para realizar redefinição de senha  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
          />
        }
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
                <h1>Link de Recuperação de Senha Inválido</h1>
                <p>Gere um novo link por favor!</p>
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
