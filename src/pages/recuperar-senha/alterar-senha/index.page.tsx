import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import Seo from "@/components/Seo";

import { Card, DivTextLogin, FlexWrap, MainPage, TextDev } from "../../styles";
import TrocaImagensAutomatica from "@/components/SliderImage";
import { novaSenha } from "@/services/recuperar-senha";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface IForm {
  senha: string;
  verificacaosenha: string;
}

interface ITokenProps {
  token: string;
}

const validationSchema = yup.object({
  senha: yup
    .string()
    .required("Campo obrigatório")
    .min(7, "A senha deve ter pelo menos 7 caracteres"),
  verificacaosenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas devem coincidir")
    .required("Campo obrigatório")
    .min(7, "A senha deve ter pelo menos 7 caracteres"),
});

export default function AlterarSenha({ token }: ITokenProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showVPassword, setShowVPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowVPassword = () => setShowVPassword((show) => !show);
  
  const handleMouseDownVPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
        const response = await novaSenha(data, token);

        if (response.status === 200) {
          router.push("/recuperar-senha/sucesso");
        }
        if (response.status === 400) {
          router.push("/recuperar-senha/erro");
        }
        if (response.status === 500) {
          router.push("/recuperar-senha/erro");
        }
      } catch (error: any) {
        if (error?.response?.status === 400) {
          router.push("/recuperar-senha/erro");
        }
        router.push("/recuperar-senha/erro");
      }
    },
    [router, token]
  );

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
              src="/images/Favico-AppLider2023.png"
              alt="Descrição da imagem"
              width={85}
              height={80}
              style={{ borderRadius: "10px" }}
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
              type={showPassword ? "text" : "password"}
              onChange={handleChange("senha")}
              autoFocus
              helperText={errors.senha?.message}
              sx={{ borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="vsenha"
              label="Verificacao de Senha"
              type={showVPassword ? "text" : "password"}
              id="vsenha"
              onChange={handleChange("verificacaosenha")}
              helperText={errors.verificacaosenha?.message}
              autoComplete="current-password"
              sx={{ borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowVPassword}
                      onMouseDown={handleMouseDownVPassword}
                      edge="end"
                    >
                      {showVPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
