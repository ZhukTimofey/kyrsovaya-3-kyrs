import React from "react";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../UserStore";

const HomePage = () => {
  const { user, isAuthorized } = useAppSelector((state) => state.userStore);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (!isAuthorized) {
    navigate("/login");
  }
  return (
    <div className={"home-page-wrapper"}>
      <Typography
        variant="h4"
        component="div"
        sx={{ margin: "40px 0", textAlign: "center" }}
      >
        Добро пожаловать в личный кабинет
      </Typography>
      <Typography
        sx={{ fontSize: 16, margin: "16px 0" }}
        color="text.secondary"
        gutterBottom
      >
        Здесь вы можете посмотреть ваши личные данные о количесвте покупок, ваши
        выложеные товары, а так же выложить новый товар
      </Typography>
      <Card sx={{ maxWidth: 400, margin: "40px auto" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Личные данные
          </Typography>
          <Typography variant="h5" component="div">
            Ваша роль: {user.roles}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Имя: {user.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Фамилия: {user.surname}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Почта:{user.email}
          </Typography>
        </CardContent>
      </Card>
      <div className={"home-page-buttons"}>
        <Button
          sx={{ minWidth: "200px", margin: "0 auto" }}
          variant="contained"
          onClick={() => navigate("/your-goods")}
        >
          Посмотреть свои товары
        </Button>
        <Button
          sx={{ minWidth: "200px", margin: "0 auto" }}
          variant="contained"
          onClick={() => navigate("/creation")}
        >
          Создать товар
        </Button>
        <Button
          sx={{ minWidth: "200px", margin: "0 auto" }}
          variant="contained"
          onClick={() => dispatch(logout())}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
