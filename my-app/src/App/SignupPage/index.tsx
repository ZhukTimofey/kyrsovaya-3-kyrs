import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resetIsSigndUp, signup } from "../UserStore";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import "./styles.scss";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";

type Form = {
  email: string;
  name: string;
  surname: string;
  password: string;
  confirmPassword: string;
};

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.userStore);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>();
  const submit: SubmitHandler<Form> = (data) => {
    dispatch(signup(data));
  };
  const navigate = useNavigate();

  if (store.isSigndUp) {
    navigate("/login");
  }
  useEffect(() => {
    return function () {
      dispatch(resetIsSigndUp());
    };
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ margin: "24px 0", textAlign: "center" }}
      >
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(submit)} className={"signup-wrapper"}>
        <Controller
          name="email"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Почта обязательно" },
            minLength: {
              value: 7,
              message: "Почта не может быть такой короткой",
            },
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Неверный формат почты",
            },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.email}
              sx={{ margin: "16px auto", width: "60%", height: "65px" }}
              id="outlined-email-input"
              label="Почта"
              helperText={errors?.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="name"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Имя обязательно" },
            minLength: { value: 2, message: "Имя слишком короткое" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.name}
              sx={{ margin: "16px auto", width: "60%", height: "65px" }}
              helperText={errors?.name?.message}
              id="outlined-name-input"
              label="Имя"
              {...field}
            />
          )}
        />

        <Controller
          name="surname"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Фамилия обязательна" },
            minLength: { value: 2, message: "Фамилия слишком короткая" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.surname}
              sx={{ margin: "16px auto", width: "60%", height: "65px" }}
              helperText={errors?.surname?.message}
              id="outlined-surname-input1"
              label="Фамилия"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Пароль обязательное поле" },
            minLength: { value: 8, message: "Пароль слишком короткий" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.password}
              helperText={errors?.password?.message}
              sx={{ margin: "16px auto", width: "60%", height: "65px" }}
              id="outlined-password-input"
              type="password"
              label="Пароль"
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          defaultValue={""}
          control={control}
          rules={{
            validate: (value) =>
              value === getValues("password") || "Пароли не совподают",
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              sx={{ margin: "16px auto 32px", width: "60%", height: "65px" }}
              id="outlined-cpassword-input"
              type="password"
              label="Подтвердите пароль"
              {...field}
            />
          )}
        />

        <Button
          sx={{ minWidth: "200px", margin: "0 auto 16px" }}
          variant="contained"
          onClick={handleSubmit(submit)}
        >
          Создать
        </Button>
        <NavLink to={"/login"}>Вернуться на страницу логина</NavLink>
      </form>
    </>
  );
};

export default SignupPage;
