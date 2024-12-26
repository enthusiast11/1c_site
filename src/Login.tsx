import React, { useState } from "react";
import { Ilogin, useSendLogPassMutation } from "./store/rtk-query/login";
import { useNavigate } from "react-router";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";

export const Login: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [sendLogPass, { error }] = useSendLogPassMutation();

  const sendData = async () => {
    const body: Ilogin = {
      username: login,
      password: password,
    };
    setLogin("");
    setPassword("");
    await sendLogPass(body);
    navigate("/main");
  };

  return (
    <Container sx={{ width: "50%" }}>
      {error ? (
        <Alert severity="error">Ошибка при входе</Alert>
      ) : (
        <Stack spacing={1}>
          <TextField
            onChange={(e) => setLogin(e.currentTarget.value)}
            label="Введите логин"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPassword(e.currentTarget.value)}
            label="Введите пароль"
            variant="outlined"
          />
          <Button onClick={sendData} variant="contained">
            Войти
          </Button>
        </Stack>
      )}
    </Container>
  );
};
