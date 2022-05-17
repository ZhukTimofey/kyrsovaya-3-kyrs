import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getGoods } from "../GoodsStore";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const UsersGoods = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.goodsStore);
  const { user } = useAppSelector((state) => state.userStore);
  const nav = useNavigate();
  const yourGoods = store.goods.filter(
    ({ author, status }) => author.email === user.email && status !== "SOLD"
  );
  useEffect(() => {
    dispatch(getGoods());
  }, []);
  return (
    <div className={"goods-store"}>
      {yourGoods.map(({ title, excerpt, img, id, status }) => (
        <Card sx={{ maxWidth: 345, margin: "24px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": "5",
                "-webkit-box-orient": "vertical",
              }}
              variant="body2"
              color="text.secondary"
            >
              {excerpt}
            </Typography>
            {status === "REQUEST" && (
              <Typography gutterBottom variant="h5" component="div">
                Кто-то желает купить ваш товар
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button onClick={() => nav(`/goods/${id}`)} size="small">
              Подробности
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default UsersGoods;
