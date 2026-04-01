import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { validarToken } from "@/services/recuperar-senha";

import {
  DivLinkValid,
  TextDev,
  MainPage,
  FlexWrap,
  Card,
} from "../styles";
import TrocaImagensAutomatica from "@/components/SliderImage";
import Seo from "@/components/Seo";
import ResetPasswordPage, {
  ResetPasswordStatus,
} from "@/components/ResetPasswordStatus";
import { Spin } from "antd";

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
        await validarToken(token);
        setChecked(true);
        router.push(`/recuperar-senha/alterar-senha?token=${token}`);
      }
    } catch (error) {
      setChecked(true);
    }
  }, [router, token]);

  useEffect(() => {
    validatorTokenfunction();
  }, [token, validatorTokenfunction]);

  if (!checked) {
    return (
      <div>
        {
          <Seo
            title="Redefinição de Senha"
            description="Pagina para realizar redefinição de senha  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
          />
        }
        <ResetPasswordPage status={ResetPasswordStatus.InvalidLink} />
      </div>
    );
  }
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
              <Spin
                spinning={true}
                tip="Carregando"
                size="large"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
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
