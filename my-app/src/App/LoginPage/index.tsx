import React, { useEffect } from "react";
import Input from "@mui/material/Input";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import { login } from "../UserStore";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface Form {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { control, handleSubmit } = useForm<Form>();
  const dispatch = useAppDispatch();
  const submit: SubmitHandler<Form> = (data) => {
    dispatch(login(data));
  };
  const { isAuthorized } = useAppSelector((state) => state.userStore);
  const nav = useNavigate();
  useEffect(() => {
    if (isAuthorized) {
      nav("/");
    }
  }, [isAuthorized]);
  return (
    <div className={"login-wrapper"}>
      <Typography
        variant="h4"
        component="div"
        sx={{ margin: "24px 0", textAlign: "center" }}
      >
        Вход в аккаунт
      </Typography>
      <Controller
        name="username"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <TextField
            sx={{ margin: "16px auto", width: "60%" }}
            id="outlined-email-input"
            label="Почта"
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        defaultValue={""}
        control={control}
        render={({ field }) => (
          <TextField
            sx={{ margin: "16px 0", width: "60%" }}
            id="outlined-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            {...field}
          />
        )}
      />
      <Button
        sx={{ margin: "16px 0", width: "60%" }}
        variant="contained"
        onClick={handleSubmit(submit)}
      >
        Войти
      </Button>
      <NavLink to={"/signup"}>Регистрация</NavLink>
    </div>
  );
};

export default LoginPage;
