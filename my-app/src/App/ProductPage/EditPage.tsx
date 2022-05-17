import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { editProduct, setIsEdited } from "../GoodsStore";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

interface Form {
  title: string;
  excerpt: string;
  price: number;
  img: string;
}
interface Props {
  title: string;
  excerpt: string;
  price: number;
  img: string;
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const EditPage = ({ title, excerpt, price, img, id, setIsEdit }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      title: title,
      excerpt: excerpt,
      price: price,
      img: img,
    },
  });
  const navigate = useNavigate();
  const { isEdited } = useAppSelector((state) => state.goodsStore);
  const dispatch = useAppDispatch();
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
    const good = { ...data, id: id };
    dispatch(editProduct(good));
  };

  if (isEdited) {
    setIsEdit(false);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });
  const resetImage = () => {
    setValue("img", "");
  };

  useEffect(() => {
    return function () {
      dispatch(setIsEdited());
    };
  });
  return (
    <div>
      <form className={"form-wrapper"} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: "Title is required" },
            minLength: { value: 3, message: "Is too short" },
          }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              sx={{ margin: "16px 0" }}
              required
              id="outlined-required"
              label="Title"
              helperText={errors?.title?.message}
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
        <div className={"edit-page-buttons-wrapper"}>
          <Button
            sx={{ minWidth: "200px", margin: "0 auto" }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Редактировать
          </Button>
          <Button
            sx={{ minWidth: "200px", margin: "0 auto" }}
            variant="contained"
            onClick={() => setIsEdit(false)}
          >
            Отменить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
