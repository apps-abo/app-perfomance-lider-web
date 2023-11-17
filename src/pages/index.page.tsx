import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { validarToken } from "@/services/recuperar-senha";

import { DivLinkValid, DivTextLogin, TextDev } from "./styles";
import TrocaImagensAutomatica from "@/components/SliderImage";

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
        console.log(response);
        if (response.status === 200) {
          setChecked(true);
          router.push("/recuperar-senha");
        }
        if (response.status === 400) {
          return (
            <>
              <TrocaImagensAutomatica />
              <DivLinkValid>
                <Image
                  src="/images/logo-abo.png"
                  alt="Descrição da imagem"
                  width={75.8}
                  height={70}
                />
                <DivTextLogin>
                  <h1>Link de Recuperação de Senha Inválido</h1>
                  <p>Gere um novo link por favor!</p>
                </DivTextLogin>
              </DivLinkValid>
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
  }, []);
  useEffect(() => {
    validatorTokenfunction();
  }, [token]);
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <TrocaImagensAutomatica />
        <DivLinkValid>
          <Image
            src="/images/Favico-AppLider2023.png"
            alt="Descrição da imagem"
            width={85}
            height={80}
			style={{ borderRadius: '10px' }}
          />
          <h1>Carregando</h1>
          <TextDev>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de
              Ontopsicologia
            </p>
          </TextDev>
        </DivLinkValid>
      </div>
    );
  }
  if (!checked) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <TrocaImagensAutomatica />
        <DivLinkValid>
          <Image
            src="/images/Favico-AppLider2023.png"
            alt="Descrição da imagem"
            width={85}
            height={80}
			style={{ borderRadius: '10px' }}
          />
          <h1>Link de Recuperação de Senha Inválido</h1>
          <p>Gere um novo link por favor!</p>
          <TextDev>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de
              Ontopsicologia
            </p>
          </TextDev>
        </DivLinkValid>
      </div>
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
