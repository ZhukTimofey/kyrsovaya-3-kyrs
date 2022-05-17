import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { confirmBuying, getProduct, requestForBuying } from "../GoodsStore";
import {
  setGoodsInitState,
  setIsRequested,
  setIsDeleted,
  setIsBought,
} from "../GoodsStore";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { deleteProduct } from "../GoodsStore";
import "./styles.scss";
import EditPage from "./EditPage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from "axios";
import userStore from "../UserStore";

type Form = {
  message: string;
};

const Index = () => {
  const params = useParams();
  const { control, handleSubmit } = useForm<Form>();
  const [isEditing, setIsEditing] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { product, isBought, isDeleted, isRequested } = useAppSelector(
    (state) => state.goodsStore
  );
  const { productStatus } = useAppSelector((state) => state.goodsStore);
  const { user } = useAppSelector((state) => state.userStore);
  const isAuthor = product?.author?.id === user?.id;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLoaded =
    product?.title &&
    product?.excerpt &&
    product?.price &&
    product?.img &&
    product?.id;

  useEffect(() => {
    params.id && dispatch(getProduct(params.id));
  }, []);
  useEffect(() => {
    return function () {
      dispatch(setGoodsInitState());
      dispatch(setIsRequested());
      dispatch(setIsDeleted());
      dispatch(setIsBought());
    };
  }, []);

  const onSubmit: SubmitHandler<Form> = (data) => {
    if (product?.id) {
      const body = { ...data, id: product.id, buyer: user };
      dispatch(requestForBuying(body));
    }
  };

  if (isBought || isDeleted || isRequested) {
    navigate("/");
  }

  return isEditing ? (
    isLoaded ? (
      <EditPage
        title={product?.title}
        excerpt={product?.excerpt}
        price={Number(product?.price)}
        img={product?.img}
        id={product?.id}
        setIsEdit={setIsEditing}
      />
    ) : (
      <div>load</div>
    )
  ) : productStatus === "pending" && !isLoaded ? (
    <div>loading</div>
  ) : (
    <div className={"product-page-wrapper"}>
      <Card>
        <CardActionArea>
          <CardMedia
            style={{
              width: "100%",
              maxHeight: "100%",
              margin: "0 auto",
            }}
            component="img"
            image={product?.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.excerpt}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product?.price}$
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {!isAuthor && product?.id && (
            <Button
              onClick={() => setIsBuyModalOpen(true)}
              size="small"
              color="primary"
            >
              Купить
            </Button>
          )}
          {isAuthor && product?.status !== "REQUEST" && (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                size="small"
                color="primary"
              >
                Редактировать
              </Button>
              <Button onClick={handleOpen} size="small" color="primary">
                Удалить
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Подтвердите действие
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Вы точно уверены что хотите удалить этот товар
                  </Typography>
                  <Button
                    onClick={() => {
                      dispatch(deleteProduct(product?.id));
                      navigate("/");
                    }}
                    size="small"
                    color="primary"
                  >
                    Да
                  </Button>
                  <Button onClick={handleClose} size="small" color="primary">
                    Нет
                  </Button>
                </Box>
              </Modal>
            </>
          )}
        </CardActions>
      </Card>
      <div>
        <Modal
          open={isBuyModalOpen}
          onClose={() => setIsBuyModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Здесь вы можете оставить сообщение и свои данные
            </Typography>
            <form className={"buy-form"} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="message"
                defaultValue={""}
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ margin: "16px 0", width: "100%" }}
                    id="outlined-message-input"
                    label="Ваще сообщение"
                    multiline
                    rows={4}
                    {...field}
                  />
                )}
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                size="small"
                color="primary"
              >
                Подтведить
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
      {isAuthor && (
        <>
          {!!product.buyers.length && (
            <Typography
              variant="h5"
              component="div"
              sx={{ margin: "24px 0", textAlign: "center" }}
            >
              Запросы на покупку
            </Typography>
          )}
          <div>
            {product.buyers.map(({ email, message, id }) => (
              <Card sx={{ maxWidth: 345, margin: "32px 0 0 0" }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {message}
                    </Typography>
                    <Button
                      onClick={() => {
                        const data = { id: product?.id, userID: id };
                        dispatch(confirmBuying(data));
                      }}
                      size="small"
                      color="primary"
                    >
                      Подтведить
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
