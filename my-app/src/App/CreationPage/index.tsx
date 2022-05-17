import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import axios from "axios";

import "./styles.scss";
import { useAppSelector } from "../../hooks/hooks";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface Form {
  title: string;
  excerpt: string;
  price: number;
  img: string;
}

const CreationPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Form>();
  const store = useAppSelector((state) => state.userStore);
  const navigate = useNavigate();
  const onDrop = async (img: Blob[] | undefined) => {
    if (img && img.length) {
      const reader = new FileReader();
      reader.readAsDataURL(img[0]);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setValue("img", reader.result);
        }
      };
    }
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const good = { ...data, author: store.user };
    const resp = await axios.post("api/goods", good);
    navigate(`/goods/${resp.data.id}`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  const resetImage = () => {
    setValue("img", "");
  };

  return (
    <>
      <Typography
        variant="h4"
        component="div"
        sx={{ margin: "24px 0", textAlign: "center" }}
      >
        Создание своего товара
      </Typography>
      <form className={"form-wrapper"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Title is required" },
            minLength: { value: 3, message: "Is too short" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.title}
              helperText={errors?.title?.message}
              sx={{ margin: "16px 0", height: "65px" }}
              required
              id="outlined-required"
              label="Title"
              {...field}
            />
          )}
        />
        <Controller
          name="excerpt"
          defaultValue={""}
          control={control}
          rules={{
            required: { value: true, message: "Excerpt is required" },
            minLength: { value: 3, message: "Is too short" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors?.excerpt}
              helperText={errors?.excerpt?.message}
              sx={{ height: "145px" }}
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              {...field}
            />
          )}
        />
        <Controller
          name="price"
          defaultValue={0}
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ margin: "16px 0" }}
              id="outlined-number"
              label="Price"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              {...field}
            />
          )}
        />
        {!watch("img") ? (
          <Controller
            name="img"
            control={control}
            render={() => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={"drop-zone-border"}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    Загрузить
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    Или перетащите сюда изображение
                  </Typography>
                </div>
              </div>
            )}
          />
        ) : (
          <div className={"creation-image-wrapper"}>
            <img className={"creation-image"} src={getValues("img")} alt="" />
            <img
              onClick={() => resetImage()}
              className={"close-cross"}
              src="https://www.svgrepo.com/show/178323/cross-close.svg"
              alt=""
            />
          </div>
        )}
        <Button
          sx={{ minWidth: "200px", margin: "0 auto" }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Создать
        </Button>
      </form>
    </>
  );
};

export default CreationPage;
