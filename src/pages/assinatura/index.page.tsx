import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as yup from "yup";
import { Modal } from "antd";

import InputMask from "react-input-mask";

import { yupResolver } from "@hookform/resolvers/yup";
import Seo from "@/components/Seo";

import { criarAssinatura } from "@/services/iugu";
import {
  CardData,
  CreditCard,
  DivImages,
  DivTermos,
  FlexWrap,
  PageMain,
} from "./styles";

import { MenuItem, Select } from "@mui/material";
import React from "react";
import TrocaImagensAutomatica from "@/components/SliderImage";

interface IForm {
  first_name: string;
  last_name: string;
  number_credit_card: string;
  verification_value: string;
  expiration: string;
}

interface ISlugProps {
  slug: string;
}

const validationSchema = yup.object({
  first_name: yup
    .string()
    .min(3, "Nome deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  last_name: yup
    .string()
    .min(3, "Sobrenome deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  number_credit_card: yup
    .string()
    .min(16, "Numero do cartão deve ter no minimo 16 caracteres")
    .required("Campo obrigatório"),
  verification_value: yup
    .string()
    .min(3, "Codigo de segurança deve ter no minimo 3 caracteres")
    .required("Campo obrigatório"),
  expiration: yup
    .string()
    .min(4, "Data de expiração deve ter no minimo 4 caracteres")
    .required("Campo obrigatório"),
});

export default function RegistrarAssinatura({ slug }: ISlugProps) {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [parcelas, setParcelas] = useState(1);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const handleParcelasChange = (e: any) => {
    setParcelas(parseInt(e.target.value));
  };

  const submitForm = useCallback(
    async (data: IForm) => {
      try {
        const cc = Iugu.CreditCard(
          data.number_credit_card,
          data.expiration.split("/")[0],
          data.expiration.split("/")[1],
          data.first_name,
          data.last_name,
          data.verification_value
        );

        if (!cc.valid()) {
          Modal.error({
            title: "Cartão de Crédito Inválido!",
            content: "Tente outro cartão por favor!",
          });
          return;
        }

        const response = await new Promise((resolve, reject) => {
          Iugu.createPaymentToken(cc, (response: any) => {
            if (response.errors) {
              Modal.error({
                title: "Houve um erro ao processar seu cartão",
                content: "Tente outro cartão por favor!",
              });
              reject(response.errors);
            } else {
              resolve(response);
              setToken(response.id);
            }
          });
        });

        if (token) {
          const requestData = { slug, token };
          console.log(slug);
          const request = await criarAssinatura(requestData);
          if (request.status == 200) {
            router.push("/assinatura/sucesso");
          }
          if (request.status == 400) {
            router.push("/assinatura/erro");
          } else if (request.status == 500) {
            router.push("/assinatura/erro");
          }
        }
      } catch (error) {
        Modal.error({
          title: "Houve um erro ao processar seu cartão",
          content: "Tente outro cartão por favor!",
        });
      }
    },
    [token, slug, router]
  );

  const handleChange =
    (name: keyof IForm) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value, { shouldValidate: true });
    };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.iugu.com/v2";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      Iugu.setAccountID("C32AADE7CB0A4EDBBED017FA6171DA42");
      Iugu.setTestMode(false);
      Iugu.setup();
    };

    script.onerror = () => {
      console.error("Erro ao carregar o script Iugu");
    };
  }, []);

  return (
    <>
      {
        <Seo
          title="Assinatura Aplicativo Líder"
          description="Pagina para realizar a assinatura  do aplicativo Líder da Associação Brasileira de Ontopsicologia"
        />
      }
      <PageMain>
        <TrocaImagensAutomatica />
        <CardData>
          <FlexWrap>
            <Image
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "40px" }}
            />

            <CreditCard>
              <h1>Assinatura App Líder</h1>
              <p>Bandeiras Aceitas</p>
              <DivImages>
                <Image
                  src="/images/bandeiras-de-cartao-de-credito-como-funcionam-e-principais-375x211.png"
                  alt={"bandeiras-cartões-visa"}
                  width={50}
                  height={30}
                />
                <Image
                  src="/images/bandeiras-de-cartao-de-credito-o-que-sao-e-quais-as-principais-1-1024x795.png"
                  alt={"bandeiras-cartões-master"}
                  width={35}
                  height={30}
                />
                <Image
                  src="/images/dls-logo-bluebox-solid.svg"
                  alt={"bandeiras-cartões-american"}
                  width={30}
                  height={30}
                />
                <Image
                  src="/images/dci-logo-default.svg"
                  alt={"bandeiras-cartões-dinno"}
                  width={70}
                  height={25}
                />
              </DivImages>
            </CreditCard>

            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              type="text"
              onChange={handleChange("first_name")}
              autoFocus
              helperText={errors.first_name?.message}
              inputProps={{ "data-iugu": "first_name" }}
              sx={{ borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Sobrenome"
              name="last_name"
              type="text"
              onChange={handleChange("last_name")}
              autoFocus
              helperText={errors.last_name?.message}
              inputProps={{ "data-iugu": "last_name" }}
              sx={{ borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number_credit_card"
              label="Número do Cartão de Crédito"
              type="text"
              id="number_credit_card"
              onChange={handleChange("number_credit_card")}
              helperText={errors.number_credit_card?.message}
              inputProps={{ "data-iugu": "number" }}
              sx={{ borderRadius: 1 }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: {
                  mask: "9999 9999 9999 9999",
                  maskChar: " ",
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="verification_value"
              label="CVV"
              type="text"
              id="verification_value"
              onChange={handleChange("verification_value")}
              helperText={errors.verification_value?.message}
              inputProps={{ "data-iugu": "verification_value" }}
              sx={{ borderRadius: 1 }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: {
                  mask: "999",
                  maskChar: " ",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="expiration"
              label="Data de vencimento"
              type="text"
              id="expiration"
              onChange={handleChange("expiration")}
              helperText={errors.expiration?.message}
              inputProps={{ "data-iugu": "expiration" }}
              sx={{ borderRadius: 1 }}
              InputProps={{
                inputComponent: InputMask as any,
                inputProps: {
                  mask: "99/99",
                  maskChar: "",
                },
              }}
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
              Ao adquirir e ativar o plano Líder, você autoriza o
              App Líder a realizar cobranças mensais automáticas até o
              cancelamento. Se houver alguma alteração no preço, você receberá
              um aviso com antecedência. Você pode consultar a data de renovação
              ou cancelar a assinatura quando quiser na página da sua conta. Não
              são emitidos reembolsos parciais. São aplicáveis os termos e
              condições do Aplicato Líder.Esta é uma
              compra internacional, sujeita a uma operação de câmbio, que será
              processada por um dos parceiros de pagamento do Aplicativo Líder, de acordo
              com seus termos e condições. Ao clicar em &quot;Comprar e Assinar&quot;, você dá
              ciência e aceita os termos e as condições desta transação.
            </p>
          </DivTermos>
        </CardData>
      </PageMain>
    </>
  );
}

declare var Iugu: any;

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
