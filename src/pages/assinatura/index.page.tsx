import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
import { Spin, Modal } from "antd";

import InputMask from "react-input-mask";

import { yupResolver } from "@hookform/resolvers/yup";
import Seo from "@/components/Seo";

import { criarAssinatura } from "@/services/iugu";
import {
  CardData,
  CreditCard,
  DivImages,
  DivTermos,
  DivTextLogin,
  FlexWrap,
  PageMain,
} from "./styles";

import React from "react";
import TrocaImagensAutomatica from "@/components/SliderImage";
import { Typography } from "@mui/material";

interface IForm {
  nome: string;
  cpfCnpj: string;
  email: string;
}

interface ISlugProps {
  slug: string;
}

const validationSchema = yup.object({
  nome: yup
    .string()
    .min(3, "Nome deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  cpfCnpj: yup
    .string()
    .min(11, "Cpf ou Cnpj deve ter no minimo 11 caracteres")
    .required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
});

export default function RegistrarAssinatura() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mask, setMask] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitForm = useCallback(
    async (data: IForm) => {
      try {
        setLoading(true);
        const request = await criarAssinatura(data);
        if (request.status == 200) {
          const secureUrl = request.data;
          window.location.href = secureUrl;
        }
        if (request.status == 400) {
          router.push("/assinatura/erro");
        } else if (request.status == 500) {
          router.push("/assinatura/erro");
        }
      } catch (error) {
        Modal.error({
          title: "Houve um erro ao tentar cadastrar seus dados",
          content: "Tente mais tarde!",
        });
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  let timer: NodeJS.Timeout;

  const handleChange =
    (name: keyof IForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value, { shouldValidate: true });
      const inputValue = e.target.value;

      if (!inputValue) {
        setMask("");
        return;
      }

      const onlyNumbers = inputValue.replace(/\D/g, "");

      const applyMask = () => {
        if (onlyNumbers.length <= 11) {
          setMask("999.999.999-99");
        } else {
          setMask("99.999.999/9999-99");
        }
      };

      clearTimeout(timer);
      timer = setTimeout(applyMask, 300);
    };

  return (
    <>
      {
        <Seo
          title="Assinatura Aplicativo Líder"
          description="Pagina para realizar a assinatura  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
        />
      }
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            backdropFilter: "blur(10px)",
          }}
        >
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
        </div>
      )}
      <PageMain>
        <TrocaImagensAutomatica />
        <CardData>
          <FlexWrap>
            <Image
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "10px" }}
            />

            <DivTextLogin>
              <h1>Assinatura App Líder</h1>
              <p>Insira seus dados para efetuar sua assinatura</p>
            </DivTextLogin>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              type="text"
              onChange={handleChange("nome")}
              autoFocus
              helperText={
                errors.nome && (
                  <Typography variant="body2" color="error">
                    {errors.nome.message}
                  </Typography>
                )
              }
              inputProps={{ "data-iugu": "name" }}
              sx={{ borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cpfCnpj"
              label="Cpf ou Cnpj"
              name="cpfCnpj"
              type="text"
              onChange={handleChange("cpfCnpj")}
              autoFocus
              helperText={
                errors.cpfCnpj && (
                  <Typography variant="body2" color="error">
                    {errors.cpfCnpj.message}
                  </Typography>
                )
              }
              inputProps={{ "data-iugu": "cpfCpnj" }}
              sx={{ borderRadius: 1 }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: {
                  mask: mask,
                  maskChar: " ",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="text"
              id="email"
              onChange={handleChange("email")}
              helperText={
                errors.email && (
                  <Typography variant="body2" color="error">
                    {errors.email.message}
                  </Typography>
                )
              }
              inputProps={{ "data-iugu": "number" }}
              sx={{ borderRadius: 1 }}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit(submitForm)}
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 2,
                color: "#fff",
                fontSize: 16,
              }}
            >
              Concordar e Assinar
            </Button>
          </FlexWrap>
          <DivTermos>
            <p>
              Ao adquirir e ativar o plano Líder, você autoriza o App Líder a
              realizar cobranças até o cancelamento. Se houver alguma alteração
              no preço, você receberá um aviso com antecedência. Você pode
              consultar a data de renovação ou cancelar a assinatura quando
              quiser na página da sua conta dnetro do App Líder. Não são
              emitidos reembolsos parciais. São aplicáveis os termos e condições
              do Aplicato Líder.Esta é uma compra internacional, sujeita a uma
              operação de câmbio, que será processada por um dos parceiros de
              pagamento do Aplicativo Líder, de acordo com seus termos e
              condições. Ao clicar em &quot;Comprar e Assinar&quot;, você dá
              ciência e aceita os termos e as condições desta transação.
            </p>
          </DivTermos>
        </CardData>
      </PageMain>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ISlugProps> = async ({
  query,
}) => {
  const slug = query.slug ? String(query.slug) : "";

  return {
    props: {
      slug,
    },
  };
};
