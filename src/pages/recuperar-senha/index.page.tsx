import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { FormControlLabel, Switch } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import ErrorModal from "@/components/Modals/ModalError";
import Seo from "@/components/Seo";

import { Card, DivTextLogin, FlexWrap, MainPage, TextDev } from "../styles";
import TrocaImagensAutomatica from "@/components/SliderImage";

interface IForm {
  senha: string;
  verificacaosenha: string;
}

interface IResponde {
  error: string;
}

const validationSchema = yup.object({
  senha: yup.string().required("Campo obrigatório"),
  verificacaosenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas devem coincidir")
    .required("Campo obrigatório"),
});

export default function NovaSenha() {
  const [checked, setChecked] = useState<boolean>(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorModalOpenMesage, setErrorModalOpenMesage] = useState<
    IResponde | undefined
  >();

  const handleShowErrorModal = (result: IResponde | undefined) => {
    setErrorModalOpen(true);
    setErrorModalOpenMesage(result);
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const router = useRouter();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

  const submitForm = async (data: IForm) => {
    router.push(callbackUrl);
  };

  const handleChange =
    (name: "senha" | "verificacaosenha") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(name, e.target.value, { shouldValidate: true });
    };

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
              src="/images/logo-abo.png"
              alt="Descrição da imagem"
              width={75.8}
              height={70}
            />
            <DivTextLogin>
              <h1>Recuperar Senha</h1>
              <p>Insira sua nova senha</p>
            </DivTextLogin>
            <TextField
              margin="normal"
              required
              fullWidth
              id="senha"
              label="Senha"
              name="senha"
              autoComplete="senha"
              onChange={handleChange("senha")}
              autoFocus
              helperText={errors.senha?.message}
              sx={{ borderRadius: 1 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="vsenha"
              label="Verificacao de Senha"
              type="vsenha"
              id="vsenha"
              onChange={handleChange("verificacaosenha")}
              helperText={errors.verificacaosenha?.message}
              autoComplete="current-password"
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
              Atualizar
            </Button>
          </FlexWrap>

          <TextDev>
            <p>
              Desenvolvido por Imago Dev | © Associação Brasileira de
              Ontopsicologia
            </p>
          </TextDev>
        </Card>
      </MainPage>
      {
        <ErrorModal
          open={errorModalOpen}
          onClose={handleCloseErrorModal}
          messageError={errorModalOpenMesage}
        />
      }
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

// 	const session = await getSession({ req });

// 	if (session) {
// 		return {
// 			redirect: {
// 				permanent: false,
// 				destination: '/',
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// };
